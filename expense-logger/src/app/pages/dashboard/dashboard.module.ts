import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../../shared/shared/shared.module';
import {CatagoryPipe} from '../../pipes/catagory.pipe';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [DashboardComponent, CatagoryPipe],
    imports: [
        CommonModule,
        RouterModule.forChild([{path: '', component: DashboardComponent}]),
        IonicModule,
        SharedModule,
        FormsModule
    ]
})
export class DashboardModule { }
