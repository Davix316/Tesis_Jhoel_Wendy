import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ComentariosInterface } from 'src/app/shared/comentarios';
import { PublicacionInterface } from 'src/app/shared/publicacion';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {

  coment: ComentariosInterface[];
  publi: PublicacionInterface=null;
  userInfo: any;
  tareaId: string;
  codUser: string;
  userName: string;
  imgUser: string;
  voto=0;

  fechaComen=new Date();
  id=this.servFirestore.getId();

  public formComentario=new FormGroup({
    texto:new FormControl(),
  });

  constructor(
    private router: Router,
    private serviceauth: FireauthService,
    private firestore: AngularFirestore,
    private servFirestore: FirestoreService,
    ) {

    const navigation = this.router.getCurrentNavigation();
    this.publi = navigation?.extras?.state?.value;
    console.log('detalle tarea en Comentarios:', this.publi);
    //Si no hay ID de tarea retorna
    if (typeof this.publi==='undefined') {
      this.router.navigate(['/menu/home']);
    }
    //
    this.tareaId = this.publi.id;
    console.log(' Comentarios-> Tarea id:', this.tareaId);
  }

  ngOnInit() {
      //INFORMACION DE USUARIO ACTUAL
      this.serviceauth.stateAuth().subscribe(user => {
        if (user != null) {
          this.codUser = user.uid;
          console.log(this.codUser);
          //Busca en la coleccion Usuarios
          this.getuser(this.codUser);
        }
      });

  }

  ///OBTENER INFO  USUARIO DE LA BDD
  public getuser(uid: string) {
    const docRef = this.firestore.collection('Usuarios').doc(uid);
    docRef.get().toPromise().then((doc) => {
      if (doc.exists){
        //console.log('infoUser', doc.data());
        this.userInfo = doc.data();
        this.userName=this.userInfo.nombre;
        this.imgUser=this.userInfo.foto;
      } else {
        console.log('"no existe el usuario"');
      }
    }).catch((error) => {
      console.log('erro', error);
    });

  }


   //GUARDAR COMENTARIO EN LA BDD
   savePublicacion(comn: ComentariosInterface){
    try {
      console.log(this.formComentario.value);
      if(this.formComentario.valid){
        comn.id=this.id;
        comn.fecha=this.fechaComen;
        comn.idUser=this.codUser;
        comn.nameUser=this.userName;
        comn.fotoUser=this.imgUser;
        comn.idPublicacion=this.tareaId;
        comn.voto=this.voto;

        this.servFirestore.saveCollection(comn,this.id);
      }
    } catch (error) {
    console.log(error);
    }
      }
}
