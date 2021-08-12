/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PublicacionInterface } from 'src/app/shared/publicacion';

@Component({
  selector: 'app-mis-archivos',
  templateUrl: './mis-archivos.page.html',
  styleUrls: ['./mis-archivos.page.scss'],
})
export class MisArchivosPage implements OnInit {

  userInfo: any;
  idUser: string;
  idPubliUser: string;

misArchivos: PublicacionInterface[]=[];

  constructor(
    private fireService: FirestoreService,
    private serviceauth: FireauthService,
    private firestore: AngularFirestore,
  ) { }

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
      this.idPubliUser=this.userInfo.id;
      //console.log(this.userInfo.id);
      //console.log('publiUserId',this.idPubliUser);

      this.getPublicacion(this.idPubliUser);
    } else {
      // doc.data() will be undefined in this case
      console.log('"no existe el usuario"');
    }
  }).catch((error) => {
    console.log('erro', error);
  });

}


  getPublicacion(idU: string){
    this.fireService.getCollection<PublicacionInterface>('Publicaciones').subscribe(res => {
      this.misArchivos = res.filter(e=>idU===e.idUser
        );
        /* res.forEach(element => {
          element.fecha;
          console.log(element.fecha.toDateString());
        });*/
        console.log('e',this.misArchivos);
    }).unsubscribe;
  }



}
