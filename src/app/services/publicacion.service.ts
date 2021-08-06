import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PublicacionInterface } from '../shared/publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(private firestore: AngularFirestore) { }

  newPublicacion(publicacion: PublicacionInterface, idP: string){
    this.firestore.collection('Publicaciones').doc(idP).set(publicacion)
  .then((docRef) => {
      console.log('registro exitoso');
  })
  .catch((error) => {
      console.error('"Error adding document: "', error);
  });

  }
  getId(){
    return this.firestore.createId();
  }
}

