import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  constructor(private shared : SharedService) { }

  audios: any;
  ngOnInit(): void {
    this.shared.getAudiosList().subscribe((res:any) => {
      this.audios = res['data'];
    })
    
  }
}
