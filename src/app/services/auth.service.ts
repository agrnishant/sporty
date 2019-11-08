import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import { Injectable } from "@angular/core";
import { UserService } from './user.service';
import { AngularFireObject } from '@angular/fire/database';
import { User } from './user';

@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth, private router: Router, private userSrvc: UserService,
    private route: ActivatedRoute) {
    this.knowUser();
  }
  user$:  Observable<firebase.User>;
  user:  firebase.User;
  itemRef: AngularFireObject<User>;
  item: Observable<User>;
  Appuser: User;

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      this.afAuth.auth
      .signInWithRedirect(provider)
      .then(res => {
        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl); //navigate to returnUrl - re-directing the user on login
        resolve(res);
      }, err => {
        console.error(err);
        reject(err);
      })
    })
  }

  tryGoogleLogin(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'; 
    localStorage.setItem('returnUrl', returnUrl); //save it in localStorage, so we can re-direct the user on login
    this.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/']);
    })
    .catch(err => {
      //console.error(err);
    })
  }
  doLogout(){
    return new Promise((resolve, reject) => {
      if(this.afAuth.authState){
        this.afAuth.auth.signOut();
        resolve();
      }
      else{
        reject();
      }
    });
  }
  logout(){
    this.doLogout()
    .then((res) => {
      console.log(res);
    })
    .catch(err => {
      //console.error(err);
    });
  }

  knowUser(){
    this.user$ = this.afAuth.authState;
    if (this.user$)
    this.user$.subscribe(user => {
      this.user = user;
      console.log("User in knowUser()::", user);
    });
    return this.user$;
  }
  isloggedIn(){
    if (this.user) return true;
    return false;
  }
  isAdmin(){
    if(this.knowUser())
    this.knowUser()
    .subscribe(user => {
        if(user){
            this.itemRef = this.userSrvc.get(user.uid);
            this.item = this.itemRef.valueChanges(); 
        }
    });
    if (this.item)
    this.item.subscribe(user => {
        this.Appuser = user;
        console.log("user.isAdmin:: ", user.isAdmin);
    });
    if(this.Appuser) return this.Appuser.isAdmin;
  }
doFacebookLogin(){ return null; }
doTwitterLogin(){  return null; }
doRegister(){  return null; }

}
