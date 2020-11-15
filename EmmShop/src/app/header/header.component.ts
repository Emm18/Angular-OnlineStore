import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  cartCount: number;
  subscription1: Subscription;
  subscription2: Subscription;
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription2 = this.authService.user.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });

    this.subscription1 = this.cartService.cartChanged.subscribe((cart) => {
      this.cartCount = cart.length;
    });

    this.cartService.checkStorage();
  }

  ngOnDestroy() {
    if (this.subscription1) {
      this.subscription1.unsubscribe;
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe;
    }
  }

  onLogout() {
    this.authService.signout();
  }
}
