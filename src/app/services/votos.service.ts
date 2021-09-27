import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import  firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class VotosService {

  constructor(private firestore: AngularFirestore,) { }


  
//Guardar Coleccion GENERICO
save1Voto(path: string, interf: any, idC: string) {

  this.firestore.collection(path).doc(idC).set(interf)
    .then((docRef) => {
      console.log('registro exitoso');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });

}

//AGREGAR VOTO
saveVoto( idC: string, interf:any, userId:string){ 
  var doc = this.firestore.collection("Votos").doc(idC);
  doc.get().subscribe((docData) => {
    if (docData.exists) {
      console.log('documento ya existe');

      this.firestore.collection("Votos").doc(idC).update({
        voto: firebase.firestore.FieldValue.arrayUnion(userId) //voto es el atributo a actualizarse
      })
      console.log('se actualizo');
    } else {
      console.log('documento no existe');
      this.firestore.collection("Votos").doc(idC).set(interf)
        .then((docRef) => {
          console.log('registro exitoso');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    }
  })


//  })    

}


//ELIMINAR UN Voto
deleteVoto(idDoc: string, user:any){
  this.firestore.collection("Votos").doc(idDoc).update({
    voto: firebase.firestore.FieldValue.arrayRemove(user)
  }).then(res=>{
    console.log('se quito de tu Voto');
  })
 
}


getVotos<Interfaz>(coleccion: string) {
  const collection = this.firestore.collection<Interfaz>(coleccion);
  return collection.valueChanges();
}


}
