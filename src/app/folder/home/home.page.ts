/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PublicacionInterface } from 'src/app/shared/publicacion';
import {  ToastController } from '@ionic/angular';

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
cadena: string;
cutCadena: string;

publicaciones0=true;
numberOfLikes = 0;
numberOfDislikes = 0;

//obtener id Clic=keado
navigationExtras: NavigationExtras = {
  state: {
    value: null
  }
};

  constructor(
    private fireService: FirestoreService,
    private serviceauth: FireauthService,
    private firestore: AngularFirestore,
    private router: Router,
    public toastController: ToastController,
    ){

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
      //console.log('carrera ID:',this.carreraId);
      this.getPublicacion(this.carreraId);
    } else {
      // doc.data() will be undefined in this case
      this.failToast('No existe el Usuario');
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
       /*  this.publicaciones.forEach(element => {
          this.cadena=element.descripcion;
          this.cutCadena=this.cadena.substr(0,50);
          console.log('"parrafo"', this.cutCadena);
        }); */

        if(this.publicaciones.length===0){
          this.publicaciones0=true;
        }else{
          this.publicaciones0=false;

        }
    }).unsubscribe;
  }

//NAVIGATION EXTRAS
  infoTarea(item: any): void{
    this.navigationExtras.state.value=item;
      this.router.navigate(['/menu/detalle-tarea'],this.navigationExtras);
  }

  //LIKES
  likeButtonClick(){
    this.numberOfLikes++;
  }

  dislikeButtonClick(){
    this.numberOfDislikes++;
    this.numberOfLikes--;
  }


//PRESENTAR ALERTA LOGIN fallido
async failToast(text) {
  const toast = await this.toastController.create({
    message: text,
    duration: 3000,
    color: 'danger'
  });
  toast.present();
}

}
