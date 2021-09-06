import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlockStudentComponent } from './blockStudent.component';

const routes: Routes = [{ path: '', component: BlockStudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockStudentRoutingModule { }