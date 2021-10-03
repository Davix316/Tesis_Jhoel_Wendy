/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { FireauthService } from 'src/app/services/fireauth.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin=new FormGroup({
    emailF: new FormControl('',[Validators.required]),
    passwordF: new FormControl('',[Validators.required])
  });

  show: boolean;
  constructor(public authService: FireauthService,
    public router: Router,
    private alertController: AlertController,
    public toastController: ToastController,
    
    ) {
      this.show = false;
     }

     

  ngOnInit() {
  }
   logIn() {
      if(this.formLogin.valid){
        const{emailF, passwordF}=this.formLogin.value;
        this.authService.login(emailF,passwordF);
      }
      else{
        this.presentAlert();
      }



  }
// ALERT campos vacios

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      mode:"ios",
      message: 'Llene los campos!',
      buttons: ['OK']
    });

    await alert.present();
  }
  //Campos invalidos
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos incorrectos',
      duration: 2000
    });
    toast.present();
  }

  //VISUALIZAR CONTRASEñA
mostrarContrasena(input: any){
  if(input.type == 'password'){
    input.type = 'text';
    this.show=true;
    console.log(this.show);

  }else{
    input.type = 'password';
    this.show=false;
    console.log(this.show);

  }
}



}
