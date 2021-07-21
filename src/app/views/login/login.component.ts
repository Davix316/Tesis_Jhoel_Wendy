import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  myFormUser: FormGroup;
  validations_form: FormGroup;
  errorMessage: string = '';
  private isEmail = /\S+@\S+\.\S+/;

  constructor(private serviceAuth : FirebaseauthService, private fb:FormBuilder,
    private router:Router) {
      this.initForm();
     }

  ngOnInit(): void {
    this.initForm();
  }

  isValidField(field: string): string {
    const validatedField = this.myFormUser.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  private initForm():void{
    this.myFormUser = this.fb.group({
      usuarioF: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      passwordF: ['', [Validators.required]],
    });
  }

  async loginUser(){
    let {usuarioF,passwordF} = this.myFormUser.value;
    const user = await this.serviceAuth.login(usuarioF,passwordF)
    if(user){
      console.log("User: " , this.myFormUser.value)
      this.router.navigate(['/dashboard'])
    } else{
      this.errorMessage;
      console.log("Inicio de Sesión fallido")
    }    
  }
}