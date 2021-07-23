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
      name: 'Noticias',
      link: '/menu/news',
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
  constructor(/* private activatedRoute: ActivatedRoute, */ private router: Router, private serviceauth: FireauthService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.active = event.url;
    });
  }

  ngOnInit() {
   // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

 //CERRAR SESION
 onlogout(){
  this.serviceauth.logout();
  this.router.navigate(['/login']);
}

}
