import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportPublishPageRoutingModule } from './report-publish-routing.module';

import { ReportPublishPage } from './report-publish.page';
ReactiveFormsModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportPublishPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ReportPublishPage]
})
export class ReportPublishPageModule {}
