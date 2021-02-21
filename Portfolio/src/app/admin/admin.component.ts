import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public nav: SharedService, private route:Router) { 
  }

  tabList = [{name: 'Projects', icon: 'bookmarks'},{name: 'Blogs', icon: 'bookmarks'},{name: 'Albums', icon: 'library_music'},{name: 'Galleries', icon: 'image'}]
  ngOnInit(): void {
    this.nav.hide();
  }

  logout(){
    this.route.navigate(['admin/login']);
  }

  navigateTo(selectedTab: any) {
    switch(selectedTab){
      case 'Projects':
        this.route.navigate(['admin/projects'])
        break;
      case 'Blogs':
        this.route.navigate(['admin/blogs'])
        break;
      case 'Albums':
        this.route.navigate(['admin/albums'])
        break;
      case 'Galleries':
        this.route.navigate(['admin/gallery'])
        break;
    }
   
  }

  backToWebsite(){
    this.route.navigate(['http://hans-narva.de']);
    
  }

}
