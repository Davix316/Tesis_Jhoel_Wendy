import { AdminFormModule } from '../../../shared/components/admin-form/admin-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    EditRoutingModule,
    ReactiveFormsModule,
    AdminFormModule
  ]
})
export class EditModule { }