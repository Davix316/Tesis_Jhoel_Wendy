import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleChatPage } from './detalle-chat.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleChatPageRoutingModule {}
