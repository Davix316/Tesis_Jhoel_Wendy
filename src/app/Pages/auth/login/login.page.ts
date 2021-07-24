import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FireauthService } from 'src/app/services/fireauth.service';

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
  constructor( public authService: FireauthService,public router: Router, private alertController: AlertController) { }

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


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Llene los campos!',
      buttons: ['OK']
    });

    await alert.present();
  }


}
