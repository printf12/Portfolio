import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../Services/Blog/blog-service.service';
import { PortfolioService } from '../Services/Portfolio/portfolio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users : any;
  portfolios = [];
  blogs = [];
  constructor(private http: HttpClient, private blogService: BlogServiceService, private portfolioService: PortfolioService) {

  }

  ngOnInit(){
    this.getUsers();
    this.getPortfolios();
    this.getBlogs();
  }

  getUsers() {
    this.http.get("https://localhost:44376/api/user").subscribe(response => {
      this.users = response;
    });
  }

  getPortfolios() {
    this.portfolioService.getAllPortfolios().subscribe(data => {
      this.portfolios = data;
      console.log(this.portfolios);
    }, error => {
      console.error();
    })
  }

  getBlogs() {
    this.blogService.getFirstBlog().subscribe(data => {
      this.blogs = data;
      console.log(this.blogs);
    }, error => {
      console.error();
    })
  }
      

}
