import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import  firebase from 'firebase';
import { ComentariosInterface } from '../shared/comentarios';

 

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  
  constructor(private firestoreS: AngularFirestore, ) {


  }
//LEER COLECCION EN ORDEN DESC

  getCollection<Interfaz>(coleccion: string){
    const collection = this.firestoreS.collection<Interfaz>(coleccion, ref=> ref.orderBy('fecha','desc'));
    return collection.valueChanges();
  }


getFavorito(idUser:string){
return this.firestoreS.collection('Favoritos').doc(idUser).valueChanges();
}


//GUARDAR COLECCION
saveCollection(comentario: ComentariosInterface, idP: string){
  const id=idP ||this.firestoreS.createId();
  comentario.id=id;
  this.firestoreS.collection('Comentarios').doc(id).set(comentario)
.then((docRef) => {
    console.log('registro exitoso');
   })
.catch((error) => {
    console.error('Error adding document: ', error);
});

}
//Guardar Coleccion GENERICO
saveDoc(  path: string, interf: any, idC: string){
  
  this.firestoreS.collection(path).doc(idC).set(interf)
.then((docRef) => {
    console.log('registro exitoso');
   })
.catch((error) => {
    console.error('Error adding document: ', error);
});

}


//Guardar FAVORITO
saveFavorito(  path: string, interf: any, idU: string, infP:any){

  var doc = this.firestoreS.collection(path).doc(idU);
  doc.get().subscribe((docData) => {
    if (docData.exists) {
      console.log('documento ya existe');
    
      this.firestoreS.collection(path).doc(idU).update({
        publicacion:firebase.firestore.FieldValue.arrayUnion(infP)
      })
      console.log('se actualizo');
      
    } else {
      console.log('documento no existe');
      this.firestoreS.collection(path).doc(idU).set(interf)
      .then((docRef) => {
          console.log('registro exitoso');
         })
      .catch((error) => {
          console.error('Error adding document: ', error);
      });
    }
  })


  
  

}

//GENERAR ID aleatorio
getId(){
  return this.firestoreS.createId();
}

//LEER UN SOLO DOCUMENTO

getDoc<tipo>(path: string, id: string){ // tipo es una variable cualquier auqe entra como argumento
  const collection = this.firestoreS.collection<tipo>(path);
  return collection.doc(id).valueChanges();
}

//ELIMINAR UN DOCUMENTO
deleteDoc(path: string, id: string){
  const collection = this.firestoreS.collection(path);
  return collection.doc(id).delete();
}

}
