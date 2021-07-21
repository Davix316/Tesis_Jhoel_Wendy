import { AdminFormModule } from '../../../shared/components/admin-form/admin-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewAdminRoutingModule } from './newAdmin-routing.module';
import { NewAdminComponent } from './newAdmin.component';


@NgModule({
  declarations: [NewAdminComponent],
  imports: [
    CommonModule,
    NewAdminRoutingModule,
    AdminFormModule
  ]
})
export class NewAdminModule { }