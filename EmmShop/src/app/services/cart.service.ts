import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartChanged = new Subject<Cart[]>();
  cart: Cart[] = [];

  getItems() {
    return this.cart.slice();
  }

  addItem(product: Product) {
    let previousCart = this.cart.filter((x) => x.product._id != product._id);
    let currentProduct = this.cart.filter(
      (x) => x.product._id == product._id
    )[0];
    if (currentProduct) {
      currentProduct.quantity++;
      previousCart.push(currentProduct);
      this.cart = previousCart;
    } else {
      this.cart.push({ product, quantity: 1 });
    }

    this.cartChanged.next(this.cart.slice());
    this.updateLocalStorage(this.cart);
  }

  addQuantity(index: number) {
    this.cart[index].quantity++;
    this.cartChanged.next(this.cart);
    this.updateLocalStorage(this.cart);
  }

  deductQuantity(index: number) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity--;
      this.cartChanged.next(this.cart);
      this.updateLocalStorage(this.cart);
    }
  }

  removeItem(id: string) {
    this.cart = this.cart.filter((x) => x.product._id != id);
    this.cartChanged.next(this.cart);
    this.updateLocalStorage(this.cart);
  }

  removeAll() {
    this.cart = [];
    this.cartChanged.next(this.cart);
    this.updateLocalStorage(this.cart);
  }

  checkStorage() {
    const dataStr = localStorage.getItem('data');
    const data = JSON.parse(dataStr);

    if (data && data.cart) {
      this.cart = data.cart;
    } else {
      this.cart = [];
    }
    this.cartChanged.next(this.cart.slice());
  }

  private updateLocalStorage(cart: Cart[]) {
    let userData = JSON.parse(localStorage.getItem('data'));

    userData = {
      user: { email: userData.user.email, token: userData.user.token },
      cart: cart,
    };
    localStorage.setItem('data', JSON.stringify(userData));
  }
}
