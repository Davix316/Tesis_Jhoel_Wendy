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
    ]
  },
  {
    path: 'conversacion',
    loadChildren: () => import('../Pages/conversacion/conversacion.module').then( m => m.ConversacionPageModule)
  },
  {
    path: 'detalle-materia',
    loadChildren: () => import('../Pages/detalle-materia/detalle-materia.module').then( m => m.DetalleMateriaPageModule)
  },
  {
    path: 'detalle-tarea',
    loadChildren: () => import('../Pages/detalle-tarea/detalle-tarea.module').then( m => m.DetalleTareaPageModule)
  },
  {
    path: 'comentarios',
    loadChildren: () => import('../Pages/comentarios/comentarios.module').then( m => m.ComentariosPageModule)
  },
  {
    path: 'puntuacion',
    loadChildren: () => import('../Pages/puntuacion/puntuacion.module').then( m => m.PuntuacionPageModule)
  },
  {
    path: 'mis-archivos',
    loadChildren: () => import('../Pages/mis-archivos/mis-archivos.module').then( m => m.MisArchivosPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
