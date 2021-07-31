import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class MateriasService {

materias: any;

  constructor(private firestore: AngularFirestore) {
  }


  getCollection<Tipo>(path: string){
    const collection = this.firestore.collection<Tipo>(path);
    //console.log('collecc', collection);
    return collection.valueChanges();
  }


}
