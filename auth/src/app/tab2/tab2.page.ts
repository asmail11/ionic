import { Tab3Page } from './../tab3/tab3.page';
import { Component, OnInit } from '@angular/core';
import { AuthLoginInfo } from '../auth/AuthLoginInfo';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  loginInfo: AuthLoginInfo;
  showSpinner = false;
  isLoginError = false;

  constructor(private authService: AuthService, private tokenService: TokenStorageService, private router: Router,
              private tokenStorageService: TokenStorageService, private modalController: ModalController) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getAuthorities();
    }
    this.tokenService.signOut();
  }

  onSubmit() {
    this.showSpinner = true;
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(async data => {
      this.tokenStorageService.saveToken(data.accessToken);
      this.tokenStorageService.saveUsername(data.username);
      this.tokenStorageService.saveAuthorities(data.authorities);
      this.isLoggedIn = true;
      this.isLoginFailed = false;
      this.roles = this.tokenStorageService.getAuthorities();
      this.router.navigate(['/tabs/tab3/', data.username]);
      this.modalController.dismiss().then().catch();
      this.showSpinner = false;
    }, error => {
      this.isLoginFailed = true;
    });
  }

  async logout() {
    this.tokenService.signOut();
    this.showSpinner = false;
    this.modalController.dismiss().then().catch();
  }

}
