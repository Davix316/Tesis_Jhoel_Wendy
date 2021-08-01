/* eslint-disable @typescript-eslint/no-unused-expressions */

import { Component, OnInit, Input, ViewChild, Query } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FireauthService } from 'src/app/services/fireauth.service';
import { MateriasService } from 'src/app/services/materias.service';
import { MateriasInterface } from 'src/app/shared/materias-interface';


@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {
  listaMaterias: MateriasInterface[];
  idUser: string;
  userLogIn: any;
  userInfo: any;
  carreraId: string;

materias: any;
textoBuscar='';
  // eslint-disable-next-line @typescript-eslint/member-ordering

  constructor(
    private materiasServ: MateriasService,
    private firestore: AngularFirestore,
    private serviceauth: FireauthService,
  ) {
    //INFORMACION DE USUARIO ACTUAL
    this.serviceauth.stateAuth().subscribe(user => {
      if (user != null) {
        this.idUser = user.uid;
        console.log(this.idUser);
        this.getuser(this.idUser);
      }
    });



  }


  ngOnInit() {

  }


  ///OBTENER INFO  USUARIO DE LA BDD
  public getuser(uid: string) {
    const docRef = this.firestore.collection('Usuarios').doc(uid);
    docRef.get().toPromise().then((doc) => {
      if (doc.exists) {
        //console.log('infoUser', doc.data());
        this.userInfo = doc.data();
        this.carreraId = this.userInfo.carrera;
        console.log(this.carreraId);
        //LISTAR MATERIAS DEL USUARIO
        this.obtenerMaterias(this.carreraId);
      } else {
        // doc.data() will be undefined in this case
        console.log('"no existe el usuario"');
      }
    }).catch((error) => {
      console.log('erro', error);
    });

  }

  //OBTENER MATERIAS DE LA CARRERA
  obtenerMaterias(idC: string){
  /* this.firestore.collection('Materias').ref.where('IdCarrera', '==', idC)
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' =>', doc.data());
        //this.materias=Object.values(doc.data());
        this.materias=doc.data();
        this.listaMaterias= this.materias;

      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
 */
const path='Materias';
this.materiasServ.getCollection<MateriasInterface>(path).subscribe(res=>{
this.listaMaterias=res.filter(e => idC===e.idCarrera);
console.log(this.listaMaterias);

});
}
//TOOLBAR SEARCH
buscar(event){
  console.log(event);
  this.textoBuscar=event.detail.value;


}

}
