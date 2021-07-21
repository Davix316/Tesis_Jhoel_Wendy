import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ButtonsComponent } from './buttons.component';
import { DropdownsComponent } from './dropdowns.component';
import { BrandButtonsComponent } from './brand-buttons.component';
import { BloqueoEstComponent } from './bloqueo-est.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Estudiantes'
    },
    children: [
      {
        path: '',
        redirectTo: 'buttons'
      },
      {
        path: 'buttons',
        component: ButtonsComponent,
        data: {
          title: ''
        }
      },
      {
        path: 'dropdowns',
        component: DropdownsComponent,
        data: {
          title: 'Editar estudiante'
        }
      },
      {
        path: 'brand-buttons',
        component: BrandButtonsComponent,
        data: {
          title: 'Nuevo estudiante'
        }
      },
        {
          path: 'bloqueo-est',
          component: BloqueoEstComponent,
          data: {
            title: 'Bloquear estudiante'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ButtonsRoutingModule {}
