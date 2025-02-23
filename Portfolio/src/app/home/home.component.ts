import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Blog, BlogPostType } from '../shared/blog.model';
import { BlogService } from '../shared/blog.service';
import { PortfolioService } from '../shared/portfolio.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects:any[] = [];
  blogs: any[] = [];

  blogsData: any[] = [];
  moreBlogs: any[] = [];

  url: any;
  images: any[] = [];
  response: any[] = [];

  imageUrl: any;


  //baseUrl = environment.apiLocalHost;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, public service: PortfolioService, private blogService: BlogService, private sanitizer: DomSanitizer) { }

  ngOnInit(){
    this.getAllProjects();
    this.getBlogs();
  } 

  getAllProjects(): any {
    return this.http.get(this.baseUrl+"project").subscribe((res: any) => {
      this.projects = res['data'];
    });
  }

  getBlogs(): any {
    return this.http.get(this.baseUrl + "blog").subscribe((res: any) => {
      this.response = res['data'];
      this.response.forEach((blog: any) => {
        let blogType = BlogPostType[blog.blogType];
        blog["blogType"] = blogType;
      })
      this.blogs = this.response;
    });
  }

  showMoreProjects(projectsCount:any) {
    this.service.getMoreProjects(projectsCount+3).then((response:any) =>{
      this.projects = response['data'];
      })
  }

  showMoreBlogs(blogsCount:any) {
    this.blogService.getMoreBlogs(blogsCount+3).then((response:any) =>{
      this.blogs = response['data'];
    })
  }

}
