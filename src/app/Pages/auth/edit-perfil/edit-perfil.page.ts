import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FireauthService } from 'src/app/services/fireauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserInterface } from 'src/app/shared/user';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.page.html',
  styleUrls: ['./edit-perfil.page.scss'],
})
export class EditPerfilPage implements OnInit {

  userInf: UserInterface = null;
  foto: string;
  nombre: string;
  apellido: string
  telefono: number;
  numUnico: number;
  password: string;
  semestre: number;
  idUser:string
infUser:UserInterface;
  public formEditUser=new FormGroup({
    numUnico:new FormControl('',[Validators.required]),
    nombre:new FormControl('',[Validators.required]),
    apellido:new FormControl('',[Validators.required]),
    telefono:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    semestreRef:new FormControl('',[Validators.required]),
    foto:new FormControl(),
  });

  porcentajesubida: Observable<number>;
  urlImage: Observable<string>;
  progreso=false;
porcentaje=0;
/* Referencia de URL FOTO */
@ViewChild('imageUrlUser') inputImageUser: ElementRef;
changeFoto=false;

  constructor(
    private router: Router, 
    private toastController: ToastController,
    private fireStore: FirestoreService,
    private storage: AngularFireStorage,
    private serviceauth: FireauthService
    ) {
    const navigation = this.router.getCurrentNavigation();
    this.userInf = navigation?.extras?.state?.value;
    

    //Si no hay ID de tarea retorna
    if (typeof this.userInf === 'undefined') {
      this.router.navigate(['/menu/perfil']);
    }
   
    this.nombre = this.userInf.nombre;
    this.apellido = this.userInf.apellido;
    this.telefono=this.userInf.telefono;
    this.numUnico=this.userInf.numUnico;
    this.password=this.userInf.password;
    this.semestre=this.userInf.semestreRef;
    this.idUser=this.userInf.id;
    this.foto=this.userInf.foto;
   
  }

  ngOnInit() {
    this.rellenarForm();
  
    
  }

  //RELLENAR FORMULARIO
  rellenarForm(){
    this.formEditUser.patchValue({
      numUnico:this.numUnico,
      nombre:this.nombre,
      apellido:this.apellido,
      telefono:this.telefono,
      password:this.password,
      semestreRef:this.semestre,
      //foto:this.foto,
   // file:this.ObjectPubli.file
  });
  }

  //ACTUALIZAR PUBLI
updateUsuario(user: UserInterface){
  if(this.formEditUser.valid){
    user.email=this.userInf.email;
    user.carreraId=this.userInf.carreraId;
    user.carreraNombre=this.userInf.carreraNombre;
    user.rol=this.userInf.rol;
    
    if(this.inputImageUser.nativeElement.value===""){
     user.foto=this.userInf.foto;  
     console.log('esta vacio');  
    }
    else{
      console.log('nueva url');   
      user.foto=this.inputImageUser.nativeElement.value;
    } 
     this.fireStore.updateDoc(user,'Usuarios',this.idUser)
     this.presentToast('Publicación Actualizada','success');
     this.router.navigate(['/menu/perfil']);
  }else{
    this.presentToast('No deje campos Vacios','danger');
    
  }
 
  
}

//SUBIR ARCHIVO
uploadFile(e){
 //console.log('subir', e.target.files[0]);
//generar id Aleatorio para el archivo
const id= Math.random().toString(36).substring(2);
const file=e.target.files[0];
const filepath=`Perfil/user_${id}`;
const ref=this.storage.ref(filepath);
const tarea= this.storage.upload(filepath,file);
this.porcentajesubida= tarea.percentageChanges();

this.progreso=true;
tarea.snapshotChanges().pipe(finalize(()=>this.urlImage=ref.getDownloadURL())).subscribe();

//Cambia el porcentaje
tarea.percentageChanges().subscribe((porcentaje) => {
  this.porcentaje = Math.round(porcentaje);
  if (this.porcentaje === 100) {
    this.changeFoto = true;
  }
});

  }
  


//PRESENTAR ALERTA 
async presentToast(text, color:string) {
  const toast = await this.toastController.create({
    message: text,
    duration: 2000,
    color: color
  });
  toast.present();
}



}
