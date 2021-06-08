import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(private fAuth: AngularFireAuth,public route: Router,public fStore: AngularFirestore) { }

// eslint-disable-next-line @typescript-eslint/naming-convention
SignIn(email,password){
    return this.fAuth.signInWithEmailAndPassword(email, password);
  }

}

