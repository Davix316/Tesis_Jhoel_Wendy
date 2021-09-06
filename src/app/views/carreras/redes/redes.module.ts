import { RedesComponent } from './redes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RedesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [RedesComponent]
})
export class RedesModule { }