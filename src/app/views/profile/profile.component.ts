import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Admin } from '../../shared/models/admin.interface';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit{
 
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

  constructor(private serviceAuth : FirebaseauthService, private firestore: AngularFirestore,
    private router:Router) {
     }

     ngOnInit() {

      this.serviceAuth.getCurrentUser().subscribe(user => {
        this.email = user.email;
        // console.log(user.uid);
        this.email=user.email;
        this.getuser();
      })

    }

    getuser(){
      this.firestore.collection('Usuarios').ref.where('email', '==', this.email)
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
             // console.log(doc.id, ' => ', doc.data());
          });
      })
      .catch((error) => {
          console.log('Error getting documents:' , error);
      });
    
    }
};
