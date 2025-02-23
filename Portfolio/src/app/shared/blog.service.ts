import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Blog } from './blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) {}  
  
  //baseUrl = environment.apiLocalHost;
  baseUrl = environment.baseUrl;

  postCreateNewBlog(formData: any){
    return this.http.post(this.baseUrl + "createBlog", formData);
  }

  getBlogsCount(){
    return this.http.get(this.baseUrl + "getBlogsPaginationCount").toPromise();
  }

  getBlogById(id: any) {
    return this.http.post(this.baseUrl + 'getBlogById', id).toPromise();
  }

  getMoreBlogs(projectsCount: any){
    return this.http.post(this.baseUrl+'getMoreBlogs', projectsCount).toPromise();
  }

  getPagePerIndex(paginationIndex: any){
    return this.http.post(this.baseUrl+'getBlogsPerPage', paginationIndex*6).toPromise();
  }

  /*uploadFileProcess(file: any) {
    return this.http.post(this.baseUrl + 'uploadFile', file)
  }*/

  /*getBlogs(){
    return this.http.get(this.baseUrl).toPromise();
  }*/

  /*getBlogsByCount(blogsCount: any){
    return this.http.get(this.baseUrl+'/BlogsCount/'+blogsCount).toPromise();
  }*/

 
}
