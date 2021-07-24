import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: 'menu',
    component: FolderPage,
    children:[
      {
        path: 'news',
        loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
      },
      {
        path: 'materias',
        loadChildren: () => import('./materias/materias.module').then( m => m.MateriasPageModule)
      },
      {
        path: 'favoritos',
        loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../Pages/auth/perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: '',
        redirectTo: '/menu/news',
        pathMatch: 'full'
      },
      {
        path: 'conversacion',
        loadChildren: () => import('../Pages/conversacion/conversacion.module').then( m => m.ConversacionPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
