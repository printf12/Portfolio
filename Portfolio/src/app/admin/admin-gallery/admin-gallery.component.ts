import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.css']
})
export class AdminGalleryComponent implements OnInit {

  galleries: any = [];

  showCreate = false;
  showEdit = false;
  baseUrl = environment.baseUrl;
  
  file = new FormControl('');
  file_data: any = '';

  imageSrc: string;
  fileName: string;

  gallery = {
    title: "",
    image : "",
    file : ""
  }

  editedGallery: any;

  showImagePreview = false;
  
  constructor(private service: SharedService, private toastr: ToastrService,public http: HttpClient) { }

  ngOnInit(): void {
    this.getGalleries();
  }

  
  getGalleries(){
    this.service.getGalleriesList().subscribe((res:any) => {
        this.galleries = res['data'];
    });
  }

  showCreateGallery() {
    
    this.showCreate = true;
    this.showEdit = false;
    window.scrollTo(0,document.body.scrollHeight);
    
  }

  showEditGallery(gallery:any) {
    this.showImagePreview = false;
    this.showCreate = false;
    this.showEdit = true;
    this.editedGallery = gallery;
  }

  

  createGallery(gallery: any){
    gallery['image'] = this.fileName;
    this.service.createGallery(gallery).subscribe((res:any) => {
      this.showCreate = false;
      this.uploadFile("create");
      this.resetFields(gallery)
    });
  }

  editGallery(gallery: any) {
    gallery['image'] = this.fileName;
    this.service.editGallery(gallery).subscribe((res:any) => {
      this.showEdit = false;
      this.uploadFile("edit");
      this.resetFields(gallery);
    });
  }

  deleteGallery(gallery: any){
    if(confirm('Are you sure??')){
      this.showEdit = false;
      this.showCreate = false;
      this.service.deleteGallery(gallery.id).subscribe((res:any) => {
        this.toastr.success('Submitted successfully', 'Gallery deleted');
        this.service.getGalleriesList().subscribe((res:any) => {
          this.galleries = res['data'];
        })
    });
    }
  }

  resetFields(gallery:any){
    gallery.description = '';
    gallery.titel = '';
    gallery.url = '';
    this.showImagePreview = false;
    this.fileName = '';
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
        this.service.getGalleriesList().subscribe((res:any) => {
          this.galleries = res['data'];
        })
        if(action == "create") {
          this.toastr.success('Submitted successfully', 'Gallery Created');
        }
        else if(action == "edit"){
          this.toastr.success('Submitted successfully', 'Gallery Edited');
        }
        
      }, (err: any) => {
        //send error response
      });
  }

}
