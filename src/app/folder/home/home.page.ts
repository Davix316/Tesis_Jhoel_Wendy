/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PublicacionInterface } from 'src/app/shared/publicacion';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userInfo: any;
  idUser: string;
  carreraId: string;

publicaciones: PublicacionInterface[]=[];




  constructor(
    private fireService: FirestoreService,
    private serviceauth: FireauthService,
    private firestore: AngularFirestore,
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
      this.carreraId = this.userInfo.carreraId;
      console.log(this.carreraId);
      this.getPublicacion(this.carreraId);
    } else {
      // doc.data() will be undefined in this case
      console.log('"no existe el usuario"');
    }
  }).catch((error) => {
    console.log('erro', error);
  });

}



  getPublicacion(idC: string){
    this.fireService.getCollection<PublicacionInterface>('Publicaciones').subscribe(res => {
      this.publicaciones = res.filter(e=>idC===e.idCarrera
        );
        /* res.forEach(element => {
          element.fecha;
          console.log(element.fecha.toDateString());
        });
        console.log('e',res); */
    }).unsubscribe;
  }
}
