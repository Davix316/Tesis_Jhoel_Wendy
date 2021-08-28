import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsStudentBlockComponent } from './detailsStudentBlock.component';

const routes: Routes = [{ path: '', component: DetailsStudentBlockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsStudentBlockRoutingModule { }