import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FireauthService } from 'src/app/services/fireauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
formLogin=new FormGroup({});
  constructor( public authService: FireauthService,public router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }
  logIn(email, password) {
    this.authService.signIn(email.value, password.value)
      .then((res) => {
        if(res) {
          this.router.navigate(['menu']);
        } else {
          window.alert('Email is not verified');
          return false;
        }
      }).catch((error) => {
        this.presentAlert();
        //window.alert(error.message);
      });
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
