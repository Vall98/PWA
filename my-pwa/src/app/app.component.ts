import { Component } from '@angular/core';
import { DeviceService } from './services/device.service';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { environment } from 'src/environments/environment';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'free-sons';

  messaging: firebase.messaging.Messaging;

  constructor(private deviceService: DeviceService, swPush: SwPush, updates: SwUpdate, private userService: UserService) {
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
      this.deviceService.notificationAlert(notification.notification);
    });
    swPush.notificationClicks.subscribe((click) => {
      this.deviceService.notificationClick(click);
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
