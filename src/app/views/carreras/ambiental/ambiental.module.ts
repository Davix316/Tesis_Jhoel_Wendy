import { AmbientalComponent } from './ambiental.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AmbientalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [AmbientalComponent]
})
export class AmbientalModule { }