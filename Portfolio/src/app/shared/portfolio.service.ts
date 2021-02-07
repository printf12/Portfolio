import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Portfolio } from './portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) {}

  //baseUrl = environment.apiLocalHost;
  baseUrl = environment.baseUrl;

  postCreateNewPortfolio(fromData: any) {
    console.log(fromData);
    return this.http.post(this.baseUrl + "createProject", fromData);
  }

  getProjectsCount(){
    return this.http.get(this.baseUrl + "getProjectsPaginationCount").toPromise();
  }
  
  getPortfolioById(id:any) {
    return this.http.post(this.baseUrl + 'getProjectById', id).toPromise();
  }

  getMoreProjects(projectsCount: any){
    return this.http.post(this.baseUrl+'getMoreProjects', projectsCount).toPromise();
  }

  getPagePerIndex(paginationIndex: any){
    return this.http.post(this.baseUrl+'getProjectsPerPage', paginationIndex*6).toPromise();
  }
}
