import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {map, take} from 'rxjs/operators';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) {}



  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRole = route.data.role;
    return this.auth.user.pipe(
        take(1),
        map(user => {
          console.log('Log: ', user);
          if (user) {
            const role = user.role;
            if (expectedRole === role) {
              return true;
            } else {
              this.showAlert();
              this.router.navigateByUrl('/login');
            }
            return true;
          } else {
            this.showAlert();
            this.router.navigateByUrl('/login');
          }
        })
    );
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Unauthorized',
      message: 'You are authorized to vist that page !',
      buttons: ['ok']
    });
    alert.present();
  }
}
