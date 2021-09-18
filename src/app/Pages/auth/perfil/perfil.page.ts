/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, Input, Output, ViewChild,ElementRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FireauthService } from 'src/app/services/fireauth.service';
import { UserInterface} from 'src/app/shared/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage implements OnInit {



  usuario: string;
  id: string;
  userLogIn: any;
  user: UserInterface={
    id: '',
  nombre: '',
  apellido: '',
  telefono: 0,
  numUnico: 0,
  carreraNombre: '',
  carreraId:'',
  email: '',
  password: '',
  semestreRef: 0,
  foto: '',
  rol: '',
  };

  // VIEW PASSWORD

  show: boolean;

  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  
  constructor(private serviceauth: FireauthService, private router: Router) {
    this.show = false;
  }

  ngOnInit() {
    console.log('hola de regreso');
    
  
    //ROL DE USUARIO AUTENTICADO
try{
  this.serviceauth.getCurrentUser().then(r=>{
    this.usuario=r.email;

   console.log(r.uid);
   this.id=r.uid;
   //Llamado a la funcion de obtener usuario
   this.getuser(this.id);

  });
}catch(error){
  console.log(error);
}

}

getuser(idUser: string){
 
  this.serviceauth.getDoc<UserInterface>('Usuarios', idUser).subscribe(res => {
    this.user=res;    
   });

}
//VISUALIZAR CONTRASEñA
mostrarContrasena(input: any){
  if(input.type == 'password'){
    input.type = 'text';
    this.show=true;
    console.log(this.show);

  }else{
    input.type = 'password';
    this.show=false;
    console.log(this.show);

  }
}


//NAVIGATION EXTRAS
puntuacionUser(item: any): void{
  this.navigationExtras.state.value=item; 
    this.router.navigate(['/menu/puntuacion'],this.navigationExtras);
}

//NAVIGATION EXTRAS edit perfil
EditUser(item: any): void{
  this.navigationExtras.state.value=item; 
    this.router.navigate(['/menu/editar-perfil'],this.navigationExtras);
}


}
