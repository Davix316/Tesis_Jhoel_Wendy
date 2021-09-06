import { SistemasComponent } from './sistemas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SistemasComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [SistemasComponent]
})
export class SistemasModule { }