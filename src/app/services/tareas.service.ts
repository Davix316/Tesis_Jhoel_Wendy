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
   // this.tareasCollection=firestore.collection<TareasInterface>('Tareas');
   // this.getTareas();
   }

  getTareaDoc(id: string) {
    return this.firestore.collection('Tareas').doc(id).snapshotChanges();
  }

  getTareasList() {
    return this.firestore
    .collection('Tareas')
    .snapshotChanges();
  }

  /*  getTareas(): void{
    this.tareas=this.tareasCollection.snapshotChanges().pipe(
      map(action=> action.map(a=>a.payload.doc.data()as TareasInterface)),

    );

  } */

  getCollection<Tipo>(path: string){
    const collection = this.firestore.collection<Tipo>(path);
    return collection.valueChanges();

  }


}
