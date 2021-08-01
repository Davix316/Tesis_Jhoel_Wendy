import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleMateriaPageRoutingModule } from './detalle-materia-routing.module';

import { DetalleMateriaPage } from './detalle-materia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleMateriaPageRoutingModule
  ],
  declarations: [DetalleMateriaPage]
})
export class DetalleMateriaPageModule {}
