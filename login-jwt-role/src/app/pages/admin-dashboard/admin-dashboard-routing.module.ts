import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDasgboardPage } from './admin-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDasgboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDasgboardPageRoutingModule {}
