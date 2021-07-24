import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CheckloginGuard } from './shared/guards/checklogin.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren:()=>import('./Pages/auth/login/login.module').then(m=>m.LoginPageModule)
  },
  {
    path: 'register', loadChildren:()=>import('./Pages/auth/register/register.module').then(m=>m.RegisterPageModule)
  },
  {path:'', redirectTo:'login', pathMatch:'full'},
  /* {
    path: 'menu',
    redirectTo: 'news'
  }, */
  {
    path: '',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule),  canActivate: [CheckloginGuard]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./Pages/auth/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'conversacion',
    loadChildren: () => import('./Pages/conversacion/conversacion.module').then( m => m.ConversacionPageModule)
  },

    /*{
   path: 'news',
    loadChildren: () => import('./folder/news/news.module').then(m=>m.NewsPageModule)
  },
  {
    path: 'materias',
    loadChildren: () => import('./folder/materias/materias.module').then(m=>m.MateriasPageModule)
  },
  {
    path: 'mensajes',
    loadChildren: () => import('./folder/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./folder/favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  }, */

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
