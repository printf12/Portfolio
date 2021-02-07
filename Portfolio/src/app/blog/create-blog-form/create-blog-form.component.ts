import { DatePipe } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl,  NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Blog } from 'src/app/shared/blog.model';
import { BlogService } from 'src/app/shared/blog.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-create-blog-form',
  templateUrl: './create-blog-form.component.html',
  styles: [
  ]
})
export class CreateBlogFormComponent implements OnInit {

  file = new FormControl('');
  file_data: any = '';

  baseUrl = environment.baseUrl;

  formData: any = {};
  fileFormData: any;

  imageSrc: string;
  fileName: string;

  showImagePreview = false;

  constructor(public service: BlogService,public sharedService: SharedService, private toastr: ToastrService, public http: HttpClient) { }

  ngOnInit(): void {
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

  uploadFile() {
    this.http.post(this.baseUrl + 'uploadFile', this.file_data)
      .subscribe((res: any) => {
        //send success response
      }, (err: any) => {
        //send error response
      });
  }

  async createBlog(form: any) {
    form['imageUrl'] = this.fileName;
    form['creationDay'] = this.getDateTime();
    await this.service.postCreateNewBlog(form).subscribe(
      res => {
        this.http.post(this.baseUrl + 'uploadFile', this.file_data)
          .subscribe((res: any) => {
            this.showImagePreview = false;
            this.onReset(form);
          }, (err: any) => {
            //send error response
          });
        this.toastr.success('Submitted successfully', 'Post Created');
        this.toastr.success('Upload successfully', 'Image Uploaded');

      },
      err => { console.log(err); }
    );
  }

  onReset(form:any) {
    form.title = '';
    form.blogPostType = '';
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
