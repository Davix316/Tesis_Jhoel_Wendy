import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {


  }

  getCollection<Interfaz>(coleccion: string){
    const collection = this.firestore.collection<Interfaz>(coleccion, ref=> ref.orderBy('fecha','desc'));
    return collection.valueChanges();
  }


}
