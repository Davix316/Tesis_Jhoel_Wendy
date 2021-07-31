import { Injectable, Query } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MateriasInterface } from '../shared/materias-interface';
import { FireauthService } from './fireauth.service';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

materias: any;

  constructor(private firestore: AngularFirestore) {
  }


  getCollection<Tipo>(path: string){
    const collection = this.firestore.collection<Tipo>(path);
    console.log('collecc', collection);
    return collection.valueChanges();
  }


}
