import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Reciente',url: 'home', icon: 'newspaper'},
    { title: 'Materias', url: '/folder/materias', icon: 'book' },
    { title: 'Favoritos', url: '/folder/favoritos', icon: 'heart' },
    { title: 'Mensajes', url: '/folder/mensajes', icon: 'chatbubble' },
    { title: 'Perfil', url: '/folder/perfil', icon: 'person' },
    { title: 'Salir', url: '/login', icon: 'log-out' },
  ];
  constructor() {}
}
