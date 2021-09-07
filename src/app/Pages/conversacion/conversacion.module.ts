import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConversacionPageRoutingModule } from './conversacion-routing.module';

import { ConversacionPage } from './conversacion.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConversacionPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ConversacionPage]
})
export class ConversacionPageModule {}
