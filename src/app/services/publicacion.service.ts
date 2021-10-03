import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PublicacionInterface } from '../shared/publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(private firestore: AngularFirestore, private router: Router, public toastController: ToastController) { }

  newPublicacion(publicacion: PublicacionInterface, idP: string){
    const id=idP ||this.firestore.createId();
publicacion.id=id;
    this.firestore.collection('Publicaciones').doc(id).set(publicacion)
  .then((docRef) => {
      console.log('registro exitoso');
      this.presentToast('Archivo Publicado!');
      this.router.navigate(['/menu/home']);
  })
  .catch((error) => {
      console.error('"Error adding document: "', error);
  });

  }
  getId(){
    return this.firestore.createId();
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


}

