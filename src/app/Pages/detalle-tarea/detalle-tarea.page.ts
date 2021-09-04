/* eslint-disable max-len */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
/* import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx'; */
import { PublicacionInterface } from 'src/app/shared/publicacion';
import { Platform } from '@ionic/angular';
import { FavoritosInterface } from 'src/app/shared/favoritos';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from 'src/app/componets/popinfo/popinfo.component';
import { MateriasInterface } from 'src/app/shared/materias';
import { AlertController } from '@ionic/angular';
import { ComentariosInterface } from 'src/app/shared/comentarios';
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
    nombreTarea: '',
    idPublicacion: [{ idPubli: '1', tituloPubli: '1' },
    { idPubli: '2', tituloPubli: '2' },
    { idPubli: '3', tituloPubli: '3' }],
  };

  listaMateria: MateriasInterface[];

  favoritoAdd = false;
  materiaId: string;
  nombreMateria: string;

  listComentarios: ComentariosInterface[];

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
    public alertController: AlertController,
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.tareas = navigation?.extras?.state?.value;
    //console.log('tareas cons:', this.tareas);
    //Si no hay ID de tarea retorna
    if (typeof this.tareas === 'undefined') {
      this.router.navigate(['/menu/home']);
    }
    //
    this.tareaId = this.tareas.id;
    this.nombreTarea = this.tareas.titulo;
    this.materiaId = this.tareas.idMateria;
    console.log('Tarea id:', this.tareaId);
    //TRAER EL NOMBRE DE LA MATERIA
    this.getMateria(this.materiaId);



  }


  ngOnInit(): void {


    //INFORMACION DE USUARIO ACTUAL
    this.serviceauth.stateAuth().subscribe(user => {
      if (user != null) {
        //id de Usuario de fireAuth
        this.idUser = user.uid;
        // console.log(this.idUser);
      }
    });


  }

  //GUARDAR FAVORITOS
  addFavorite() {
    try {
      this.favorito.idUser = this.idUser;
      this.favorito.nombreTarea = this.nombreTarea;

      this.favorito.idPublicacion = this.favorito.idPublicacion;
      console.log('VALORES FAVORITO', this.favorito);
      this.serviceFS.saveDoc('Favoritos', this.favorito, this.idUser);
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


      }

    }).unsubscribe;

  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: '.alerClass',
      header: 'Alerta!',
      message: '<strong>Seguro desea Eliminar esta Publicación </strong>?',
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


  //MOSTRAR POPOVER PARA ELIMINAR Y REPRTAR PUBLICACION

  async presentPopover(ev: any) {

    const popover = await this.popoverController.create({
      component: PopinfoComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      mode: 'ios'
      
    });
    await popover.present();
    const {data}= await popover.onDidDismiss();
    if(data.item=="Eliminar"){
      this.presentAlertConfirm()

    }
    console.log('botondesdeaPadre:', data);
      
    
  }






}
