import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email=new FormControl('',[Validators.required]);

  constructor(private authSvc: FirebaseauthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onReset(){
    console.log(this.email.value);


     try{
      const emailU=this.email.value;
      await this.authSvc.resetPassword(emailU);
      window.alert("Email enviado, revise su correo")
      this.router.navigate(['/login'])

    }catch(error){
      console.log("error", error)
    }


  }

}
