import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
formLogin=new FormGroup({});
  constructor( public authService: FireauthService,public router: Router) { }

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
        window.alert(error.message);
      });
  }
}
