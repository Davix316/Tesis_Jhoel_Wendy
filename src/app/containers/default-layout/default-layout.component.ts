import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import { navItems2 } from '../../_nav2';
import { FirebaseauthService } from '../../views/services/firebaseauth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Admin } from '../../shared/models/admin.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public navItems2 = navItems2;
  email: string;
  rol: string;
  userLogIn: any;
  admin: Admin={
  id: '',
  nombre: '',
  apellido: '',
  telefono: '',
  numUnico: '',
  carreraNombre: '',
  email: '',
  password: '',
  semestreRef: '',
  foto: '',
  rol: '',
  };

  rolU: string;

  constructor(private serviceAuth : FirebaseauthService, 
              private afAuth: AngularFireAuth, 
              private router:Router, 
              private firestore: AngularFirestore,) {
     }

     ngOnInit() {

      this.serviceAuth.getCurrentUser().subscribe(user => {
        this.email = user.email;
        this.getuser();

      })

        //this.name = "super.admin@epn.edu.ec";
    }

    getuser(){

      this.firestore.collection('Administradores').ref.where('email', '==', this.email)

      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.userLogIn=doc.data();
            this.rolU=this.userLogIn.rol;
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

            console.log(this.admin.rol);
          });
      })
      .catch((error) => {
          console.log('Error getting documents:' , error);
      });
    
    }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  async salir() {
    this.serviceAuth.logout();
    console.log("Cerro Sesión")
    this.router.navigate(['/login'])
  }
}
