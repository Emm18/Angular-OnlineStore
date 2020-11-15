import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  productsChanged = new Subject<Product[]>();
  private products: Product[];

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http
      .get<Product[]>(environment.apiServer + '/products')
      .subscribe((res) => {
        this.products = res;
        this.productsChanged.next(this.products);
      });
  }

  getProductById(id: string) {
    return this.products.filter((x) => x._id == id)[0];
  }
}
