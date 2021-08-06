import { unescapeIdentifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, fromCollectionRef, fromDocRef } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { FireauthService } from 'src/app/services/fireauth.service';
import { MateriasService } from 'src/app/services/materias.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { MateriasInterface } from 'src/app/shared/materias-interface';
import { PublicacionInterface } from 'src/app/shared/publicacion';

@Component({
  selector: 'app-new-publicacion',
  templateUrl: './new-publicacion.page.html',
  styleUrls: ['./new-publicacion.page.scss'],
})
export class NewPublicacionPage implements OnInit {
  userInfo: any;
  idUser: string;
  listaMaterias: MateriasInterface[];


  carreraId: string;

  idCarr='';
  idMateria='';
  idUserPubli='';
  nameUser='';
  apellUser='';
  fechaPubli=new Date();
  likes=2;
  id=this.publiServ.getId();



  public formPublicacion=new FormGroup({
    materia:new FormControl(),
    categoria:new FormControl(),
    titulo:new FormControl(),
    descripcion:new FormControl(),
    file:new FormControl()
  });

  constructor(
    private materiasServ: MateriasService,
    private firestore: AngularFirestore,
    private serviceauth: FireauthService,
    private publiServ: PublicacionService,
  ) {

  }




  ngOnInit() {
     //INFORMACION DE USUARIO ACTUAL
     this.serviceauth.stateAuth().subscribe(user => {
      if (user != null) {
        this.idUser = user.uid;
        //console.log(this.idUser);
        this.getuser(this.idUser);
      }
    });

  }



  ///OBTENER INFO  USUARIO DE LA BDD
  public getuser(uid: string) {
    const docRef = this.firestore.collection('Usuarios').doc(uid);
    docRef.get().toPromise().then((doc) => {
      if (doc.exists) {
        //console.log('infoUser', doc.data());
        this.userInfo = doc.data();
        this.nameUser=this.userInfo.nombre;
        this.idUserPubli=this.userInfo.id;
        this.apellUser=this.userInfo.apellido;
        this.idCarr=this.userInfo.carrera;
        console.log('"id":', this.idUserPubli);
        console.log('"nombre":', this.nameUser);

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


  //OBTENER MATERIAS DEL Usuario
  obtenerMaterias(idC: string) {

    const path = 'Materias';
    this.materiasServ.getCollection<MateriasInterface>(path).subscribe(res => {

      this.listaMaterias = res.filter(e => idC === e.idCarrera);

      console.log(this.listaMaterias);

      this.listaMaterias.forEach(element => {
        this.carreraId = element.id;
        console.log(element.id);
      });


    });
  }

  //GUARDAR NUEVA PUBLICACION
  savePublicacion(publi: PublicacionInterface){
try {
  console.log(this.formPublicacion.value);
  if(this.formPublicacion.valid){
    publi.fecha=this.fechaPubli;
    publi.idUser=this.idUserPubli;
    publi.nameUser=this.nameUser;
    publi.apellUser=this.apellUser;
    publi.likes=this.likes;
    publi.id=this.id;
    publi.idCarrera=this.idCarr;
    this.publiServ.newPublicacion(publi,this.id);
  }
} catch (error) {
console.log(error);

}

  }
}
