import { Cart } from './cart.model';

export class Order {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public adress: string,
    public orderNumber: string,
    public estimatedShipping: string,
    public cart: Cart[],
    public total: number,
    public status: string
  ) {}
}
