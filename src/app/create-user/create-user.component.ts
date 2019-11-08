import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../services/user';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  submitted = false;
  public user: User = new User();
  constructor(private UserService: UserService) { }

  ngOnInit() {  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {
    this.UserService.createUser(this.user);
    this.user = new User();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
