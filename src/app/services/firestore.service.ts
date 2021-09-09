import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ComentariosInterface } from '../shared/comentarios';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore, ) {


  }
//LEER COLECCION EN ORDEN DESC

  getCollection<Interfaz>(coleccion: string){
    const collection = this.firestore.collection<Interfaz>(coleccion, ref=> ref.orderBy('fecha','desc'));
    return collection.valueChanges();
  }


getFavorito(idUser:string){
return this.firestore.collection('Favoritos').doc(idUser).valueChanges();
}


//GUARDAR COLECCION
saveCollection(comentario: ComentariosInterface, idP: string){
  const id=idP ||this.firestore.createId();
  comentario.id=id;
  this.firestore.collection('Comentarios').doc(id).set(comentario)
.then((docRef) => {
    console.log('registro exitoso');
   })
.catch((error) => {
    console.error('Error adding document: ', error);
});

}


//Guardar Coleccion GENERICO
saveDoc(  path: string, interf: any, idC: string){
  
  this.firestore.collection(path).doc(idC).set(interf)
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

//LEER UN SOLO DOCUMENTO

getDoc<tipo>(path: string, id: string){ // tipo es una variable cualquier auqe entra como argumento
  const collection = this.firestore.collection<tipo>(path);
  return collection.doc(id).valueChanges();
}

//ELIMINAR UN DOCUMENTO
deleteDoc(path: string, id: string){
  const collection = this.firestore.collection(path);
  return collection.doc(id).delete();
}

}
