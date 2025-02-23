import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}  

  comments: any = [];

  //baseUrl = environment.apiLocalHost;
  baseUrl = environment.baseUrl;

  getCommentsByBlogId(blogId: any) {
    return this.http.post(this.baseUrl + "getCommentsByBlogId", blogId);
  }

  submitComment(comment: any) {
    console.log(comment);
    return this.http.post(this.baseUrl+"comment", comment);
}
}

