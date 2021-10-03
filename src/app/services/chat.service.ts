import { Injectable, Query } from '@angular/core';
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
  chats:AngularFireList<any[]>;

  constructor( private db: AngularFirestore,
    private realTime: AngularFireDatabase,
    private firestore: AngularFirestore,
    ) { }


 

//LEER MENSAJES DE REALTIME
listarDatos() {
  this.appsRef = this.realTime.list('Mensajes');
return this.appsRef;


} 

//LEER MENSAJES DE REALTIME
listarChats() { 
  const ref = firebase.database().ref('Mensajes');
   return ref ;
} 

//LEER COLECCION USUARIOS

getUsers<Interfaz>(coleccion: string) {
  const collection = this.firestore.collection<Interfaz>(coleccion);
  return collection.valueChanges();
}



//GENERAR ID aleatorio
getId(){
  return this.db.createId();
}


}
