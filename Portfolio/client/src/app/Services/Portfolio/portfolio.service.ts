import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  public getAllPortfolios(): Observable<any> {
    return this.http.get("https://localhost:44376/api/portfolio");
  }  
}
