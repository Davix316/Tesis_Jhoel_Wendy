import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-materia',
  templateUrl: './detalle-materia.page.html',
  styleUrls: ['./detalle-materia.page.scss'],
})
export class DetalleMateriaPage implements OnInit {
  segment: string;


  constructor() { }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  ngOnInit() {
    this.segment = 'first';
  }

}
