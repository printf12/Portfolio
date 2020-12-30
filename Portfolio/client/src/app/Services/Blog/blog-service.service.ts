import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {

  constructor(private http: HttpClient) { }

  public getFirstBlog(): Observable<any> {
    return this.http.get("https://localhost:44376/api/blog");
  }  
}
