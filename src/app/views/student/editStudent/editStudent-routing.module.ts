import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditStudentComponent } from './editStudent.component';

const routes: Routes = [{ path: '', component: EditStudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditStudentRoutingModule { }