import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Platform} from '@ionic/angular';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject, from, Observable, of} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import { Storage } from '@ionic/storage';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  constructor(private storage: Storage, private http: HttpClient, private ptl: Platform, private router: Router) {
    this.loadStoredToken();
  }

  loadStoredToken() {
    const platFormObs = from(this.ptl.ready());
    this.user = platFormObs.pipe(
        switchMap(() => {
           return from(this.storage.get(TOKEN_KEY));
        }),
        map(token => {
          console.log('Token from storage ', token);
          if (token) {
            // @ts-ignore
            const decoded = helper.decodeToken(token);
            console.log('decoded: ', decoded);
            this.userData.next(decoded);
            return true;
          } else {
            return null;
          }
        })
    );
  }

  login(credentials: {email: string, pw: string}) {
    if (credentials.email !== 'drmas@gmail.com' || credentials.pw !== '123') {
      return of(null);
    }
    return this.http.get('https://randomuser.me/api/').pipe(
        take(1),
        map(res => {
          // tslint:disable-next-line:max-line-length
          return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZmlyc3RfbmFtZSI6Imlzc2FtIGRybWFzIiwibGFzdF9uYW1lIjoiZHJtYXMgMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.aT7tiaHMj5xX23Whwtq6N5mBIzMkE8PewfKWneUmNUc`;
        }),
        switchMap(token => {
          const decoded = helper.decodeToken(token);
          console.log('decoded: ', decoded);
          this.userData.next(decoded);

          const  storageObs = from(this.storage.set(TOKEN_KEY, token));
          return storageObs;
        })
    );
  }

  getUser() {
    return this.userData.getValue();
  }
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }
}
