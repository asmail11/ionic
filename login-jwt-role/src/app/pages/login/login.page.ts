import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    pw: ''
  };

  constructor(private auth: AuthService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

    signIn() {
      this.auth.signIn(this.user).subscribe(user => {
       const role = user.role;
       if (role === 'ADMIN') {
         this.router.navigateByUrl('/admin-dashboard');
       } else if (role === 'USER') {
         this.router.navigateByUrl('/user-dashboard');
       }
      });
    }
}
