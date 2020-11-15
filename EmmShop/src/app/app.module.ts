import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { OrdersComponent } from './orders/orders.component';
import { LandingComponent } from './landing/landing.component';
import { CartComponent } from './cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertComponent } from './shared/alert/alert.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { CheckOutComponent } from './cart/check-out/check-out.component';
import { ReceiptComponent } from './cart/receipt/receipt.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ProductsComponent,
    ProductDetailsComponent,
    OrdersComponent,
    LandingComponent,
    CartComponent,
    PageNotFoundComponent,
    AlertComponent,
    LoadingSpinnerComponent,
    CheckOutComponent,
    ReceiptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
