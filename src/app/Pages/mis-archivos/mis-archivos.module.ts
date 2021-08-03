import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisArchivosPageRoutingModule } from './mis-archivos-routing.module';

import { MisArchivosPage } from './mis-archivos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisArchivosPageRoutingModule
  ],
  declarations: [MisArchivosPage]
})
export class MisArchivosPageModule {}
