import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from '../models/cart.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  cart: Cart[] = [];
  totalAmount: number = 0;

  checkOut = false;

  justOrdered = false;

  onJustOrdered() {
    this.justOrdered = true;
  }

  proceedToCheckOut() {
    this.checkOut = true;
  }

  cancelCheckOut() {
    this.checkOut = false;
  }

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getItems();
    this.getTotalAmount();
    this.subscription = this.cartService.cartChanged.subscribe((cart) => {
      this.cart = cart;
      this.getTotalAmount();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addQuantity(index: number) {
    this.cartService.addQuantity(index);
  }

  deductQuantity(index: number) {
    this.cartService.deductQuantity(index);
  }

  getTotalAmount() {
    let total = 0;
    this.cart.map((item) => {
      total += item.quantity * item.product.price;
    });
    this.totalAmount = total;
  }

  removeItemFromCart(id: string) {
    this.cartService.removeItem(id);
    this.cart = this.cartService.getItems();
  }
}
