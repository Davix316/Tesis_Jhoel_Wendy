import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseauthService } from '../../views/services/firebaseauth.service';
import { Admin } from '../../shared/models/admin.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CheckloginGuard2 implements CanActivate, OnInit {

  email: string;
  rol: string;
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

  rolU: string;


  constructor(private fAuth: AngularFireAuth, 
              public router: Router,
              private serviceAuth : FirebaseauthService,
              private firestore: AngularFirestore){
  }

  ngOnInit() {

    this.serviceAuth.getCurrentUser().subscribe(user => {
      this.email = user.email;
      this.getuser();
    })

    this.getuser();

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
          this.admin.carrera=this.userLogIn.carrera;
          this.admin.email=this.userLogIn.email;
          this.admin.password=this.userLogIn.password;
          this.admin.semestreRef=this.userLogIn.semestreRef;
          this.admin.foto=this.userLogIn.foto;
          this.admin.rol=this.userLogIn.rol;
          console.log(doc.id, ' => ', doc.data());

          console.log("JJAS",this.admin.rol);
        });
    })
    .catch((error) => {
        console.log('Error getting documents:' , error);
    });
  
  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

        this.ngOnInit();
        this.getuser();
      
        if(this.admin.rol == "SuperAdministrador"){
          console.log('Super Admin:', true);
          return true;
        }
        else{
          this.router.navigate(['/dashboard']);
          console.log('super Admin:', false);
        return false;
        }
}
}