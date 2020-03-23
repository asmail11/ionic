import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDasgboardPageRoutingModule } from './admin-dashboard-routing.module';

import { AdminDasgboardPage } from './admin-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDasgboardPageRoutingModule
  ],
  declarations: [AdminDasgboardPage]
})
export class AdminDasgboardPageModule {}
