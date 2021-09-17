/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ComentariosInterface } from 'src/app/shared/comentarios';
import { PublicacionInterface } from 'src/app/shared/publicacion';
import { TareasInterface } from 'src/app/shared/tareas';
import { EditPublicacionPage } from '../edit-publicacion/edit-publicacion.page';

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
listComentarios: ComentariosInterface[];
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
    private modalController: ModalController,
    private alertController: AlertController,
    private fireStore: FirestoreService,
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

  //INFORMACION DE LA TAREA CLICKEADA
  infoTarea(item: any): void{
    this.navigationExtras.state.value=item;
      this.router.navigate(['/menu/detalle-tarea'],this.navigationExtras);

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

async presentAlertConfirm(publicacionInf:any) {
  const alert = await this.alertController.create({
    cssClass: '.alerClass',
    header: 'Alerta!',
    mode:"ios",
    message: 'Seguro desea Eliminar esta Publicación?',
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
          this.fireStore.deleteDoc('Publicaciones', publicacionInf.id);
          this.DeleteComments(publicacionInf.id);
          this.router.navigate(["/menu/mis-archivos"]);
          console.log('Confirm Okay');
        }
      }
    ]
  });

  await alert.present();
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


}
