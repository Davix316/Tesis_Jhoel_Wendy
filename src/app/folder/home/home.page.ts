/* eslint-disable @typescript-eslint/no-unused-expressions */
import { asNativeElements, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PublicacionInterface } from 'src/app/shared/publicacion';
import {  ToastController } from '@ionic/angular';
import { ComentariosInterface } from 'src/app/shared/comentarios';
import { VotosService } from 'src/app/services/votos.service';
import { VotosInterface } from 'src/app/shared/votos';

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
listaComent:any;
//votoAdd=false;
//obtener id Clic=keado
navigationExtras: NavigationExtras = {
  state: {
    value: null
  }
};

comentarios0:boolean;
totalVotos:number;
votos: any;
  VotosTotal: VotosInterface[];
  arrayVoto: any[];
totalComentarios:any;
  votoAdd: boolean;
 VotosPubli:any;

  constructor(
    private fireService: FirestoreService,
    private serviceauth: FireauthService,
    private firestore: AngularFirestore,
    private router: Router,
    public toastController: ToastController,
    private serviceVoto: VotosService,
   
    ){
      

   }


  ngOnInit() {
    //INFORMACION DE USUARIO ACTUAL
    this.serviceauth.stateAuth().subscribe(user => {
     if (user != null) {
       this.idUser = user.uid;
       //console.log(this.idUser);
       this.getuser(this.idUser);
       this.getVotos(user.uid);
       
     }
   });

//console.log(this.idPubli.nativeElement.value);
//this.numComentarios();
  
    this.getVoto();
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
      this.publicaciones = res.filter(e=>idC===e.idCarrera);      
      //console.log(this.publicaciones);
       
        if(this.publicaciones.length===0){
          this.publicaciones0=true;
        }else{
          this.publicaciones0=false;
        }
      
        this.publicaciones.forEach(element => {         
         this.numComentarios(element.id);              
         
        });


    });
  }



//NAVIGATION EXTRAS
  infoTarea(item: any): void{
    this.navigationExtras.state.value=item;
      this.router.navigate(['/menu/detalle-tarea'],this.navigationExtras);
  }


 
//PRESENTAR ALERTA LOGIN fallido
async failToast(text) {
  const toast = await this.toastController.create({
    message: text,
    duration: 3000,
    mode:"ios",
    color: 'danger'
  });
  toast.present();
}

//OBTENER VOTOS
getVotos(idU: string){
  this.serviceVoto.getVotos<VotosInterface>('Votos').subscribe(res=>{
    this.VotosTotal=res.filter(e=>idU===e.idOwnerComentario)
    if (this.VotosTotal.length === 0) {
      this.comentarios0 = true;
      this.totalVotos = 0;
    } 
    else {
      this.arrayVoto=[];
      this.totalVotos = 0;
      this.comentarios0 = false;
      this.VotosTotal.forEach(element => {
        this.arrayVoto= this.arrayVoto.concat(element.voto)
        this.totalVotos=this.arrayVoto.length
  
      });
      

    }
  
  })
  }


  
addLike(itemPubli:any){
  const  idUser=this.idUser;  
  const votos={
    id:this.fireService.getId(),
    idPublicacion:itemPubli.id,
    idOwnerPublic:itemPubli.idUser,
    voto:[idUser],
    dislike:[],
  } 
  console.log(votos);  
  this.serviceVoto.saveVoto(itemPubli.id, votos,idUser);
  this.serviceVoto.deleteDislike(itemPubli.id,idUser);
  this.votoAdd=true;
}

addDislike(infPubli:any){   
    const  idUser=this.idUser  
    const votos={
      id:this.fireService.getId(),
      idPublicacion:infPubli.id,
      idOwnerPublic:infPubli.idUser,
      voto:[],
      dislike:[idUser],
    } 
   this.serviceVoto.saveDislike(infPubli.id, votos,idUser)
   this.serviceVoto.deleteVoto(infPubli.id,idUser);

}

//Count Votos en las publicaciones
getVoto(){
  this.serviceVoto.getVotos('Votos').subscribe(res=>{
  if(res){
    this.VotosPubli=res;
  }
  }) 
}



///Contar Comentarios
numComentarios(idP:string){
this.fireService.getCollection<ComentariosInterface>('Comentarios').subscribe(res=>{
//this.listaComent=res.filter(res=>res.idPublicacion==idP);
this.listaComent=res;
var contador=0;
this.listaComent.forEach(element => {
  if(element.idPublicacion===idP){
    contador++

  }
});
this.totalComentarios=contador++;
//console.log(this.totalComentarios);
//console.log(this.totalComentarios);
})


}//fin de funct comentarios




}
