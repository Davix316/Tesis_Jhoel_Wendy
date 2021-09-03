/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
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
import { MateriasService } from 'src/app/services/materias.service';
import { getLocaleNumberSymbol } from '@angular/common';

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
 favorito: FavoritosInterface={
   id: this.serviceFS.getId(),
   idUser:'',
   nombreTarea:'',
   idPublicacion: [{idPubli: '1', tituloPubli:'1'},
   {idPubli: '2', tituloPubli:'2'},
   {idPubli: '3', tituloPubli:'3'}],
 };

 listaMateria: MateriasInterface[];

 favoritoAdd=false;
materiaId:string;
nombreMateria:string;

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
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.tareas = navigation?.extras?.state?.value;
    //console.log('tareas cons:', this.tareas);
    //Si no hay ID de tarea retorna
    if (typeof this.tareas === 'undefined') {
      this.router.navigate(['/home']);
    }
    //
    this.tareaId = this.tareas.id;
    this.nombreTarea=this.tareas.titulo;
    this.materiaId=this.tareas.idMateria;
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

//ABRIR ARCHIVO
openFile( urlFile: string){
  this.previewAnyFile.preview(urlFile).then(()=>{

  },(error)=>{
    alert(JSON.stringify(error));
  });
}

//CONSULTAR MATERIA
getMateria(idMateria: string){ 
  const path = 'Materias';
  this.fireStore.getDoc<MateriasInterface>(path, idMateria).subscribe( res => {
  
    this.nombreMateria=res.nombre;
    
  });
}

//MOSTRAR POPOVER PARA ELIMINAR Y REPRTAR PUBLICACION

async presentPopover(ev: any) {

  const popover = await this.popoverController.create({
    component: PopinfoComponent,
    cssClass: 'my-custom-class',
    event: ev,
    translucent: true,
    mode:'ios'
  });
  await popover.present();
  console.log('click pop');
  const { role } = await popover.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}




}
