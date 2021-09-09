/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PublicacionInterface } from 'src/app/shared/publicacion';
import {  ToastController } from '@ionic/angular';
import { ComentariosInterface } from 'src/app/shared/comentarios';

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


publicaciones0=true;
numberOfLikes = 0;
numberOfDislikes = 0;
listaComent: ComentariosInterface[];
numComent:any;

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
    private servFirestore: FirestoreService,
    ){

   }


  ngOnInit() {
    //INFORMACION DE USUARIO ACTUAL
    this.serviceauth.stateAuth().subscribe(user => {
     if (user != null) {
       this.idUser = user.uid;
       //console.log(this.idUser);
       this.getuser(this.idUser);
       console.log("Num Coment=>", this.numComent);
       
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
        if(this.publicaciones.length===0){
          this.publicaciones0=true;
        }else{
          this.publicaciones0=false;

        }

        this.publicaciones.forEach(element => {
          const idPubli=element.id
          this.countComments(idPubli);
                   
        });

        

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


//Contar COMENTARIOS
countComments(idP: string){
  this.servFirestore.getCollection<ComentariosInterface>('Comentarios').subscribe(res=>{
    this.listaComent = res.filter(e=>idP===e.idPublicacion);
  this.numComent=this.listaComent.length;
    console.log(' # comentarios:',this.listaComent.length  );


  }).unsubscribe;

}


}
