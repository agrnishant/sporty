import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authService.isloggedIn() ) return true;
    this.router.navigate(['/'], {queryParams: {returnUrl: state.url} });
    //in this returnUrl we are capturing the present state.url which is the path we tried to access
    // we capture its url in returnUrl if we are not logged-in 
    //http://localhost:4200/?returnUrl=%2Fcheck-out (so state.url = '%2Fcheck-out' )
  }
}
