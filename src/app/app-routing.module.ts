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
  {path:'', redirectTo:'menu/home', pathMatch:'full'},
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

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
