import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  token: String | undefined;

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private snackBar: MatSnackBar) {
    if (localStorage.getItem('notification_active') == null) {
      //get from API
      this.saveNotification(true);
    }

    this.userService.connectFromToken().then((data) => {
      this.registerToken();
    });
  }

  saveNotification(active: boolean): void {
    localStorage.setItem('notification_active', String(active));
    this.sendToken(true);
  }

  retrieveNotification(): boolean {
    return localStorage.getItem('notification_active') == "true";
  }

  private sendToken(patch: boolean): void {
    if (!this.token || !this.userService.connected) return;
    const url = environment.api + "device/";
    const httpOptions = this.userService.getUserAuthHeader();
    const body = "cloud_message_type=FCM&active=" + this.retrieveNotification() + "&registration_id=" + this.token;
    if (patch) {
      this.http.patch(url + this.token + "/", body, httpOptions).subscribe((data: any) => {
      }, (err: any) => {
        console.log(err);
      });
    } else {
      this.http.post(url, body, httpOptions).subscribe((data: any) => {
      }, (err: any) => {
        console.log(err);
      });
    }
  }

  registerToken(): void {
    this.sendToken(false);
  }

  notificationClick(notification: Notification): void {
    console.log(notification);
    if (notification.data.route) {
      this.router.navigateByUrl(notification.data.route);
    }
  }

  notificationAlert(notification: Notification): void {
    console.log(notification);
    const sbRef = this.snackBar.open(notification.title + ": " + notification.body, "Voir");
    sbRef.onAction().subscribe(() => {
      this.notificationClick(notification);
    });
  }
}

export interface Notification {
  title: string,
  body: string,
  data: { route: string };
}