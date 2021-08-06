import { ElectromecanicaComponent } from './electromecanica.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ElectromecanicaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ElectromecanicaComponent]
})
export class ElectromecanicaModule { }