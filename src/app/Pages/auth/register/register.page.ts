import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import { User } from 'src/app/shared/userinterface';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {
  emailPattern: any = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  public myFormUser=new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    apellido: new FormControl('',[Validators.required]),
    numUnico: new FormControl('',[Validators.required]),
    carrera: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    rol: new FormControl('',[Validators.required]),

  });


  constructor(public authService: FireauthService, public router: Router ) { }

  ngOnInit() {
  }

    register(user: User){
      try{
       //if(this.myFormUser.valid){
        this.authService.registrar(user);
        this.myFormUser.reset();
        console.log(user.email);
        console.log();

      //}
     // else{
      //  console.log('error');
     // }
      }catch(error){
        console.error(error);
      }
  }

}

