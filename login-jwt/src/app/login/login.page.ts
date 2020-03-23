import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = {
    email: 'drmas@gmail.com',
    pw: '123'
  };

  constructor(private auth: AuthService, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
  }

  register() {

  }

  login() {
   this.auth.login(this.credentials).subscribe(async res => {
     if (res) {
       this.router.navigateByUrl('/members');
     } else {
       const alert = await this.alertCtrl.create({
         header: 'Login Failed',
         message: 'Wrong credentials',
         buttons: ['ok']
       });
       await alert.present();
     }
   });
  }
}
