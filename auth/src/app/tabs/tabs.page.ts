import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { JwtResponse } from '../auth/JwtResponse';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  info: any;
  showSpinner = false;
  jwtResponse: JwtResponse = new JwtResponse();

  constructor(private authService: AuthService, private tokenService: TokenStorageService) {
    this.userInfo();
  }
  private userInfo() {
    this.authService.getUSerByUsername(this.tokenService.getUsername()).subscribe(data => {
      this.jwtResponse = data;
    });
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      authorities: this.tokenService.getAuthorities(),
      name: this.tokenService.getName()
    };
  }
}
