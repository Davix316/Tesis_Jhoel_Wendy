import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { PublicacionInterface } from 'src/app/shared/publicacion';
import { Platform } from '@ionic/angular';
import { FavoritosInterface } from 'src/app/shared/favoritos';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FireauthService } from 'src/app/services/fireauth.service';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.page.html',
  styleUrls: ['./detalle-tarea.page.scss'],
})
export class DetalleTareaPage implements OnInit {
  fileUrl: SafeResourceUrl;
  fileTransfer: FileTransferObject;

  titulo: string;

  tareas: PublicacionInterface = null;
  tareaId: string;
  idUser: string;
  nombreTarea: string;
 favorito: FavoritosInterface={
   id: this.serviceFS.getId(),
   idUser:'',
   nombreTarea:'',
   idPublicacion: [{idPubli: '1', tituloPubli:'1'},
   {idPubli: '2', tituloPubli:'2'},
   {idPubli: '3', tituloPubli:'3'}],
 };

 favoritoAdd=false;

  constructor(
    private domSanit: DomSanitizer,
    private router: Router,
    private file: File,
    private transfer: FileTransfer,
    private platform: Platform,
    private serviceFS: FirestoreService,
    private serviceauth: FireauthService,
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
    this.nombreTarea=this.tareas.titulo;
    console.log('Tarea id:', this.tareaId);



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
      this.favorito.idUser=this.idUser;
      this.favorito.nombreTarea=this.nombreTarea;

      this.favorito.idPublicacion=this.favorito.idPublicacion;
      console.log('VALORES FAVORITO',this.favorito);
      this.serviceFS.saveDoc('Favoritos', this.favorito, this.idUser);
      this.favoritoAdd=true;
    } catch (error) {
      console.log(error);

    }

  }


  /* // full example
  upload() {
    let options: FileUploadOptions = {
       fileKey: 'file',
       fileName: 'name.jpg',
       headers: {}
       .....
    }

    fileTransfer.upload('<file path>', '<api endpoint>', options)
     .then((data) => {
       // success
     }, (err) => {
       // error
     })
  } */

  download() {
    let path = null;
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else {
      path = this.file.dataDirectory;
    }
    ///
    const fileTransfer = this.transfer.create();
    const url = 'http://www.africau.edu/images/default/sample.pdf';
    fileTransfer.download(url, path + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      console.log(error);

    });
  }


}
