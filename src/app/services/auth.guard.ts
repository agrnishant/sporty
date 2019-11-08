import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    //canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) - definition in Angular
    //console.log("knowuser::", this.authService.knowUser());
    //console.log("knowuser::", this.authService.isloggedIn());
    if(this.authService.isloggedIn() ) return true;
    this.router.navigate(['/'], {queryParams: {returnUrl: state.url} });  //accessed if return is not true above
    //in this returnUrl we are capturing the present state.url which is the path we tried to access
    //say we tried to access (by directly typing in the browser as cheat-way '/check-out', 
    // we capture its url in returnUrl if we are not logged-in 
    // then get re-directed to the "/" page in the process along with queryParams as::
    //http://localhost:4200/?returnUrl=%2Fcheck-out (so state.url = '%2Fcheck-out' )
    //http://localhost:4200/?returnUrl=%2Fmy%2Forders (for /my/orders page in case of false)
  }

  // canActivate(): Promise<boolean>{
  //   return new Promise((resolve, reject) => {
  //     this.userService.getCurrentUser()
  //     .then(user => {
  //       this.router.navigate(['/user']);
  //       return resolve(false);
  //     }, err => {
  //       return resolve(true);
  //     })
  //   })
  // }
}

// import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
// import { AuthService } from './auth.service';
// import { CanActivate } from '@angular/router';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate { //renamed to AuthGuard from AuthGuardService
//   // Lecture 11.11- CanActivate Interface (note that CanActivate is an interface )
//   //note that upto now we have made sure that the /admin page button is not shown until we are logged-in, 
//   // but if we try to directly type in http://localhost:4200/admin into the browser, 
//   //then we are able to reach the admin page - NOT ACCEPTABLE
//   // TO AVOID THIS WE CREATED THIS SERVICE
//   //now with this [AuthGuard] applied to admin component inside routes of app.module as::
//   //{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
//   //we make sure that only authenticated users can reach the admin page (even without button), else not
//   //meaning now if we directly type-in the admin page URL in browser as::
//   //http://localhost:4200/admin
//   //we are re-directed to the login page "/login" instead

//   //Lecture 11.12-Redirecting the Users After Logging In - 
//   // the motive here is to get the user back to admin page after logging in (instead of home page)
//   // We need to capture the route snapshot - something similar we did in 
//   // 10.13-Programmatic Navigation - check github-profile.component, GithubFollowersComponent, ArchiveComponent

//   //Lecture 11.13-Protecting Routes Based on the User - see file admin-auth-guard.service.ts

//   constructor(private authService: AuthService, private router: Router) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
//     //canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) - definition in Angular
//     if(this.authService.isLoggedIn()) return true; 
//     this.router.navigate(['/login'], {queryParams: {returnUrl: state.url} }); 
//     //in this returnUrl we are capturing the present state.url which is '/admin'
//     //now as the user tries to browse by typing to '/admin', we capture its url in returnUrl
//     // then get re-directed to the login page" /login" in the process
//     // finally after login we get re-directed back to admin page
//     //this returnUrl we have to set in login component as::
//     //let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
//     // this.router.navigate([returnUrl || '/']);
//   }
// }
