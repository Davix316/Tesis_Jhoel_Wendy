import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsStudentComponent } from './detailsStudent.component';

const routes: Routes = [{ path: '', component: DetailsStudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsStudentRoutingModule { }