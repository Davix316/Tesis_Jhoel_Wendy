import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MateriasPageRoutingModule } from './materias-routing.module';

import { MateriasPage } from './materias.page';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MateriasPageRoutingModule,
  ],
  declarations: [MateriasPage,FiltroPipe]
})
export class MateriasPageModule {}
