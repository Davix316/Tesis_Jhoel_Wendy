import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ListComponent} from "./list.component"

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'Lista de Administradores',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule {}
