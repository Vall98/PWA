import { Component } from '@angular/core';
import { DeviceService, Notification } from './services/device.service';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'free-sons';

  messaging: firebase.messaging.Messaging;

  constructor(private deviceService: DeviceService, swPush: SwPush, updates: SwUpdate) {
    updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      document.location.reload();
    });
    updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
  
    swPush.messages.subscribe((notification: any) => {
      this.deviceService.notificationAlert(notification);
    });
    swPush.notificationClicks.subscribe((click: any) => {
      console.log(click);
      console.log(click.data);
      const notif: Notification = {
        notification: click.notification,
        data: click.data.FCM_MSG.data
      }
      this.deviceService.notificationClick(notif);
    });

    this.messaging = firebase.messaging();
    navigator.serviceWorker.getRegistration().then(registration => {
      console.log(registration);
      this.messaging.getToken({ serviceWorkerRegistration: registration }).then((token) => {
        console.log(token);
        this.deviceService.token = token;
        this.deviceService.registerToken();
      });
    });
  }
}
