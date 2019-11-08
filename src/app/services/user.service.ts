import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dbPath = '/users/';

  UsersRef: AngularFireList<User> = null;

  constructor(private db: AngularFireDatabase) {
    this.UsersRef = db.list(this.dbPath);
  }

  fbsave(name: string, email: string, uid: string) { 
    this.db.object(this.dbPath + uid).update({
      name: name,
      email: email,
      isAdmin: true
    });
  }

  createUser(user: User): void {
    this.UsersRef.push(user);
  }

  updateUser(key: string, value: any): Promise<void> {
    return this.UsersRef.update(key, value);
  }

  deleteUser(key: string): Promise<void> {
    return this.UsersRef.remove(key);
  }

  getUsersList(): AngularFireList<User> {
    return this.UsersRef;
  }

  get(uid: string): AngularFireObject<User> {
   return this.db.object(this.dbPath + uid);
  }

  deleteAll(): Promise<void> {
    return this.UsersRef.remove();
  }
}
