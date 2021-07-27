import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockStudentRoutingModule } from './blockStudent-routing.module';
import { BlockStudentComponent } from './blockStudent.component';

@NgModule({
  declarations: [BlockStudentComponent],
  imports: [
    CommonModule,
    BlockStudentRoutingModule,
  ]
})
export class BlockStudentModule { }