import { Component, OnInit, Input, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { FireauthService } from 'src/app/services/fireauth.service';
import { User } from 'src/app/shared/userinterface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: string;
  id: string;
  userLogIn: any;
  user: User={
    id: '',
  nombre: '',
  apellido: '',
  telefono: 0,
  numeroUnico: 0,
  carrera: '',
  email: '',
  password: '',
  semestreRef: 0,
  foto: '',
  rol: '',
  };


  constructor(private serviceauth: FireauthService, private firestore: AngularFirestore) { }

  ngOnInit() {
    //ROL DE USUARIO AUTENTICADO
try{
  this.serviceauth.getCurrentUser().then(r=>{
    this.usuario=r.email;

   console.log(r.uid);
   this.id=r.uid;
   console.log(this.getuser());

  });
}catch(error){
  console.log(error);
}

}

getuser(){

  this.firestore.collection('Usuarios').ref.where('id', '==', this.id)
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.userLogIn=doc.data();
        this.user.nombre=this.userLogIn.nombre;
        this.user.apellido=this.userLogIn.apellido;
        this.user.telefono=this.userLogIn.telefono;
        this.user.numeroUnico=this.userLogIn.numUnico;
        this.user.carrera=this.userLogIn.carrera;
        this.user.email=this.userLogIn.email;
        this.user.password=this.userLogIn.password;
        this.user.semestreRef=this.userLogIn.semestreRef;
        this.user.foto=this.userLogIn.foto;
        this.user.rol=this.userLogIn.rol;
        //this.user.nombre=this.userLogIn.nombre;

          //console.log(doc.id, ' => ', doc.data());
      });
  })
  .catch((error) => {
      console.log('Error getting documents:' , error);
  });

}

}
