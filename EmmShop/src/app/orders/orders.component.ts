import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoading = false;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.isLoading = true;
    this.orderService.getOrder().subscribe((res) => {
      let temp = res.slice();
      this.orders = temp.reverse();
      console.log(this.orders);
      this.isLoading = false;
    });
  }
}
