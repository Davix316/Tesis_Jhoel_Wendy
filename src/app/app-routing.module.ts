import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'login',
    loadChildren:()=>import('./Pages/auth/login/login.module').then(m=>m.LoginPageModule)
  },
  {
    path: 'register', loadChildren:()=>import('./Pages/auth/register/register.module').then(m=>m.RegisterPageModule)
  },
  {path:'', redirectTo:'login', pathMatch:'full'},
  {
    path: 'menu',
    redirectTo: 'folder/Inbox'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Pages/auth/register/register.module').then( m => m.RegisterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
