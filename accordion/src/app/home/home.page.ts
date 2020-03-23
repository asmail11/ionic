import { Component, Input } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  applications: any[];
  automaticClose = false;
  applicationComponents: any[];
  // tslint:disable-next-line: no-input-rename
  @Input('product') product: any;

  constructor(private appService: AppService) {
    this.appService.findAllApplications().subscribe(apps => {
      this.applications = apps;
      this.applications[0].open = true;
      console.log(this.applications);
    });
  }

  toggleSection(index: any) {
    this.applications[index].open = !this.applications[index].open;
    if (this.automaticClose && this.applications[index].open) {
           this.applications
           .filter((itemIndex) => itemIndex !== index)
           .map(item => item.open = false);
    }
    console.log('test');
  }
  toggleItem(index: any, childIndex: any) {
    this.applications[index].applicationComponents[childIndex].open =  !this.applications[index].applicationComponents[childIndex].open;
  }

}
