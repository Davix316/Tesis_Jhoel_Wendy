// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Theme Routing
import { ListStudentReportRoutingModule } from './listStudentReport-routing.module';
import { ListStudentReportComponent } from './listStudentReport.component';

@NgModule({
  imports: [
    CommonModule,
    ListStudentReportRoutingModule
  ],
  declarations: [
    ListStudentReportComponent
  ]
})

export class ListStudentReportModule {}
