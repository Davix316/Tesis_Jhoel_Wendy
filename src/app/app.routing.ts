import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ResetPasswordComponent } from './views/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Inicio'
    },
    children: [
      {
        path: 'perfil',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/notifications.module').then(m => m.NotificationsModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./views/admin/list/list.module').then(m => m.ListModule)
      },{
        path: 'newAdmin', loadChildren: () => import('./views/admin/newAdmin/newAdmin.module').then(m => m.NewAdminModule),
        data: {
          title: 'Nuevo Administrador'
        }},
      { path: 'edit', loadChildren: () => import('./views/admin/edit/edit.module').then(m => m.EditModule),
      data: {
        title: 'Editar Administrador'
      } },
      { path: 'details', loadChildren: () => import('./views/admin/details/details.module').then(m => m.DetailsModule),
      data: {
        title: 'Detalle de Administrador'
      } }
      ,
      {
        path: 'listStudent',
        loadChildren: () => import('./views/student/listStudent/listStudent.module').then(m => m.ListStudenttModule)
      },{
        path: 'newStudent', loadChildren: () => import('./views/student/newStudent/newStudent.module').then(m => m.NewStudentModule),
        data: {
          title: 'Nuevo Estudiante'
        }},
      { path: 'editStudent', loadChildren: () => import('./views/student/editStudent/editStudent.module').then(m => m.EditStudentModule),
      data: {
        title: 'Editar Estudiante'
      } },
      { path: 'detailsStudent', loadChildren: () => import('./views/student/detailsStudent/detailsStudent.module').then(m => m.DetailsStudentModule),
      data: {
        title: 'Detalle de Estudiante'
      } }
      ,{ path: 'blockStudent', loadChildren: () => import('./views/student/block/blockStudent.module').then(m => m.BlockStudentModule),
      data: {
        title: 'Bloqueo de Estudiante'
      } }
      ,
      {
        path: 'carreras',
        loadChildren: () => import('./views/carreras/carreras.module').then(m => m.CarrerasModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
