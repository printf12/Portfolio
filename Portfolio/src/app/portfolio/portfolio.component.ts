import { Component, OnInit } from '@angular/core';
import { Portfolio } from '../shared/portfolio.model';
import { PortfolioService } from '../shared/portfolio.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  projects: any = [];
  projectsCount: number;
  numbersArray: any = [];
  
  baseUrl = environment.baseUrl;
  constructor(public service: PortfolioService, private http: HttpClient) { }
 
  ngOnInit(): void {
    this.getAllProjects();
    this.getProjectsCount();
    //this.service.getPortfolioByCount(3).then(res => {
    //  this.projects = res;
    //})
  }


  getAllProjects(): any {
    return this.http.get(this.baseUrl+"project").subscribe((res: any) => {
      console.log(res);
      this.projects = res['data'];
      console.log(this.projects);
    });
  }

  getProjectsCount(){
    let numb = 1;
    return this.service.getProjectsCount().then((res: any) => {
      let projectsCount = res;
      console.log(projectsCount);
      let loops = projectsCount / 6;
      if(Number.isInteger(loops)){
        for(let i = 1; i <= Math.round(projectsCount / 6); i++){
          this.numbersArray.push(i);
        }
      }
      else {
        let commaValue = (loops.toString().split("."))[1].substr(0, 1);
        console.log(commaValue);
        if(parseInt(commaValue) >= 5){
          for(let i = 1; i <= Math.round(projectsCount / 6); i++){
            this.numbersArray.push(i);
          }
        }
        else {
          for(let i = 1; i <= Math.round(projectsCount / 6) + 1; i++){
            this.numbersArray.push(i);
          }
        }

      }
    });
  }

  getPagePerIndex(paginationIndex: any){
    console.log(paginationIndex);
    this.service.getPagePerIndex(paginationIndex).then((res:any) => {
      console.log(res);
      this.projects = res['data'];
    })
  }
  

}
