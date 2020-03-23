import { Tab1Page } from './../tab1/tab1.page';
import { Component, OnInit } from '@angular/core';
import { JwtResponse } from '../auth/JwtResponse';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  info: any;
  showSpinner = false;
  jwtResponse: JwtResponse = new JwtResponse();

  constructor(private authService: AuthService, private tokenService: TokenStorageService,
              private router: Router, private route: ActivatedRoute, private alertController: AlertController) {
               this.route.params.subscribe(
                 params => {
                  this.name = this.route.snapshot.params.name;
                  this.userInfo();
                 }
               );

               }
  ngOnInit(): void {

  }


  private userInfo() {
    this.authService.getUSerByUsername(this.name).subscribe(data => {
      this.jwtResponse = data;
      this.id = this.jwtResponse.id;
    });
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      authorities: this.tokenService.getAuthorities(),
      name: this.tokenService.getName()
    };
  }

 logout() {
    this.showSpinner = true;
    this.tokenService.signOut();
    this.showSpinner = false;
    this.router.navigate(['/tabs/tab1']);
  }
  deleteUser() {
    this.authService.deleteUser(this.id).subscribe(() => {
      this.logout();
    });
  }
  editUser() {
    this.router.navigate(['/tab4/', this.id]);
  }
  async presentAlertConfirm() {
    console.log(this.id + 'Id');
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete ?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
           this.deleteUser();
          }
        }
      ]
    });

    await alert.present();
  }
}
