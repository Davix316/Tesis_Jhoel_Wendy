import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsStudentRoutingModule } from './detailsStudent-routing.module';
import { DetailsStudentComponent } from './detailsStudent.component';


@NgModule({
  declarations: [DetailsStudentComponent],
  imports: [
    CommonModule,
    DetailsStudentRoutingModule
  ]
})
export class DetailsStudentModule { }