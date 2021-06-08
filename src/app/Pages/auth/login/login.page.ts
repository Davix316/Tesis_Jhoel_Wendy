import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( public authService: FireauthService,public router: Router) { }

  ngOnInit() {
  }
  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
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
