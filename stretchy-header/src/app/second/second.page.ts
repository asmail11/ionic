import { Component, OnInit, ViewChild} from '@angular/core';
import { HidenavStretchheaderComponent } from 'ionic4-hidenav';

@Component({
  selector: 'app-second',
  templateUrl: './second.page.html',
  styleUrls: ['./second.page.scss'],
})
export class SecondPage implements OnInit {
  @ViewChild(HidenavStretchheaderComponent, {static: false}) hidenav: HidenavStretchheaderComponent;

  constructor() { }

  ngOnInit() {
  }
  expand() {
   this.hidenav.toggle();
  }
}
