import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email=new FormControl('',[Validators.required]);
  private formSubmitAttempt: boolean;

  constructor(
    private fAuth: FireauthService, 
    private route: Router, 
    public alertController: AlertController,
    private toastController: ToastController
    ) { }

  ngOnInit() {
  }

  async onReset(){
    try{
      if(this.email.valid){
        const email=this.email.value;
        await this.fAuth.resetPassword(email);
        console.log('reset', email);
        this.presentAlert();
        this.route.navigate(['/login']);

      }
      else{
        this.presentToast('Formato de email no válido','danger');
      }   

    }catch(error){
      console.log('error', error);
    }

}

async presentAlert() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Mensaje enviado',
    message: 'Revisa la bandeja de entrada de tu correo electronico y cambia tu contraseña.',
    buttons: ['OK']
  });

  await alert.present();

}

//PRESENTAR ALERTA 
async presentToast(text, color:string) {
  const toast = await this.toastController.create({
    message: text,
    duration: 2000,
    color: color
  });
  toast.present();
}


}
