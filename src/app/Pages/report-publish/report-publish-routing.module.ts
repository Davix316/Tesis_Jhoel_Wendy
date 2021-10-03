import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportPublishPage } from './report-publish.page';

const routes: Routes = [
  {
    path: '',
    component: ReportPublishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportPublishPageRoutingModule {}
