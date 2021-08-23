import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ComentariosInterface } from '../shared/comentarios';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {


  }
//LEER COLECCION

  getCollection<Interfaz>(coleccion: string){
    const collection = this.firestore.collection<Interfaz>(coleccion, ref=> ref.orderBy('fecha','desc'));
    return collection.valueChanges();
  }

//GUARDAR COLECCION
saveCollection(comentario: ComentariosInterface, idP: string){
  this.firestore.collection('Comentarios').doc(idP).set(comentario)
.then((docRef) => {
    console.log('registro exitoso');
   })
.catch((error) => {
    console.error('Error adding document: ', error);
});

}

//GENERAR ID aleatorio
getId(){
  return this.firestore.createId();
}

}
