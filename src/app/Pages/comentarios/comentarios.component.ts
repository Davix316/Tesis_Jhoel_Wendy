/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { interval, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
//import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ComentariosInterface } from 'src/app/shared/comentarios';
import { PublicacionInterface } from 'src/app/shared/publicacion';
import { ImagePicker, ImagePickerOptions} from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/componets/popinfo/popinfo.component';
import { ModalController } from '@ionic/angular';
import { ReportarPage } from '../reportar/reportar.page';


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {

  listacoment: ComentariosInterface[];
  publi: PublicacionInterface=null;
  userInfo: any;
  tareaId: string;
  codUser: string;
  userName: string;
  apllUser: string;
  imgUser: string;
  voto=0;
  imgpath='';
 

  fechaComen=new Date();
  id=this.servFirestore.getId();
  comentarios0 = true;

  public formComentario=new FormGroup({
    texto:new FormControl('',[Validators.required]),
  });

images: any=[];


//Para ver porcentaje de carga de la imagen y recuperar URL
progreso=false;
porcentaje=0;
porcentajesubida: Observable<number>;
urlImg: Observable<string>;

toggleValue=false;

urlFile: Observable<string>;

//obtener id Clic=keado
navigationExtras: NavigationExtras = {
  state: {
    value: null
  }
};


  constructor(
    private router: Router,
    private serviceauth: FireauthService,
    private firestore: AngularFirestore,
    private servFirestore: FirestoreService,
    private storage: AngularFireStorage,
    private imgPicker: ImagePicker,
    private file: File,
    public popoverController: PopoverController,
    private firestoreService:FirestoreService,
    public modalController: ModalController,

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

/* Referencia de idComentario*/
@ViewChild('idComentario') idComentario: ElementRef
//Referencia del id user del comentario
@ViewChild('idComenUser') idComenUser: ElementRef


  ngOnInit() {

    
    

      //INFORMACION DE USUARIO ACTUAL
      this.serviceauth.stateAuth().subscribe(user => {
        if (user != null) {
          this.codUser = user.uid;
          //console.log(this.codUser);
          //Busca en la coleccion Usuarios
          this.getuser(this.codUser);
        }
      });

      //Leer comentarios por publicacion
      this.getComments(this.tareaId);

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
        this.apllUser=this.userInfo.apellido;
      } else {
        console.log('"no existe el usuario"');
      }
    }).catch((error) => {
      console.log('erro', error);
    });

  }


   //GUARDAR COMENTARIO EN LA BDD
   saveComentario(comn: ComentariosInterface){
    try {
      console.log(this.formComentario.value);
      if(this.formComentario.valid){
        const idComentario=comn.id || null;
        comn.fecha=this.fechaComen;
        comn.idUser=this.codUser;
        comn.nameUser=this.userName;
        comn.apellUser=this.apllUser;
        comn.fotoUser=this.imgUser;
        comn.idPublicacion=this.tareaId;
        comn.voto=this.voto;

        this.servFirestore.saveCollection(comn,idComentario);
        this.formComentario.reset();
      }
    } catch (error) {
    console.log(error);
    }
      }


//LEER COMENTARIOS
getComments(idP: string){
  this.servFirestore.getCollection<ComentariosInterface>('Comentarios').subscribe(res=>{
    this.listacoment = res.filter(e=>idP===e.idPublicacion);
    if (this.listacoment.length===0){
      this.comentarios0= true;
      //console.log('No hay comentarios');
    }
    else{
      this.comentarios0=false;
    }

  }).unsubscribe;

}
 //IMAGE PICKER
imagePicker() {
 const options: ImagePickerOptions={
   maximumImagesCount:5,
   width:30,
   height:30
 };
  this.imgPicker.getPictures(options).then((results) => {
    for (let i = 0; i < results.length; i++) {
       this.images.push('data:image/png;base64,' + results[i]);
     /*  const filename=results[i].substring(results[i].lastindexOf('/')+1);
      const path=results[i].substring(0,results[i].lastindexOf('/')+1);
      this.file.readAsDataURL(path, filename).then((base64String)=>{
this.images.push(base64String);
      }); */
    }
  }, (error) => {
    alert(error);
  });
}


uploadImage(imgs){
const imgFile=imgs.target.files[0];
const imgname = imgs.target.files[0].name;
this.imgpath='Imagenes/'+ this.tareaId+ '/'+imgname;

const ref=this.storage.ref(this.imgpath);
const tarea= this.storage.upload(this.imgpath,imgFile);
this.porcentajesubida= tarea.percentageChanges();


tarea.snapshotChanges().pipe(finalize(()=>this.urlImg=ref.getDownloadURL())).subscribe();
this.progreso=true;
//Cambia el porcentaje
tarea.percentageChanges().subscribe((porcentaje) => {
  this.porcentaje = Math.round(porcentaje);
  if (this.porcentaje === 100) {
    this.progreso = false;
  }
});


}

//Popover
async presentPopover(ev: any){

  const popover = await this.popoverController.create({
    component: PopinfoComponent,
    translucent: true,
    event: ev,
    mode:'ios',
    componentProps: {    
      idUserLogC:this.codUser,  
      idComentUser:this.idComenUser.nativeElement.value, 
    }
  });
  await popover.present();
  
//trae los valores seleccionados del popInfo
try {
  const { data } = await popover.onDidDismiss();
  console.log('opcion seleecionada', data);
  if(data.item=="Eliminar"){
    console.log('codigoUsuario:', this.codUser); 
    const idC=this.idComentario.nativeElement.value;
    console.log(idC);    
    this.firestoreService.deleteDoc("id del comentario",idC);
  }
 else if(data.item=="Reportar"){
   console.log("reportar true");   
   this.presentModal(this.idComentario.nativeElement.value);
   

 }
} catch (error) {
  console.log('bye desde comentarios');
  
}
 
  
}


infoUserChat(item: any): void{
  this.navigationExtras.state.value=item;
  this.router.navigate(['/menu/conversacion'],this.navigationExtras);
}
//PRESENT MODAL

async presentModal(idC:string) {
  const modal = await this.modalController.create({
    component: ReportarPage,
    componentProps: {
      codComentario:idC,
      idUserLog:this.codUser,
      nombreLog: this.userName  
    }
  });
   await modal.present();
/* const{data}=await modal.onDidDismiss();
console.log('retorno del modal', data.motivo); */

}



 

}
