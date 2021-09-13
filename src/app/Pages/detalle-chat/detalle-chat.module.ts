import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleChatPageRoutingModule } from './detalle-chat-routing.module';

import { DetalleChatPage } from './detalle-chat.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleChatPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetalleChatPage]
})
export class DetalleChatPageModule {}
