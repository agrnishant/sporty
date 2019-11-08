import { AuthService } from '../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) {
    this.Admin = true;
  }
  
  user$:  Observable<firebase.User>;
  Admin: boolean;
  totalCountShopItems: number = 0;
  subscription: Subscription;

  logout(){
    this.authService.logout();
  }

  login(){
    this.authService.tryGoogleLogin();
  }

  knowUser(){
    this.user$ = this.authService.knowUser();
  }

  isAdmin(){
    console.log("this.Admin", this.Admin);
    this.Admin = this.authService.isAdmin();
  }

  ngOnInit(){
    this.knowUser();
    this.isAdmin();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
