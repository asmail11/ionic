import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtResponse } from '../auth/JwtResponse';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  id: number;
  jwtResponse: JwtResponse = new JwtResponse();
  showSpinner = false;
  isSignedUp = false;
  isSignUpFailed = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router,
              private modalController: ModalController) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
      this.authService.getUserById(this.id).subscribe(data => {
        this.jwtResponse = data;
        console.log(this.jwtResponse);
      });
  }
  save() {
    this.showSpinner = true;
    this.authService.updateUser(this.jwtResponse, this.id).subscribe(
      form => {
        this.jwtResponse = form;
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/tabs/tab3/', this.jwtResponse.username]);
        this.modalController.dismiss().then().catch();
      });
  }
  onSubmit() {
    this.save();
    this.showSpinner = false;
  }
}
