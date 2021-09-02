/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, fromCollectionRef, fromDocRef } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import { MateriasService } from 'src/app/services/materias.service';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { MateriasInterface } from 'src/app/shared/materias';
import { PublicacionInterface } from 'src/app/shared/publicacion';

@Component({
  selector: 'app-new-publicacion',
  templateUrl: './new-publicacion.page.html',
  styleUrls: ['./new-publicacion.page.scss'],
})
export class NewPublicacionPage implements OnInit {
  userInfo: any;
  idUser: string;
  listaMaterias: MateriasInterface[];



  idCarr='';
  fotoUser='';
  idMateria='';
  idUserPubli='';
  nameUser='';
  apellUser='';
  fechaPubli=new Date();
  likes=2;
  filepath='';


  public formPublicacion=new FormGroup({
    idMateria:new FormControl(),
    categoria:new FormControl(),
    titulo:new FormControl(),
    descripcion:new FormControl(),
    file:new FormControl(null, Validators.required),
  });


  constructor(
    private materiasServ: MateriasService,
    private firestore: AngularFirestore,
    private serviceauth: FireauthService,
    private publiServ: PublicacionService,
    private storage: AngularFireStorage,
    private storageService: FileUploadService,
  ) {

  }

/* Referencia de URL FILE */
@ViewChild('FileUrlUser') inputFile: ElementRef;
//Para ver porcentaje de carga de la imagen y recuperar URL
progreso=false;
porcentaje=0;
porcentajesubida: Observable<number>;
urlFile: Observable<string>;


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
        this.nameUser=this.userInfo.nombre;
        this.idUserPubli=this.userInfo.id;
        this.apellUser=this.userInfo.apellido;
        this.idCarr=this.userInfo.carreraId;
        this.fotoUser=this.userInfo.foto;
        //LISTAR MATERIAS DEL USUARIO
        this.obtenerMaterias(this.idCarr);
      } else {
        console.log('"no existe el usuario"');
      }
    }).catch((error) => {
      console.log('erro', error);
    });

  }


  //OBTENER MATERIAS DEL Usuario
  obtenerMaterias(idC: string) {

    const path = 'Materias';
    this.materiasServ.getCollection<MateriasInterface>(path).subscribe(res => {

      this.listaMaterias = res.filter(e => idC === e.idCarrera);

      //console.log(this.listaMaterias);

     /*  this.listaMaterias.forEach(element => {
        this.carreraId = element.id;
        //console.log(element.id);
      }); */


    });
  }

  //GUARDAR NUEVA PUBLICACION
  savePublicacion(publi: PublicacionInterface){
try {
  console.log(this.formPublicacion.value);
  if(this.formPublicacion.valid){
    const idPublicacion=publi.id || null;
    publi.fecha=this.fechaPubli;
    publi.idUser=this.idUserPubli;
    publi.nameUser=this.nameUser;
    publi.userFoto=this.fotoUser;
    publi.apellUser=this.apellUser;
    publi.likes=this.likes;
    publi.idCarrera=this.idCarr;
    publi.file=this.inputFile.nativeElement.value;
    this.publiServ.newPublicacion(publi,idPublicacion);
  } this.formPublicacion.reset();
} catch (error) {
console.log(error);
}
  }


//SUBIR ARCHIVO
uploadFile(pdf){
const file=pdf.target.files[0];
const filename = pdf.target.files[0].name;
 this.filepath='Archivos/'+ this.nameUser+ '/'+filename;
const ref=this.storage.ref(this.filepath);
const tarea= this.storage.upload(this.filepath,file);
this.porcentajesubida= tarea.percentageChanges();


tarea.snapshotChanges().pipe(finalize(()=>this.urlFile=ref.getDownloadURL())).subscribe();
this.progreso=true;
//Cambia el porcentaje
tarea.percentageChanges().subscribe((porcentaje) => {
  this.porcentaje = Math.round(porcentaje);
  if (this.porcentaje === 100) {
    this.progreso = false;
  }
});

}



}
