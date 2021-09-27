/* eslint-disable max-len */
import { Component, OnInit,  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
/* import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx'; */
import { PublicacionInterface } from 'src/app/shared/publicacion';
import { Platform } from '@ionic/angular';
import { FavoritosInterface, publiFavoritoInterface } from 'src/app/shared/favoritos';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/componets/popinfo/popinfo.component';
import { MateriasInterface } from 'src/app/shared/materias';
import { AlertController } from '@ionic/angular';
import { ComentariosInterface } from 'src/app/shared/comentarios';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReportPublishPage } from '../report-publish/report-publish.page';
import { EditPublicacionPage } from '../edit-publicacion/edit-publicacion.page';


@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.page.html',
  styleUrls: ['./detalle-tarea.page.scss'],
})
export class DetalleTareaPage implements OnInit {
  /*  fileUrl: SafeResourceUrl;
   fileTransfer: FileTransferObject;
  */
  titulo: string;

  tareas: PublicacionInterface = null;
  tareaId: string;
  idUser: string;
  nombreTarea: string;
  favorito: FavoritosInterface = {
    id: this.serviceFS.getId(),
    idUser: '',    
    nameUser:'',
    publicacion:{}
  };
infPubli:publiFavoritoInterface[];


  listaMateria: MateriasInterface[];
favAdd:boolean;
  favoritoAdd = false;
  materiaId: string;
  nombreMateria: string;
  archivo:string;

  listComentarios: ComentariosInterface[];

  idUserPubli: string;
  userInfo:any;

publiDetalle:PublicacionInterface={
  id: '',
  idUser: '',
  idMateria: '',
  idCarrera: '',
  categoria: '',
  fecha: Date,
  likes: 0,
  disLikes:0,
  titulo: '',
  descripcion: '',
  nameUser: '',
  apellUser: '',
  file: '',
  imagen: '',
  userFoto: '',
}

listaFavoritos:any;
  constructor(
    private domSanit: DomSanitizer,
    private router: Router,
    /*  private file: File,
     private transfer: FileTransfer, */
    private platform: Platform,
    private serviceFS: FirestoreService,
    private serviceauth: FireauthService,
    private previewAnyFile: PreviewAnyFile,
    public popoverController: PopoverController,
    private fireStore: FirestoreService,
    private alertController: AlertController,
    public modalController: ModalController,
    private firestore: AngularFirestore,
    private fireService: FirestoreService,
  ) 
  {
    const navigation = this.router.getCurrentNavigation();
    this.tareas = navigation?.extras?.state?.value;
   console.log(this.tareas);
   
        
    //Si no hay ID de tarea retorna
    if (typeof this.tareas === 'undefined') {
      this.router.navigate(['/menu/home']);
    }    
    //
   


  }


  ngOnInit(): void {


    //INFORMACION DE USUARIO ACTUAL
    this.serviceauth.stateAuth().subscribe(user => {
      if (user != null) {
        //id de Usuario de fireAuth
        this.idUser = user.uid;
        this.getuser(this.idUser);
        // console.log(this.idUser);
        this.getFavorito(this.idUser); 
        
      }
    });
this.getPublicacion(this.tareas.id);


  }

  //CONSULTAR una sola Publicacion

  getPublicacion(idTarea) {
    this.fireService.getDoc<PublicacionInterface>('Publicaciones', idTarea).subscribe(res => {
      if(res){
        this.publiDetalle=res;

        //console.log('esta es la publicacion con detalle:', this.publiDetalle);
        this.tareaId = this.publiDetalle.id;
        this.nombreTarea = this.publiDetalle.titulo;
        this.materiaId = this.publiDetalle.idMateria;
        this.idUserPubli = this.publiDetalle.idUser;
        this.archivo=this.publiDetalle.file;          
    
        //TRAER EL NOMBRE DE LA MATERIA
        this.getMateria(this.materiaId);   
        
      }
      else{
        this.AlertPubliDelete('Publicación no disponible');    
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
       
      } else {
        console.log('"no existe el usuario"');
      }
    }).catch((error) => {
      console.log('erro', error);
    });

  }

  //GUARDAR FAVORITOS
  addFavorite(favor:FavoritosInterface) {
    const publicI:  publiFavoritoInterface={
      id: this.publiDetalle.id,
      titulo:this.publiDetalle.titulo,
      nameMateria:this.nombreMateria,
      file: this.archivo,
    }

    try {
      favor.id=this.serviceFS.getId();
      favor.idUser=this.idUser;
      favor.nameUser=this.userInfo.nombre;
      favor.publicacion=[publicI]      
      this.serviceFS.saveFavorito('Favoritos', favor, this.idUser, publicI);
      this.favoritoAdd = true;
    } catch (error) {
      console.log(error);

    }

  }

  //ABRIR ARCHIVO
  openFile(urlFile: string) {
    this.previewAnyFile.preview(urlFile).then(() => {

    }, (error) => {
      alert(JSON.stringify(error));
    });
  }

  //CONSULTAR MATERIA
  getMateria(idMateria: string) {
    const path = 'Materias';
    this.fireStore.getDoc<MateriasInterface>(path, idMateria).subscribe(res => {

      this.nombreMateria = res.nombre;

    });
  }


  //CONSULTA COMENTARIO
  //LEER COMENTARIOS
  DeleteComments(idP: string) {
    this.fireStore.getCollection<ComentariosInterface>('Comentarios').subscribe(res => {
      this.listComentarios = res.filter(e => idP === e.idPublicacion);
      console.log("lista de comentarios", this.listComentarios);
      for (let i = 0; i < this.listComentarios.length; i++) {
        const idCom = this.listComentarios[i].id;
        console.log('idComentario:', idCom);
        this.fireStore.deleteDoc('Comentarios', idCom);
        this.fireStore.deleteDoc('Votos',idCom)


      }

    }).unsubscribe;

  }

  async presentAlertConfirm(texto:string) {
    const alert = await this.alertController.create({
      cssClass: '.alerClass',
      header: 'Alerta!',
      message: texto,
      mode:"ios",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.fireStore.deleteDoc('Publicaciones', this.tareaId);
            this.DeleteComments(this.tareaId);

            this.router.navigate(["/menu/home"]);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }


  //MOSTRAR POPOVER PARA ELIMINAR Y REPORTAR PUBLICACION

  async presentPopover(ev: any, publicacion:any) {

    const popover = await this.popoverController.create({
      component: PopinfoComponent,
      cssClass: 'my-popover-class',
      event: ev,
      translucent: true,
      mode: 'ios',
      backdropDismiss: true,
      componentProps: {
        idPublishUser: this.idUserPubli,
        idUserLog: this.idUser,
      }

    });
    await popover.present();
    //trae los valor seleccionados del popInfo
    // const {data}= await popover.onWillDismiss(); // realiza la accion mas rapida q despues de cerrar
    try {
      const { data } = await popover.onDidDismiss();
      if (data.item == "Eliminar") {
        this.presentAlertConfirm('Seguro desea Eliminar esta Publicación?')
      }
      else if(data.item=="Reportar"){
        this.presentModal(publicacion);        

      }
      else if(data.item=="Editar"){
        this.ModalEditPubli(publicacion);
      }
    } catch (error) {
      //console.log('bye');
    }

  }


  async presentModal(infoPubli:any) {
    const modal = await this.modalController.create({
      component: ReportPublishPage,
      cssClass: 'my-custom-class',
      componentProps: {
       ObjPublicacion:infoPubli,
       ObjUReport: this.userInfo,
      }
    });
    return await modal.present();
  }

//LIKE
btnLike(Infpubli:any){
  this.serviceFS.saveLike('Publicaciones', Infpubli.id,1);
  console.log('add');
  
}


//EDIT PUBLICACION
async ModalEditPubli(infoPublicacion:any){
  const modal = await this.modalController.create({
    component: EditPublicacionPage,
    cssClass: 'my-custom-class',
    componentProps: {
      ObjectPubli:infoPublicacion,
      ObjectUser:this.userInfo,
    }
  });
  return await modal.present();
}

//ALERT PUBLICACION NO DISPONIBLE
async AlertPubliDelete(texto:string) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Alert',
    subHeader: '(⌣́_⌣̀)',
    message: texto,    
    mode:"ios",
    buttons: [
      {
        text: 'OK',
        handler: () => {
          this.router.navigate(["/menu/home"]);
         
        }
      }
    ]
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}

//LEER SI ES FAVORITO

getFavorito(idUsuario){
  this.fireStore.getFavorito(idUsuario).subscribe(res=>{
  if(res){
   this.listaFavoritos=res   
   console.log(this.tareas.id);
   console.log(this.listaFavoritos);   
   
  const search=this.listaFavoritos.publicacion.find(ref=>ref.id===this.tareas.id);
  if(search){
this.favAdd=true
  }else{
    this.favAdd=false
  }
     console.log('include', search);
 
  }
  }) 
}

}
