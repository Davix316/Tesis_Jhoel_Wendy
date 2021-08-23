import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { PublicacionInterface } from 'src/app/shared/publicacion';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.page.html',
  styleUrls: ['./detalle-tarea.page.scss'],
})
export class DetalleTareaPage implements OnInit {
  fileUrl: SafeResourceUrl;
  fileTransfer: FileTransferObject;

  titulo: string;

   tareas: PublicacionInterface=null;


  tareaId: string;


  constructor(
    private domSanit: DomSanitizer,
    private router: Router,
   private file: File,
   private transfer: FileTransfer,
   private platform: Platform,
     ) {

      const navigation = this.router.getCurrentNavigation();
      this.tareas = navigation?.extras?.state?.value;
      console.log('tareas cons:', this.tareas);
      //Si no hay ID de tarea retorna
      if (typeof this.tareas==='undefined') {
        this.router.navigate(['/menu/home']);
      }
      //
      this.tareaId = this.tareas.id;
      console.log('Tarea id:', this.tareaId);



  }



  ngOnInit(): void{


    this.fileUrl= this.domSanit.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/watch?v=RjGPlLLqRYg&list=RDMM&index=27'
      );



  }

  addFavorite(){
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
    let path =null;
    if(this.platform.is('ios')){
      path=this.file.documentsDirectory;
    }else{
  path=this.file.dataDirectory;
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
