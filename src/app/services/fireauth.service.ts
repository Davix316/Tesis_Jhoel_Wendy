import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { User } from '../shared/userinterface';

import { first, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {
  currentUser: any;

  constructor(private fAuth: AngularFireAuth,public router: Router,public firestore: AngularFirestore) {
    }


signIn(email,password){
    return this.fAuth.signInWithEmailAndPassword(email, password);
  }


  //REGISTRAR USUARIO
  registrar(usuario: User){
    this.fAuth.createUserWithEmailAndPassword(usuario.email,usuario.password)
     .then((userResponse)=>{
       // add the user to the "users" database
       usuario.id=userResponse.user.uid;
       usuario.rol='estudiante';
       //add the user to the database
       this.firestore.collection('Usuarios').add(usuario)
       .then(user => {
        this.router.navigate(['/login']);
         user.get().then(x => {
          //return the user data
          console.log(x.data());
          this.currentUser = x.data();
          window.alert('usuario registrado');
        });
       }).catch(err => {
         console.log(err);
       });


     })
     .catch((err)=>{
        console.log('error de registro: ', err);
     });

    }

    //TRAER USUARIO ACTUAL

getCurrentUser(){

  return this.fAuth.authState.pipe(first()).toPromise();

}

//RECUPERAR CONTRASEñA
async resetPassword(email: string): Promise<void> {
  try {
    return this.fAuth.sendPasswordResetEmail(email);
  } catch (error) {
    console.log(error);
  }
}

}

