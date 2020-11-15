import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { CartService } from './cart.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private cartService: CartService
  ) {}

  signup(email: string, password: string) {
    return this.http
      .post<User>(environment.apiServer + '/signup', {
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(email, resData.token);
        })
      );
  }

  signin(email: string, password: string) {
    return this.http
      .post<User>(environment.apiServer + '/signin', {
        email,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(email, resData.token);
        })
      );
  }

  signout() {
    this.user.next(null);
    this.cartService.removeAll();
    this.router.navigate(['/auth']);
    localStorage.clear();
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('data'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.user.email, userData.user.token);

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  private handleAuthentication(email: string, token: string) {
    const user = new User(email, token);
    this.user.next(user);

    let userData = JSON.parse(localStorage.getItem('data'));

    userData = {
      user: { email: email, token: token },
      cart: [],
    };
    localStorage.setItem('data', JSON.stringify(userData));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Unknown error occured!';

    if (!errorRes.error) {
      return throwError(errorMessage);
    }

    if (!errorRes.error.error && errorRes.error.includes('dup key')) {
      errorMessage = 'This email exists already';
    } else if (errorRes.error.error) {
      errorMessage = errorRes.error.error;
    }

    return throwError(errorMessage);
  }
}
