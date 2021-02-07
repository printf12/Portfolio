import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogPostType } from 'src/app/shared/blog.model';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-blogs-home',
  templateUrl: './admin-blogs-home.component.html',
  styleUrls: ['./admin-blogs-home.component.css']
})
export class AdminBlogsHomeComponent implements OnInit {

  blogs: any = [];

  showCreate = false;
  showEdit = false;
  baseUrl = environment.baseUrl;
  
  file = new FormControl('');
  file_data: any = '';

  imageSrc: string;
  fileName: string;

  blog = {
    title : "",
    description : "",
    image : "",
    fileName : "",
    blogType : ""

  }

  editedBlog: any;

  response: any = [];

  showImagePreview = false;
  constructor(private service: SharedService, private toastr: ToastrService,public http: HttpClient) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(){
    this.service.getBlogs().subscribe((res:any) => {
        this.blogs = res['data'];
    });
  }

  showCreateBlog() {
    this.showCreate = true;
    this.showEdit = false;
    window.scrollTo(0,document.body.scrollHeight);
  }

  showEditBlog(blog:any) {
    console.log(blog);
    
    this.showImagePreview = false;
    this.showCreate = false;
    this.showEdit = true;
    this.editedBlog = blog;
    
  }

  createBlog(blog: any){
    blog['creationDate'] = this.getDateTime();
    blog['image'] = this.fileName;
    console.log(blog);
    this.service.createBlog(blog).subscribe((res:any) => {
      this.showCreate = false;
      this.uploadFile("create");
      
      this.resetFields(blog);
     
    });

  }

  editBlog(blog: any) {
    blog['creationDate'] = this.getDateTime();
    blog['image'] = this.fileName;
    console.log(blog);
    this.service.editBlog(blog).subscribe((res:any) => {
      this.showEdit = false;
      this.uploadFile("edit");
      this.resetFields(blog);
     
    });
  }

  deleteBlog(blog: any){
    if(confirm('Are you sure??')){
      this.service.deleteBlog(blog.id).subscribe((res:any) => {
        this.toastr.success('Submitted successfully', 'Blog deleted');
        this.getBlogs();
    });
    }
  }

  

  resetFields(blog:any){
    blog.description = '';
    blog.title = '';
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
      this.getBlogs();
      if(action == "create") {
        this.toastr.success('Submitted successfully', 'Blog Created');
      }
      else if(action == "edit"){
        this.toastr.success('Submitted successfully', 'Blog Edited');
      }
      
    }, (err: any) => {
      //send error response
    });
}
}
