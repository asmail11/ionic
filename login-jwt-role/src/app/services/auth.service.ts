import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AlertController} from '@ionic/angular';

const TOKEN_KEY = 'user-access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   user: Observable<any>;
  private authState = new BehaviorSubject(null);

  constructor(private storage: Storage, private router: Router, private alertCtrl: AlertController) {
    this.loadUser();
    this.user = this.authState.asObservable().pipe(
        filter(response => response)
    );
  }

  loadUser() {
    this.storage.get(TOKEN_KEY).then(data => {
      if (data && data.email && data.role) {
        this.authState.next(data);
      } else {
        this.authState.next({email: null, role: null});
      }
    });
  }
  async signIn(credentials): Promise<Observable<any>> {
    const email = credentials.email;
    const pw = credentials.pw;
    let user = null;

    if (email === 'admin' && pw === 'admin') {
      user = {email, role: 'ADMIN'};
    } else if (email === 'user' && pw === 'user') {
      user = {email, role: 'USER'};
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error auth',
        message: 'Email or Password incorrect',
        buttons: ['ok']
      });
      alert.present();
    }
    this.authState.next(user);
    this.storage.set(TOKEN_KEY, user);
    return of(user);
  }

  async signOut() {
     await this.storage.set(TOKEN_KEY, null);
     this.authState.next(null);
     this.router.navigateByUrl('/login');
  }
}
