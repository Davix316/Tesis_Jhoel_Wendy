import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email=new FormControl('',[Validators.required]);
  private formSubmitAttempt: boolean;

  constructor(private fAuth: FireauthService, private route: Router, public alertController: AlertController) { }

  ngOnInit() {
  }

  async onReset(){
    try{
      const email=this.email.value;
      await this.fAuth.resetPassword(email);
      console.log('reset', email);
      this.presentAlert();
      this.route.navigate(['/login']);

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
  //validacion de campos
  /* isFieldInvalid(field: string) {
    return (
      (!this.resetForm.get(field).valid && this.resetForm.get(field).touched) ||
      (this.resetForm.get(field).untouched && this.formSubmitAttempt)
    );
  } */

}
