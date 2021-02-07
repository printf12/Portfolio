import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Portfolio } from 'src/app/shared/portfolio.model';
import { PortfolioService } from 'src/app/shared/portfolio.service';

@Component({
  selector: 'app-view-portfolio-details',
  templateUrl: './view-portfolio-details.component.html'
})
export class ViewPortfolioDetailsComponent implements OnInit {
  portfolioDetails:any = [];

  constructor(public service:PortfolioService, private route:ActivatedRoute) { }

  ngOnInit(){
    let id = this.route.snapshot.paramMap.get("id");
    this.service.getPortfolioById(id).then((response: any) => {
      console.log(response);
      this.portfolioDetails = response.data[0];
    });

  }


  onNavigate(projectUrl:any){
    window.open(projectUrl, "_blank");
}



}
