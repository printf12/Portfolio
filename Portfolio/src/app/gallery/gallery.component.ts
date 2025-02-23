import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  galleries: any;
  constructor(private shared: SharedService) { }

  
  ngOnInit(): void {
    this.shared.getGalleriesList().subscribe((res:any) => {
      this.galleries = res['data'];
    })
  }

  

}
