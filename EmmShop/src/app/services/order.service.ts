import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getOrder() {
    return this.http.get<Order[]>(environment.apiServer + '/orders', {
      params: new HttpParams().set(
        'email',
        JSON.parse(localStorage.getItem('data')).user.email
      ),
    });
  }

  saveOrder(order: Order) {
    return this.http.post(environment.apiServer + '/saveOrder', {
      order,
    });
  }
}
