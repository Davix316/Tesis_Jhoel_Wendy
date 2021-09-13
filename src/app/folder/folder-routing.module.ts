import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComentariosComponent } from '../Pages/comentarios/comentarios.component';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'materias',
    loadChildren: () => import('./materias/materias.module').then(m => m.MateriasPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then(m => m.FavoritosPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('../Pages/auth/perfil/perfil.module').then(m => m.PerfilPageModule)
  },


  {
    path: 'conversacion',
    loadChildren: () => import('../Pages/conversacion/conversacion.module').then(m => m.ConversacionPageModule)
  },
  {
    path: 'detalle-materia',
    loadChildren: () => import('../Pages/detalle-materia/detalle-materia.module').then(m => m.DetalleMateriaPageModule)
  },
  {
    path: 'detalle-tarea',
    loadChildren: () => import('../Pages/detalle-tarea/detalle-tarea.module').then(m => m.DetalleTareaPageModule)
  },

  {
    path: 'puntuacion',
    loadChildren: () => import('../Pages/puntuacion/puntuacion.module').then(m => m.PuntuacionPageModule)
  },
  {
    path: 'mis-archivos',
    loadChildren: () => import('../Pages/mis-archivos/mis-archivos.module').then(m => m.MisArchivosPageModule)
  },
  {
    path: 'new-publicacion',
    loadChildren: () => import('../Pages/new-publicacion/new-publicacion.module').then(m => m.NewPublicacionPageModule)
  },
  {
    path: 'edit-publicacion',
    loadChildren: () => import('../Pages/edit-publicacion/edit-publicacion.module').then(m => m.EditPublicacionPageModule)
  },
  {
    path: 'comentarios', component: ComentariosComponent,
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('../Pages/auth/edit-perfil/edit-perfil.module').then(m => m.EditPerfilPageModule)
  },
  {
    path: 'reportar',
    loadChildren: () => import('../Pages/reportar/reportar.module').then( m => m.ReportarPageModule)
  },
  {
    path: 'report-publish',
    loadChildren: () => import('../Pages/report-publish/report-publish.module').then( m => m.ReportPublishPageModule)
  },
  {
    path: 'detalle-chat',
    loadChildren: () => import('../Pages/detalle-chat/detalle-chat.module').then( m => m.DetalleChatPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule { }
