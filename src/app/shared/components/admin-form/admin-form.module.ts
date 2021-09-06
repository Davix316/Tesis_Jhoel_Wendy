import { AdminFormComponent } from './admin-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [AdminFormComponent]
})
export class AdminFormModule { }