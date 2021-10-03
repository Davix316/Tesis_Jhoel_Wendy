import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportarPageRoutingModule } from './reportar-routing.module';

import { ReportarPage } from './reportar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ReportarPage]
})
export class ReportarPageModule {}
