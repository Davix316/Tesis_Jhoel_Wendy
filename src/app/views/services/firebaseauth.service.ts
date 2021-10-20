import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class FirebaseauthService {

  currentUser: any;
  token: string;
  idDoc: string;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private afAuth: AngularFireAuth, public firestore: AngularFirestore, public router: Router) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)

      .then((response) => {

        this.firestore.collection('Administradores').ref.where('email', '==', response.user.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            if(userRef.data()){
              //console.log('ROLE CURRENT', this.currentUser.rol);
            if (this.currentUser.rol === 'Administrador' || this.currentUser.rol === 'SuperAdministrador') {
              this.router.navigate(['dashboard']);
            }
            }else {
              window.alert("No es Administrador")
            }
          });
        });
      }
      ).catch(err=>window.alert(err.message))

  }

  async register(email: string, password: string) {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

  //RECUPERAR CONTRASEñA
  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }
}
