import { Component, OnInit } from '@angular/core';
import { SignUpInfo } from '../auth/SignUpInfo';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  form: any = {};
  isSignedUp = false;
  signUpInfo: SignUpInfo;
  showSpinner = false;
  isSignUpFailed = false;
  errorMessage = false;
  rolesLength: number;

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.authService.findAllUsers().subscribe(roles => {
      this.rolesLength = roles.length;
    });
  }
  onSubmit() {
    this.showSpinner = true;
    this.signUpInfo = new SignUpInfo(
        this.form.name,
        this.form.username,
        this.form.email,
        this.form.password
    );
    if (this.rolesLength >= 1) {
      this.signUpInfo.role = ['user'];
    }

    this.authService.signUp(this.signUpInfo).subscribe(data => {
      console.log('Register Successfully');
      this.showSpinner = false;
      this.isSignedUp = true;
      this.isSignUpFailed = false;
      this.tokenStorageService.saveToken(this.signUpInfo.username);
    }, error => {
      this.errorMessage = error.error.message;
      this.isSignUpFailed = true;
    });

}
}
