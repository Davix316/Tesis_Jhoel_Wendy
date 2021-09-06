import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BlockStudentRoutingModule } from './blockStudent-routing.module';
import { BlockStudentComponent } from './blockStudent.component';

@NgModule({
  declarations: [BlockStudentComponent],
  imports: [
    CommonModule,
    BlockStudentRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BlockStudentModule { }