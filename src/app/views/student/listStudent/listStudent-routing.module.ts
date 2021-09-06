import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ListStudentComponent} from "./listStudent.component"

const routes: Routes = [
  {
    path: '',
    component: ListStudentComponent,
    data: {
      title: 'Lista de Estudiantes',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListStudentRoutingModule {}
