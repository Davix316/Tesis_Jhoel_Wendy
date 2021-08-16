import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TareasInterface } from '../shared/tareas-interface';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  tareas: Observable<TareasInterface[]>;
  tareasCollection: AngularFirestoreCollection<TareasInterface>;

  constructor(private firestore: AngularFirestore) {

   }


  getCollection<Interfaz>(coleccion: string){
    const collection = this.firestore.collection<Interfaz>(coleccion);
    return collection.valueChanges();
  }

  getTarea<Interfaz>(path: string, id: string){
    const collection = this.firestore.collection<Interfaz>(path);
    return collection.doc(id).valueChanges();
  }

}
