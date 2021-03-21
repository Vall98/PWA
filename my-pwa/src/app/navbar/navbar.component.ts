import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public userService: UserService, public dialog: MatDialog) {}

  signin() : void {
    this.dialog.open(SigninComponent);
  }

}