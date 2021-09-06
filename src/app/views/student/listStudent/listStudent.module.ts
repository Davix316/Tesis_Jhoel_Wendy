// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Theme Routing
import { ListStudentRoutingModule } from './listStudent-routing.module';
import { ListStudentComponent } from './listStudent.component';


@NgModule({
  imports: [
    CommonModule,
    ListStudentRoutingModule
  ],
  declarations: [
    ListStudentComponent
  ]
})
export class ListStudenttModule { }
