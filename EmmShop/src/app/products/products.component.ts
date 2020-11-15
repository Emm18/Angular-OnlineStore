import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  isLoading = false;

  products: Product[] = [];
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getProducts();
    this.subscription = this.productService.productsChanged.subscribe(
      (products) => {
        this.products = products;
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  viewProduct(id: string) {
    console.log(id);
    this.router.navigate(['/product/details', id]);
  }

  addItemToCart(product: Product) {
    this.cartService.addItem(product);
  }
}
