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
 
  admin1: Admin;
  adminForm: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;
  fotoUser='';
  fotopath='';

  email: string;
  userLogIn: any;
  admin: Admin={
  id: '',
  nombre: '',
  apellido: '',
  telefono: 0,
  numUnico: 0,
  carreraNombre: '',
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
  progreso=false;
  porcentaje=0;
  porcentajesubida: Observable<number>;
  urlFoto: Observable<string>;


     ngOnInit() {

      this.serviceAuth.getCurrentUser().subscribe(user => {
        this.email = user.email;
        this.getAdmin();
      this.fotoUser = this.admin.foto;
      })
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
            this.admin.carreraNombre=this.userLogIn.carrera;
            this.admin.email=this.userLogIn.email;
            this.admin.password=this.userLogIn.password;
            this.admin.semestreRef=this.userLogIn.semestreRef;
            this.admin.foto=this.userLogIn.foto;
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

      console.log(this.adminForm.value);

      if (this.adminForm.valid) {
        adm.rol = "Administrador";
        console.log("valido")
        const admin1 = this.adminForm.value;
        const adminId = this.admin?.id || null;
        adm.foto=this.inputFoto.nativeElement.value;
        const adminEmail = this.admin?.email || null;
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
        password: ['', [Validators.minLength(5)]],
        carreraNombre: [''],
        numUnico: [''],
        semestreRef: [''],
        telefono: [''],
        rol: ['Administrador'],
        foto: '',
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
