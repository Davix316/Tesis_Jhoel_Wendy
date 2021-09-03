import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireauthService } from './services/fireauth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  active = '';
  option = [
    {
      name: 'Publicaciones',
      link: '/menu/home',
      icon: 'newspaper',
    },
    {
      name: 'Materias',
      link: '/menu/materias',
      icon: 'book'
    },
    {
      name: 'Favoritos',
      link: '/menu/favoritos',
      icon: 'heart'
    },
    {
      name: 'Chat',
      link: '/menu/chat',
      icon: 'chatbubble'
    },
    {
      name: 'Perfil',
      link: '/menu/perfil',
      icon: 'person'
    },
    
 
  ];
  constructor(private serviceauth: FireauthService, public router: Router) {}

  //CERRAR SESION
 onlogout(){
  this.serviceauth.logout();
  this.router.navigate(['/login']);

}

}
