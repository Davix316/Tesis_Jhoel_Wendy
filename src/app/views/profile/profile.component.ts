import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Admin } from '../../shared/models/admin.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThemeService } from '../../../app/views/services/theme.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit{
 
  mostrar: Boolean = false;
  mensaje_enlace: String = 'Editar Información';

  fotopath = '';
  fotoUser = '';

  adminForm: FormGroup;

  private isEmail = /\S+@\S+\.\S+/;

  email: string;
  userLogIn: any;
  admin: Admin={
  id: '',
  nombre: '',
  apellido: '',
  telefono: 0,
  numUnico: 0,
  carreraNombre: '',
  carreraId: '',
  email: '',
  password: '',
  semestreRef: '',
  foto: '',
  rol: '',
  };

  constructor(
    private serviceAuth : FirebaseauthService, 
    private firestore: AngularFirestore,
    private fb: FormBuilder, 
    private router:Router,
    private adminsSvc: ThemeService, 
    private storage: AngularFireStorage,
    ) {
      this.initForm();
     }

  @ViewChild('FotoUrlUser') inputFoto: ElementRef;
  @ViewChild('nombreUsuario') inputNombres: ElementRef;
  @ViewChild('apellidoUsuario') inputApellidos: ElementRef;
  @ViewChild('carreraUsuario') inputCarrera: ElementRef;
  @ViewChild('numUnicoUsuario') inputNumunico: ElementRef;
  @ViewChild('semestreUsuario') inputSemestre: ElementRef;
  @ViewChild('telefonoUsuario') inputTelefono: ElementRef;
  progreso=false;
  porcentaje=0;
  porcentajesubida: Observable<number>;
  urlFoto: Observable<string>;


     ngOnInit():void {

      this.serviceAuth.getCurrentUser().subscribe(user => {
        this.email = user.email;
        this.getAdmin();
        
      })

    }

    mostrarOcultar(){
      if(this.mostrar){
        this.mensaje_enlace = "Editar Información";
        this.mostrar = false;
      }else{
        this.mensaje_enlace = "Ocultar Edición";
        this.mostrar = true;
      }
    }

    getAdmin(){
      this.firestore.collection('Administradores').ref.where('email', '==', this.email)

      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.userLogIn=doc.data();
            this.admin.nombre=this.userLogIn.nombre;
            this.admin.apellido=this.userLogIn.apellido;
            this.admin.telefono=this.userLogIn.telefono;
            this.admin.numUnico=this.userLogIn.numUnico;
            this.admin.carreraNombre=this.userLogIn.carreraNombre;
            this.admin.email=this.userLogIn.email;
            this.admin.password=this.userLogIn.password;
            this.admin.semestreRef=this.userLogIn.semestreRef;
            this.admin.foto=this.userLogIn.foto;
            this.fotoUser = this.userLogIn.foto;
            this.admin.rol=this.userLogIn.rol;
            this.admin.id = this.userLogIn.id;
            //console.log(doc.id, ' => ', doc.data());
          });
      })
      .catch((error) => {
          console.log('Error getting documents:' , error);
      });
    }

    onSave(adm): void {

      if (adm.carreraNombre === "TS- Electromecánica") {
        adm.carreraId = "TkiP9dMmAXyoscir6GqF";
      } else
        if (adm.carreraNombre === "TS- Redes y Telecomunicaciones") {
          adm.carreraId = "i6e9eP0YTsnowV8p8EKi";
        }
        else
          if (adm.carreraNombre === "TS- Agua y Saneamiento Ambiental") {
            adm.carreraId = "iw6XSHR2NiPPkwMSjKBM";
          } else
            if (adm.carreraNombre === "TS- Desarrollo de Software") {
              adm.carreraId = "ph4kM1eyF6KoaieJqCr0";
            }

      console.log(this.adminForm.value);

      if (this.adminForm.valid) {
        adm.rol = "Administrador";
        console.log("valido")
        const admin1 = this.adminForm.value;
        const adminId = this.admin?.id || null;
        const adminEmail = this.admin?.email || null;

        if(this.inputFoto.nativeElement.value===""){
          adm.foto =  this.fotoUser;
        }else{
          adm.foto = this.inputFoto.nativeElement.value;  
        }

        if(this.inputNombres.nativeElement.value===""){
          adm.nombre = this.admin.nombre;
        }else{
          adm.nombre = this.inputNombres.nativeElement.value;
        }

        if(this.inputApellidos.nativeElement.value===""){
          adm.apellido = this.admin.apellido;
        }else{
          adm.apellido = this.inputApellidos.nativeElement.value;
        }

        if(this.inputCarrera.nativeElement.value===""){
          adm.carreraNombre = this.admin.carreraNombre;
        }else{
          adm.carreraNombre = this.inputCarrera.nativeElement.value;
        }

        if(this.inputNumunico.nativeElement.value===""){
          adm.numUnico = this.admin.numUnico;
        }else{
          adm.numUnico = this.inputNumunico.nativeElement.value;
        }

        if(this.inputSemestre.nativeElement.value===""){
          adm.semestreRef = this.admin.semestreRef;
        }else{
          adm.semestreRef = this.inputSemestre.nativeElement.value;
        }

        if(this.inputTelefono.nativeElement.value===""){
          adm.telefono = this.admin.telefono;
        }else{
          adm.telefono = this.inputTelefono.nativeElement.value;
        }

        adm.password = this.admin.password;
        adm.email = this.admin.email;
        
        this.adminsSvc.onSaveAdmin2(admin1, adminId, adminEmail, adm.foto);
        this.router.navigate(['perfil']);
      
      }else{
        console.log("no valido")
      }
    }

    private initForm(): void {
      this.adminForm = this.fb.group({
        nombre: [''],
        apellido: [''],
        email: [''],
        password: [''],
        carreraNombre: [''],
        carreraId: ['ph4kM1eyF6KoaieJqCr0'],
        numUnico: [''],
        semestreRef: [''],
        telefono: [''],
        rol: ['Administrador'],
        foto: [''],
      });
    }

    uploadFoto(foto){
      //generar id Aleatorio para el archivo
      const id= Math.random().toString(36).substring(2);
      const file=foto.target.files[0];
      this.fotopath='Perfil/'+ 'user_'+id;
      const ref=this.storage.ref(this.fotopath);
      const tarea= this.storage.upload(this.fotopath,file);
      this.porcentajesubida= tarea.percentageChanges();
      
      tarea.snapshotChanges().pipe(finalize(()=>this.urlFoto=ref.getDownloadURL())).subscribe();
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
