
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ResetPasswordRoutingModule } from './reset-password-routing.module';

import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ResetPasswordRoutingModule
  ],
  declarations: [ResetPasswordComponent]
})

export class ResetPasswordModule {}