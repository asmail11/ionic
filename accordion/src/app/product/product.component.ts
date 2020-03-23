import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('product') product: any;

  constructor(private toastCrtl: ToastController) { }

  ngOnInit() {}
async buyItem(product) {
  const toast =  await this.toastCrtl.create({
    message:  `Added to the cart: ${product.name}`
  });
  toast.present();
}
}
