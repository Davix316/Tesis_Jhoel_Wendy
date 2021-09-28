import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditComentarioPageRoutingModule } from './edit-comentario-routing.module';

import { EditComentarioPage } from './edit-comentario.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditComentarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditComentarioPage]
})
export class EditComentarioPageModule {}
