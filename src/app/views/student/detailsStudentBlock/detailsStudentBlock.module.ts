import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsStudentBlockRoutingModule } from './detailsStudentBlock-routing.module';
import { DetailsStudentBlockComponent } from './detailsStudentBlock.component';


@NgModule({
  declarations: [DetailsStudentBlockComponent],
  imports: [
    CommonModule,
    DetailsStudentBlockRoutingModule
  ]
})
export class DetailsStudentBlockModule { }