import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PortfolioService } from 'src/app/shared/portfolio.service';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-projects-home',
  templateUrl: './admin-projects-home.component.html',
  styleUrls: ['./admin-projects-home.component.css']
})

export class AdminProjectsHomeComponent implements OnInit {

  projects: any = [];

  showCreate = false;
  showEdit = false;
  baseUrl = environment.baseUrl;
  
  file = new FormControl('');
  file_data: any = '';

  imageSrc: string;
  fileName: string;

  project = {
    titel : "",
    description : "",
    image : "",
    url : "",
    file : ""

  }

  editedProject: any;

  showImagePreview = false;
  constructor(private service: SharedService, private toastr: ToastrService,public http: HttpClient) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(){
    this.service.getProjectsList().subscribe((res:any) => {
        this.projects = res['data'];
    });
  }

  showCreateProject() {
    this.showCreate = true;
    this.showEdit = false;
    window.scrollTo(0,document.body.scrollHeight);
    
  }

  showEditProject(project:any) {
    this.showImagePreview = false;
    console.log(project)
    this.showCreate = false;
    this.showEdit = true;
    this.editedProject = project;
  }

  

  createProject(project: any){
    project['creationDate'] = this.getDateTime();
    project['image'] = this.fileName;

    console.log(project);
    this.service.createProject(project).subscribe((res:any) => {
      this.showCreate = false;
      this.uploadFile("create");
      this.resetFields(project)
    });
  }

  editProject(project: any) {
    project['creationDate'] = this.getDateTime();
    project['image'] = this.fileName;
    this.service.editProject(project).subscribe((res:any) => {
      this.showEdit = false;
      this.uploadFile("edit");
      this.resetFields(project);
    });
  }

  deleteProject(project: any){
    if(confirm('Are you sure??')){
      this.service.deleteProject(project.id).subscribe((res:any) => {
        this.toastr.success('Submitted successfully', 'Project deleted');
        this.service.getProjectsList().subscribe((res:any) => {
          this.projects = res['data'];
        })
    });
    }
  }

  resetFields(project:any){
    project.description = '';
    project.titel = '';
    project.url = '';
    this.showImagePreview = false;
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
    this.showImagePreview = true;
    reader.readAsDataURL(file);
    reader.onload = () => {
      
      this.imageSrc = reader.result as string;
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
      this.toastr.success('File size exceeds 4 MB. Please choose less than 4 MB', 'Image Uploaded');
    }
  }
}

uploadFile(action:any) {
  this.http.post(this.baseUrl + 'uploadFile', this.file_data)
    .subscribe((res: any) => {
      this.service.getProjectsList().subscribe((res:any) => {
        this.projects = res['data'];
      })
      if(action == "create") {
        this.toastr.success('Submitted successfully', 'Project Created');
      }
      else if(action == "edit"){
        this.toastr.success('Submitted successfully', 'Project Edited');
      }
      
    }, (err: any) => {
      //send error response
    });
}

}
