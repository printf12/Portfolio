import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
//readonly APIUrl= environment.apiLocalHost;
readonly APIUrl= environment.baseUrl;


visible: boolean;

transferedBlog: any;

constructor(private http:HttpClient) {this.visible = true; }

hide() { this.visible = false; }

show() { this.visible = true; }

getProjectsList():any{
    return this.http.get(this.APIUrl+'getProjects');
}

  createProject(project:any){
    return this.http.post(this.APIUrl+'createProject',project);
  }

  editProject(project:any){
    return this.http.post(this.APIUrl+'updateProject',project);
  }

  deleteProject(project:any){
    return this.http.post(this.APIUrl+'deleteProject', project);
  }


  getGalleriesList():any{
    return this.http.get(this.APIUrl+'getGalleries');
}

  createGallery(gallery:any){
    return this.http.post(this.APIUrl+'createGallery',gallery);
  }

  editGallery(gallery:any){
    return this.http.post(this.APIUrl+'updateGallery',gallery);
  }

  deleteGallery(gallery:any){
    return this.http.post(this.APIUrl+'deleteGallery', gallery);
  }


  getAudiosList():any{
    return this.http.get(this.APIUrl+'getAudios');
  }

  createAudio(audio:any){
    return this.http.post(this.APIUrl+'createAudio',audio);
  }

  editAudio(audio:any){
    return this.http.post(this.APIUrl+'updateAudio',audio);
  }

  deleteAudio(audio:any){
    return this.http.post(this.APIUrl+'deleteAudio', audio);
  }

  getAudiosByAlbumName(selectedAlbum: any) {
    return this.http.post(this.APIUrl+'getAudiosByAlbumName', selectedAlbum);
  }





  getBlogs():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'getBlogs');
  }

  createBlog(blog:any){
    return this.http.post(this.APIUrl+'createBlog',blog);
  }

  editBlog(blog:any){
    return this.http.post(this.APIUrl+'updateBlog',blog);
  }

  updateBlog(val:any){
    return this.http.put(this.APIUrl+'/Blog',val);
  }

  deleteBlog(blogId:any){
    return this.http.post(this.APIUrl+'deleteBlog', blogId);
  }

  login(adminCredentials: any){
    console.log(adminCredentials);
    return this.http.post(this.APIUrl+"adminLogin.php", adminCredentials);

  }

  sendMail(contactData: any) {
    console.log(contactData);
    return this.http.post(this.APIUrl+'sendMail.php', contactData);
  }

}