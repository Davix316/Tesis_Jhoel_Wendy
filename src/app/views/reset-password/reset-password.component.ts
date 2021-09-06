import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseauthService } from '../services/firebaseauth.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})

export class ResetPasswordComponent{
  userEmail = new FormControl('');
  constructor(private authSvc: FirebaseauthService, private router: Router) {}

  async onReset() {
    try {
      const email = this.userEmail.value;
      await this.authSvc.resetPassword(email);
      console.log(email);
      window.alert('Correo enviado');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }


  async login() {
    this.router.navigate(['/login'])
  }

}

