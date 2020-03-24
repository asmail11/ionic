import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private themeService: ThemeService) {}

  toggleDakMode() {
    this.themeService.toggleAppTheme();
  }

}
