import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('slideinleft', [
      transition('void => *', [
        style({opacity: 0, transform: 'translateX(-150%)'}),
        animate('750ms ease-in', style({transform: 'translateX(0%)', opacity: 1}))
      ])
    ]),
    trigger('slideinright', [
      transition('void => *', [
        style({opacity: 0, transform: 'translateX(-150%)'}),
        animate('900ms 400ms ease-in', style({transform: 'translateX(0%)', opacity: 1}))
      ])
    ]),
    trigger('fadein', [
      transition('void => *', [
        style({opacity: 0}),
        animate('900ms 300ms ease-in', style({opacity: 1}))
      ])
    ]),
    trigger('slideup', [
      transition('void => *', [
        style({opacity: 0, transform: 'translateY(150%)'}),
        animate('900ms 600ms ease-in', style({transform: 'translateY(0%)', opacity: 1}))
      ])
    ]),
  ]
})
export class HomePage {

  constructor() {}

}
