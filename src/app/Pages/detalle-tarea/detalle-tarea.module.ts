import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleTareaPageRoutingModule } from './detalle-tarea-routing.module';

import { DetalleTareaPage } from './detalle-tarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleTareaPageRoutingModule
  ],
  declarations: [DetalleTareaPage]
})
export class DetalleTareaPageModule {}
