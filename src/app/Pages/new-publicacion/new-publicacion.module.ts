import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPublicacionPageRoutingModule } from './new-publicacion-routing.module';

import { NewPublicacionPage } from './new-publicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPublicacionPageRoutingModule
  ],
  declarations: [NewPublicacionPage]
})
export class NewPublicacionPageModule {}
