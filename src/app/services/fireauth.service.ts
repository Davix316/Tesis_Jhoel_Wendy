/* eslint-disable @typescript-eslint/no-shadow */
import { ERROR_COMPONENT_TYPE } from '@angular/compiler';
import { ErrorHandler, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { error } from 'protractor';
import { BehaviorSubject, onErrorResumeNext } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserInterface } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {
  currentUser: any;
  token: string;
  idDoc: string;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private fAuth: AngularFireAuth,
    public router: Router,
    public firestore: AngularFirestore,
    private alertController: AlertController,
    public toastController: ToastController,
  ) { }


  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }


  /* signIn(email,password){
    //Logeado =true
    this.loggedIn.next(true);
      return this.fAuth.signInWithEmailAndPassword(email, password);
    } */

  login(email: string, password: string) {

      this.fAuth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.firestore.collection('Usuarios').ref.where('email', '==', response.user.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            console.log('ROLE CURRENT', this.currentUser.rol);
            this.loggedIn.next(true);
            if (this.currentUser.rol === 'estudiante') {
              this.router.navigate(['/menu/home']);
            }
            else if (this.currentUser.rol === 'administrador' || this.currentUser.rol === 'Administrador') {
              this.presentAlert();
              this.router.navigate(['/register']);
            }
          });
        });
      }
      ).catch(fail=>this.failToast(fail.message));
     }



  //REGISTRAR USUARIO
  registrar(usuario: UserInterface) {
    this.fAuth.createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then((userResponse) => {
        //Actualizar perfil
        if (userResponse) {
          userResponse.user.updateProfile({
            displayName: usuario.nombre+'-'+usuario.apellido,
            photoURL: usuario.foto
          });
        }
        // add the user to the "users" database
        usuario.id = userResponse.user.uid;
        //id del documento
        this.idDoc = userResponse.user.uid;
        //add the user to the database
        this.firestore.collection('Usuarios').doc(this.idDoc).set(usuario).then(ref => {
          this.presentToast('Usuario registrado!');
          this.router.navigate(['/login']);
        });
      })
      .catch((err) => {
        console.log('error de registro: ', err);
        this.failToast(err.message);
      });

  }

  //TRAER USUARIO ACTUAL

  getCurrentUser() {

    return this.fAuth.authState.pipe(first()).toPromise();

  }

  //RETORNA UID DE USUARIO
  stateAuth() {
    
    return this.fAuth.authState;
  }



  //RECUPERAR CONTRASEñA
  async resetPassword(email: string): Promise<void> {
    try {
      return this.fAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  //METODO CERRAR SESION
  async logout() {

    try {
      await this.fAuth.signOut();
      this.loggedIn.next(false);
      console.log('no logueado');

    } catch (error) {
      console.log(error);

    }

  }

  //PRESENTAR ALERTA
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Usuario restringido',
      message: 'No es un usuario estudiante',
      mode:"ios",
      buttons: ['OK']
    });

    await alert.present();
  }
  //PRESENTAR ALERTA REGISTRO existoso
  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
  //PRESENTAR ALERTA REGISTRO fallido
  async failToast(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 3000,
      color: 'danger'
    });
    toast.present();
  }
//LEER UN USER
  getDoc<tipo>(path: string, id: string) { 
    const collection = this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

}
