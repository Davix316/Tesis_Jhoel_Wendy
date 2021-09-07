import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { exists } from 'fs';
import { chatInterface } from '../shared/chat';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  appsRef: AngularFireList<any>;
  
  constructor( private db: AngularFirestore,
    private realTime: AngularFireDatabase,
    ) { }


  
//GUARDAR COLECCION DE CHAT
  
saveCollectionChat(data: any, path: string, id: string){
  var doc =this.db.collection(path).doc(id);
 var getDoc=doc.get().subscribe(doc=>{
   if(!doc.exists){
     console.log('No existe el documento');
    
     this.db.collection(path).doc(id).set(data)
.then((docRef) => {
    console.log('registro exitoso');
   console.log(docRef);   
   })
.catch((error) => {
    console.error('Error adding document: ', error);
});
     
   }
   else{
    // console.log('document Dta', doc.data());
     this.db.collection('Mensajes').doc(id).update({
      chat: firebase.firestore.FieldValue.arrayUnion(data)
    })
    console.log('se actualizo el array');
    
     
   }

 })
  
    
      
    }
  




//ACTUALIZAR MENSAJES EN EL ARREGLO
updateCollectionChat(chat: chatInterface, idUSender:string){

  this.db.collection('Mensajes').doc(idUSender).update({
    chat: firebase.firestore.FieldValue.arrayUnion(chat)
  })
.then((docRef) => {
    console.log('actualizaion exitoso');
   })
.catch((error) => {
    console.error('Error adding document: ', error);
});
}


//LEER MENSAJES DE REALTIME
listarDatos() {
  this.appsRef = this.realTime.list('Mensajes');
return this.appsRef;
} 


//GENERAR ID aleatorio
getId(){
  return this.db.createId();
}


}
