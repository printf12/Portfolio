import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-audio-home',
  templateUrl: './admin-audio-home.component.html',
  styleUrls: ['./admin-audio-home.component.css']
})
export class AdminAudioHomeComponent implements OnInit {

  audios: any = [];
  showCreate = false;
  showEdit = false;
  baseUrl = environment.baseUrl;
  
  file = new FormControl('');
  file_data: any = '';

  audioSrc: string;
  fileName: string;

  lastUploadedAudio: string;

  audio = {
    title : "",
    audioName : "",
    file : "",
    album: ""

  }

  editedAudio: any;

  showAudio = false;
  constructor(private service: SharedService, private toastr: ToastrService,public http: HttpClient) { }

  ngOnInit(): void {
    this.getAudios();
  }

  getAudios(){
    this.service.getAudiosList().subscribe((res:any) => {
     
      this.audios = res['data'];
    });
  }

  showCreateAudio() {
    this.showCreate = true;
    this.showEdit = false;
    window.scrollTo(0,document.body.scrollHeight);
    
  }

  showEditAudio(audio:any) {
    this.showAudio = false;
    console.log(audio);
    this.showCreate = false;
    this.showEdit = true;
    this.editedAudio = audio;
    this.lastUploadedAudio = audio.audioName;
  }

  createAudio(audio: any){
    audio['audioName'] = this.fileName;
    console.log(audio);
    this.service.createAudio(audio).subscribe((res:any) => {
      this.showCreate = false;
      this.uploadFile("create");
      this.resetFields(audio)
    });
  }

  editAudio(audio: any) {
    console.log(this.fileName);
    if(this.fileName == undefined || this.fileName == ""){
      
      audio['audioName'] = this.lastUploadedAudio;
      console.log("audio not changed");
    }
    else {
      audio['audioName'] = this.fileName;
      console.log("audio changed");
    }

    this.service.editAudio(audio).subscribe((res:any) => {
      this.showEdit = false;
      this.uploadFile("edit");
      this.resetFields(audio);
    });
  }

  deleteAudio(audio: any){
    if(confirm('Are you sure??')){
      this.service.deleteAudio(audio.id).subscribe((res:any) => {
        this.toastr.success('Submitted successfully', 'Audio deleted');
        this.service.getAudiosList().subscribe((res:any) => {
          this.audios = res['data'];
        })
    });
    }
  }

  resetFields(audio:any){
    audio.titel = '';
    this.showAudio = false;
    this.fileName = '';
  }

  getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString();
    var day = (now.getDate()).toString();
    var hour = (now.getHours()).toString();
    var minute = (now.getMinutes()).toString();
    if (month.toString().length == 1) {
      month = "0" + month;
    }
    if (day.toString().length == 1) {
      day = '0' + day;
    }
    if (hour.toString().length == 1) {
      hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
      minute = '0' + minute;
    }
    var dateTime = day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
    return dateTime;
}

fileChange(event: any) {
  const reader = new FileReader();
  const fileList: FileList = event.target.files;
  if (fileList.length > 0) {
    const file = fileList[0];
    const fileArray = file.name.split(".");
    this.fileName = fileArray[0] + "_" + Date.now() + "." + fileArray[1];
    this.showAudio = true;
    reader.readAsDataURL(file);
    reader.onload = () => {
      
      this.audioSrc = reader.result as string;
    };
    //get file information such as name, size and type
    console.log('finfo', this.fileName, file.size, file.type);

    console.log(this.fileName);
    //max file size is 4 mb
    if ((file.size / 1048576) <= 4) {
      let formData = new FormData();
      let info = { id: 2, name: 'raja' }
      formData.append('file', file, this.fileName);
      formData.append('id', '2');
      formData.append('tz', new Date().toISOString())
      formData.append('update', '2')
      formData.append('info', JSON.stringify(info))
      this.file_data = formData;
    } else {
      this.toastr.success('File size exceeds 4 MB. Please choose less than 4 MB', 'Audio Uploaded');
    }
  }
}

uploadFile(action:any) {
  this.http.post(this.baseUrl + 'uploadFile', this.file_data)
    .subscribe((res: any) => {
      this.service.getAudiosList().subscribe((res:any) => {
        this.audios = res['data'];
      })
      if(action == "create") {
        this.toastr.success('Submitted successfully', 'Audio Created');
      }
      else if(action == "edit"){
        this.toastr.success('Submitted successfully', 'Audio Edited');
      }
      
    }, (err: any) => {
      //send error response
    });
}

}
