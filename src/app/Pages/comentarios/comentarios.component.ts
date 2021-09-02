/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

/* Referencia de URL FILE */
@ViewChild('FileUrlUser') inputFile: ElementRef;
//Para ver porcentaje de carga de la imagen y recuperar URL
progreso=false;
porcentaje=0;
porcentajesubida: Observable<number>;
urlImg: Observable<string>;

toggleValue=false;

  constructor(
    private router: Router,
    private serviceauth: FireauthService,
    private firestore: AngularFirestore,
    private servFirestore: FirestoreService,
    private storage: AngularFireStorage,
    private imgPicker: ImagePicker,
    private file: File,
    public popoverController: PopoverController,

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
      console.log('No hay comentarios');
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
async presentPopover(ev: any) {

  const popover = await this.popoverController.create({
    component: PopinfoComponent,
    cssClass: 'my-custom-class',
    translucent: true,
    event: ev,
    mode:'ios'
  });
  await popover.present();
  console.log('click pop');
  const { role } = await popover.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}

}
