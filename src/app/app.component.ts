import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'sportShop';
  constructor(private authService: AuthService, private userService: UserService, 
    private router: Router){
    authService.user$.subscribe(user => {
      if (!user) return;
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
      if(user){
        userService.fbsave(user.displayName, user.email, user.uid);
        console.log("user in appComponent::", user.uid );
      }
    });
  }
}
