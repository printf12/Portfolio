import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-admin-album',
  templateUrl: './admin-album.component.html',
  styleUrls: ['./admin-album.component.css']
})
export class AdminAlbumComponent implements OnInit {

  constructor(private route:Router,public shared: SharedService) { }
  albums = [{name: 'Herbst in Peking „To be hip“', icon: 'library_music'},{name: 'Project Skull „Der müde Tod“', icon: 'library_music'},{name: 'The crack-up collective „Adventure stories“', icon: 'library_music'},{name: 'when the hands point up - the excitement starts! „debut“', icon: 'library_music'}]

  ngOnInit(): void {
  }


  getAudiosByAlbum(selectedalbum: any) {
    console.log("hier");
    this.shared.getAudiosByAlbumName(selectedalbum).subscribe((res:any) => {
      console.log(res);
    })
  }

}
