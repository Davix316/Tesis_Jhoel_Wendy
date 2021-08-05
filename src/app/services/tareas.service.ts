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


  getCollection<Tipo>(path: string){
    const collection = this.firestore.collection<Tipo>(path);
    return collection.valueChanges();
  }

}
