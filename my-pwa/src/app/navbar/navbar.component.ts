import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from '../signin/signin.component';
import { DeviceService } from '../services/device.service';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  notifications: boolean;

  constructor(public userService: UserService, public dialog: MatDialog, public deviceService: DeviceService, public connectionService: ConnectionService) {
    this.notifications = this.deviceService.retrieveNotification();
  }

  signin() : void {
    this.dialog.open(SigninComponent);
  }

  notifToggle(event: any): void {
    this.deviceService.saveNotification(this.notifications);
  }

  stopPropagation(event: any): void {
    event.stopPropagation();
  }

}