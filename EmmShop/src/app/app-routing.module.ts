import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsComponent } from './products/products.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product/details/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'orders/:id',
    component: OrdersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/page-not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
