import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginMode = true;
  isLoading = false;
  error: string = null;
  private subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  switchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(frm: NgForm) {
    this.isLoading = true;
    const email = frm.value.email;
    const password = frm.value.password;

    let authObs: Observable<User>;

    if (this.loginMode) {
      authObs = this.authService.signin(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    this.subscription = authObs.subscribe(
      (response) => {
        this.loginMode = true;
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.loginMode = true;
        this.isLoading = false;
      }
    );

    frm.reset();
  }

  onHandleError() {
    this.error = null;
  }
}
