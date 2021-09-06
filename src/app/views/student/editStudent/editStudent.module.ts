import { StudentFormModule } from '../../../shared/components/student-form/student-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditStudentRoutingModule } from './editStudent-routing.module';
import { EditStudentComponent } from './editStudent.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditStudentComponent],
  imports: [
    CommonModule,
    EditStudentRoutingModule,
    ReactiveFormsModule,
    StudentFormModule
  ]
})
export class EditStudentModule { }