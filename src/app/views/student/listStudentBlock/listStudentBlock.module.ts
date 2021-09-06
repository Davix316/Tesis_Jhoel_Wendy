// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Theme Routing
import { ListStudentBlockRoutingModule } from './listStudentBlock-routing.module';
import { ListStudentBlockComponent } from './listStudentBlock.component';


@NgModule({
  imports: [
    CommonModule,
    ListStudentBlockRoutingModule
  ],
  declarations: [
    ListStudentBlockComponent
  ]
})
export class ListStudentBlockModule { }
