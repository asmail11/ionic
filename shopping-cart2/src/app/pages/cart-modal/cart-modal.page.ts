import { Component, OnInit } from '@angular/core';
import {CartService, Product} from '../../services/cart.service';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
 cart: Product[] = [];

  constructor(private cartService: CartService, private modalCarl: ModalController) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  decreaseCartItem(p) {
    this.cartService.decreaseProduct(p);
  }
  increaseCartItem(p) {
    this.cartService.addProduct(p);
  }
  removeCartItem(p) {
    this.cartService.removeProduct(p);
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  close() {
    this.modalCarl.dismiss();
  }
}
