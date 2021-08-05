import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

////
publicaciones: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.publicaciones = firestore.collection('Publicaciones').valueChanges();

   }

  ngOnInit() {
  }

}
