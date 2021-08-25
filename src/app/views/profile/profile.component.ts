import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Admin } from '../../shared/models/admin.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThemeService } from '../../../app/views/services/theme.service';


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit{
 
  admin1: Admin;
  adminForm: FormGroup;
  private isEmail = /\S+@\S+\.\S+/;

  email: string;
  userLogIn: any;
  admin: Admin={
  id: '',
  nombre: '',
  apellido: '',
  telefono: '',
  numUnico: '',
  carrera: '',
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
    ) {
      this.initForm();
     }

     ngOnInit() {

      this.serviceAuth.getCurrentUser().subscribe(user => {
        this.email = user.email;
        this.getAdmin();
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
            this.admin.carrera=this.userLogIn.carrera;
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

    onSave(adminForm): void {

      console.log(adminForm.value);

      if (adminForm.valid) {
        console.log("valido")
        const admin1 = this.adminForm.value;
        const adminId = this.admin.id || null;
        const adminEmail = this.admin.email || null;
        this.adminsSvc.onSaveAdmin2(admin1, adminId, adminEmail);
      }else{
        console.log("no valido")
      }
    }


    private initForm(): void {
      this.adminForm = this.fb.group({
        nombre: [''],
        apellido: [''],
        email: ['', [Validators.pattern(this.isEmail)]],
        password: ['', [Validators.minLength(5)]],
        carrera: [''],
        numUnico: [''],
        semestreRef: [''],
        telefono: [''],
        rol: ['Administrador'],
        foto: '',
      });
    }
};
