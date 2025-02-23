import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Portfolio } from 'src/app/shared/portfolio.model';
import { PortfolioService } from 'src/app/shared/portfolio.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-portfolio-form',
  templateUrl: './create-portfolio-form.component.html',
  styleUrls: ['./create-portfolio-form.component.css']
})
export class CreatePortfolioFormComponent implements OnInit {


  baseUrl = environment.baseUrl;

  file = new FormControl('');
  file_data: any = '';
  
  formData: any = {};
  fileFormData: any;

  imageSrc: string;
  fileName: string;

  showImagePreview = false;

  constructor(public service:PortfolioService, private toastr:ToastrService,private http: HttpClient) { }

  ngOnInit(): void {}

  fileChange(event: any) {
    const reader = new FileReader();
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      const fileArray = file.name.split(".");
      this.fileName = fileArray[0] + "_" + Date.now() + "." + fileArray[1];
      console.log(this.fileName);
      this.showImagePreview = true;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      //get file information such as name, size and type
      console.log('finfo', this.fileName, file.size, file.type);
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
        this.toastr.error('File size exceeds 4 MB. Please choose less than 4 MB', "Upload Error");
      }
    }
  }

  uploadFile() {
    this.http.post(this.baseUrl + 'uploadFile', this.file_data)
      .subscribe((res: any) => {
        
        //send success response
      }, (err: any) => {
        //send error response
      });
  }

  createProject(form:any){
    form['image'] = this.fileName;
    form['creationDate'] = this.getDateTime();
    this.service.postCreateNewPortfolio(this.formData).toPromise().then(
      res => {
        this.http.post(this.baseUrl + 'uploadFile', this.file_data)
          .subscribe((res: any) => {
            this.showImagePreview = false;
            this.onReset(form);
            this.toastr.success('Submitted successfully', 'Post Created');
            this.toastr.success('Upload successfully', 'Image Uploaded');
          }, (err: any) => {
            //send error response
          });
       
      },
      err => { console.log(err); }
      );
    }
 
  onReset(form:any) {
    form.titel = '';
    form.description = '';
  }

  getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString();
    var day = (now.getDate()).toString();
    var hour = (now.getHours()).toString();
    var minute = (now.getMinutes()).toString();
    var second = (now.getSeconds()).toString();
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
    var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute;
    return dateTime;
}

}
