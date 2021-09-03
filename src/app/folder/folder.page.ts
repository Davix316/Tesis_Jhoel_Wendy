import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { FireauthService } from '../services/fireauth.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
 //public folder: string;
 active = '';


 option = [
   {
     name: 'Publicaciones',
     link: '/home',
     icon: 'newspaper',
   },
   {
     name: 'Materias',
     link: '/materias',
     icon: 'book'
   },
   {
     name: 'Favoritos',
     link: '/favoritos',
     icon: 'heart'
   },
   {
     name: 'Chat',
     link: '/chat',
     icon: 'chatbubble'
   },
   {
     name: 'Perfil',
     link: '/perfil',
     icon: 'person'
   },

 ];
 constructor( private router: Router,private serviceauth: FireauthService,) {
   this.router.events.subscribe((event: RouterEvent) => {
     this.active = event.url;
   });
 }


  ngOnInit() {
  }

 //CERRAR SESION
 onlogout(){
  this.serviceauth.logout();
  this.router.navigate(['/login']);
}

}
