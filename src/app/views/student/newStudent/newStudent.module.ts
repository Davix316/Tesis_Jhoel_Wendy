import { StudentFormModule } from '../../../shared/components/student-form/student-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewStudentRoutingModule } from './newStudent-routing.module';
import { NewStudentComponent } from './newStudent.component';


@NgModule({
  declarations: [NewStudentComponent],
  imports: [
    CommonModule,
    NewStudentRoutingModule,
    StudentFormModule
  ]
})
export class NewStudentModule { }