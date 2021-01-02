import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-new-portfolio',
  templateUrl: './create-new-portfolio.component.html',
  styleUrls: ['./create-new-portfolio.component.css']
})
export class CreateNewPortfolioComponent implements OnInit {

  model:any = {};

  constructor() { }

  ngOnInit(): void {
  }

  createPortfolio(){

    console.log(this.model);
  }

  cancel(){

    console.log("canceled");
  }

}
