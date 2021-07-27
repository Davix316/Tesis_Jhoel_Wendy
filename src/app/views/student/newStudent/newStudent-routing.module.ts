import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewStudentComponent } from './newStudent.component';

const routes: Routes = [{ path: '', component:  NewStudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewStudentRoutingModule { }