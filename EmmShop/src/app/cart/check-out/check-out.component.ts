import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { Order } from 'src/app/models/order.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  @Output() ordered = new EventEmitter<void>();
  @Output() editOrder = new EventEmitter<void>();
  @Input() cart: Cart[] = [];
  @Input() totalAmount: number;
  shipping: FormGroup;
  showInvalids = false;

  subscription: Subscription;

  validationError = null;

  order: Order;
  placeOrder = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.shipping = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
    });
  }

  onEditOrder() {
    this.editOrder.emit();
  }

  onSubmit() {
    if (this.shipping.valid) {
      const dateNow = new Date();
      const shippingDate = new Date().setDate(new Date().getDate() + 7);

      let email = JSON.parse(localStorage.getItem('data')).user.email;
      let fName = this.shipping.get('firstName').value;
      let lName = this.shipping.get('lastName').value.split(' ').join('');
      let address = this.shipping.get('address').value;
      let orderNumber = lName + '-' + dateNow.getTime().toString();
      let estimatedShipping = new Date(shippingDate).toDateString();
      let cart = this.cart;
      let total = this.totalAmount;
      let status = 'preparing order(s)';

      let order = new Order(
        email,
        fName,
        lName,
        address,
        orderNumber,
        estimatedShipping,
        cart,
        total,
        status
      );

      console.log(order);

      this.orderService.saveOrder(order).subscribe((res) => {
        console.log(res);
      });

      this.order = order;
      this.placeOrder = true;

      this.cartService.removeAll();
      this.ordered.emit();

      this.showInvalids = false;
      this.shipping.reset();
    } else {
      this.validationError = 'Make sure you enter all required fields!';
      this.showInvalids = true;
    }
  }

  onCloseAlert() {
    this.validationError = null;
  }
}
