/* eslint-disable @typescript-eslint/no-unused-expressions */

import { Component, OnInit, Input, ViewChild, Query } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import { MateriasService } from 'src/app/services/materias.service';
import { MateriasInterface } from 'src/app/shared/materias';


@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
})
export class MateriasPage implements OnInit {
  listaMaterias: MateriasInterface[] ;
  idUser: string;
  userLogIn: any;
  userInfo: any;
  carreraId: string;

nivel: number;
subject: string;

textoBuscar='';
segment: number;

imgMaterias=[
  {src:'/assets/img/speakers/cheetah.jpg' },
  {src:'/assets/img/speakers/eagle.jpg'},
  {src:'/assets/img/speakers/elephant.jpg'} ,
  {src:'/assets/img/speakers/giraffe.jpg' },
  {src:'/assets/img/speakers/iguana.jpg' },

];

navigationExtras: NavigationExtras = {
  state: {
    value: null
  }
};

  // eslint-disable-next-line @typescript-eslint/member-ordering

  constructor(
    private materiasServ: MateriasService,
    private firestore: AngularFirestore,
    private serviceauth: FireauthService,
    private router: Router
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
    this.segment=0;
  }


  ///OBTENER INFO  USUARIO DE LA BDD
  public getuser(uid: string) {
    const docRef = this.firestore.collection('Usuarios').doc(uid);
    docRef.get().toPromise().then((doc) => {
      if (doc.exists) {
        //console.log('infoUser', doc.data());
        this.userInfo = doc.data();
        this.carreraId = this.userInfo.carreraId;
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

const path='Materias';
this.materiasServ.getCollection<MateriasInterface>(path).subscribe(res=>{

 this.listaMaterias=res.filter(e => idC===e.idCarrera);

//console.log(this.listaMaterias);

this.listaMaterias.forEach(element => {
  this.nivel=element.nivel;
  this.subject=element.nombre;

});


});
}



//TOOLBAR SEARCH
buscar(event){
  console.log(event);
  this.textoBuscar=event.detail.value;


}

detalleMateria(item: any): void{
  this.navigationExtras.state.value=item;
  this.router.navigate(['/menu/detalle-materia'],this.navigationExtras);
}




}
