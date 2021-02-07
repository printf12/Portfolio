import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BlogService } from '../shared/blog.service';
import { BlogPostType } from '../shared/blog.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs: any = [];
  filePath: string;
  numbersArray: any[] = [];
  imageUrl: any;
  url: any;
  images: any[] = [];
  response: any[] = [];
  
  baseUrl = environment.baseUrl;
  constructor(public service: BlogService, private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getBlogs();
    this.getBlogsCount();
  }

  getBlogs(): any {
    return this.http.get(this.baseUrl + "blog").subscribe((res: any) => {
      this.blogs = res['data'];
    });
  }

  getBlogsCount(){
    let numb = 1;
    return this.service.getBlogsCount().then((res: any) => {
      let blogsCount = res;
      console.log(blogsCount);
      let loops = blogsCount / 6;
      if(Number.isInteger(loops)){
        for(let i = 1; i <= Math.round(blogsCount / 6); i++){
          this.numbersArray.push(i);
        }
      }
      else {
        let commaValue = (loops.toString().split("."))[1].substr(0, 1);
        console.log(commaValue);
        if(parseInt(commaValue) >= 5){
          for(let i = 1; i <= Math.round(blogsCount / 6); i++){
            this.numbersArray.push(i);
          }
        }
        else {
          for(let i = 1; i <= Math.round(blogsCount / 6) + 1; i++){
            this.numbersArray.push(i);
          }
        }

      }
    });
  }

  getPagePerIndex(paginationIndex: any){
    console.log(paginationIndex);
    this.service.getPagePerIndex(paginationIndex).then((res:any) => {
      this.response = res['data'];
      this.response.forEach((blog: any) => {
        let blogType = BlogPostType[blog.blogType];
        blog["blogType"] = blogType;
      })
      this.blogs = this.response;
    })
  }

}
