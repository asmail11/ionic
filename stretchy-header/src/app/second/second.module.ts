import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {HidenavModule} from 'ionic4-hidenav';

import { SecondPageRoutingModule } from './second-routing.module';

import { SecondPage } from './second.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecondPageRoutingModule,
    HidenavModule
  ],
  declarations: [SecondPage]
})
export class SecondPageModule {}
