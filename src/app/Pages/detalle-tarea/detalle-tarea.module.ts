import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleTareaPageRoutingModule } from './detalle-tarea-routing.module';

import { DetalleTareaPage } from './detalle-tarea.page';
import { ComentariosComponent } from '../comentarios/comentarios.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetalleTareaPageRoutingModule
  ],
  declarations: [DetalleTareaPage,ComentariosComponent],

})
export class DetalleTareaPageModule {}
