/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PublicacionInterface } from 'src/app/shared/publicacion';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

publicaciones: PublicacionInterface[]=[];

  constructor(private fireService: FirestoreService) {

   }

  ngOnInit() {
    this.getPublicacion();
  }

  getPublicacion(){
    this.fireService.getCollection<PublicacionInterface>('Publicaciones').subscribe(res => {
      this.publicaciones = res;
    }).unsubscribe;
  }

}
