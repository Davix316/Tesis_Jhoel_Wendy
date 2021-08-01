import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleMateriaPage } from './detalle-materia.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleMateriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleMateriaPageRoutingModule {}
