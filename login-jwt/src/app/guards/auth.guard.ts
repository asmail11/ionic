import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {AlertController} from '@ionic/angular';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private alertCtrl: AlertController) {

  }

  canActivate(router: ActivatedRouteSnapshot): Observable<boolean> {
    return this.auth.user.pipe(
        take(1),
        map(user => {
          console.log('in canactivte: ', user);
          if (!user) {
         this.alertCtrl.create({
           header: 'Unathorized',
           message: 'You are not allowed to access that page.',
           buttons: ['ok']
         }).then(alert => alert.present());
         this.router.navigateByUrl('/')
         return false;
          } else {
            return true;
          }
        })
    );
  }

}
