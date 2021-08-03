import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.page.html',
  styleUrls: ['./detalle-tarea.page.scss'],
})
export class DetalleTareaPage implements OnInit {
  fileUrl: SafeResourceUrl;

  constructor(private domSanit: DomSanitizer) { }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  ngOnInit() {
    this.fileUrl= this.domSanit.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/watch?v=RjGPlLLqRYg&list=RDMM&index=27'
      );
  }

  addFavorite(){
  }

}
