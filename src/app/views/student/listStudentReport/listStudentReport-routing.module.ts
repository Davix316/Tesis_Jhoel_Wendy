import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ListStudentReportComponent} from "./listStudentReport.component"

const routes: Routes = [
  {
    path: '',
    component: ListStudentReportComponent,
    data: {
      title: 'Publicaciones Reportadas',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListStudentReportRoutingModule {}
