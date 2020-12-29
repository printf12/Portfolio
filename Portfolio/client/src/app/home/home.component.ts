import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: any;
  portfolios: any;
  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.getUsers();
    this.getPortfolios();
  }

  getUsers(){
    this.http.get("https://localhost:44376/api/user").subscribe(response =>{
      this.users = response;
      }, error =>{
        console.error();
    })
  }

  getPortfolios(){
    this.http.get("https://localhost:44376/api/portfolio").subscribe(response =>{
      this.portfolios = response;
      }, error =>{
        console.error();
    })
  }

}
