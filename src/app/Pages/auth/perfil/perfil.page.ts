import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: string;
  constructor(private serviceauth: FireauthService,private router: Router) { }

  ngOnInit() {
    try{
      this.serviceauth.getCurrentUser().then(r=>{
        this.usuario=r?.email;

       console.log(r?.email);

     });
    }catch(error){
      console.log(error);
    }
  }

}
