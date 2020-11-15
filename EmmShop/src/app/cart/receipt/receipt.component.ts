import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})
export class ReceiptComponent implements OnInit {
  @Input() orderDetail: Order;

  constructor() {}

  ngOnInit(): void {}
}
