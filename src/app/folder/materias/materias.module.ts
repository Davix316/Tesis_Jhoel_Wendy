import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MateriasPageRoutingModule } from './materias-routing.module';

import { MateriasPage } from './materias.page';
import { PerfilPageModule } from 'src/app/Pages/auth/perfil/perfil.module';
import { PerfilPage } from 'src/app/Pages/auth/perfil/perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MateriasPageRoutingModule,
  ],
  declarations: [MateriasPage]
})
export class MateriasPageModule {}