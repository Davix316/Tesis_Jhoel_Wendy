import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VotosService {

  constructor(private firestore: AngularFirestore) { }


  
//Guardar Coleccion GENERICO
saveVoto(path: string, interf: any, idC: string) {

  this.firestore.collection(path).doc(idC).set(interf)
    .then((docRef) => {
      console.log('registro exitoso');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });

}


}
