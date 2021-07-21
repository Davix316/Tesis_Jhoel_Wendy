import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';

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
      icon: 'newspaper'
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
    {
      name: 'Salir',
      link: '/login',
      icon: 'log-out'
    }
  ];
  constructor(/* private activatedRoute: ActivatedRoute, */ private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.active = event.url;
    });
  }

  ngOnInit() {
   // this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  onlogout(){ }

}
