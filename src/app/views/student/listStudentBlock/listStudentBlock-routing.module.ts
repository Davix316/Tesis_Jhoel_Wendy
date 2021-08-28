import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ListStudentBlockComponent} from "./listStudentBlock.component"

const routes: Routes = [
  {
    path: '',
    component: ListStudentBlockComponent,
    data: {
      title: 'Lista de Estudiantes Bloqueos',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListStudentBlockRoutingModule {}
