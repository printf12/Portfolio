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


  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/Blog/SaveFile',val);
  }

  getAllPortfolioNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/Blog/GetAllPortfolioNames');
  }

}