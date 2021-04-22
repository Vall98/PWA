import { Component } from '@angular/core';
import { DeviceService, Notification } from './services/device.service';
import firebase from 'firebase/app';
import 'firebase/messaging';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { ArtistsService } from './services/artists.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'free-sons';

  messaging: firebase.messaging.Messaging;

  constructor(private deviceService: DeviceService, swPush: SwPush, updates: SwUpdate, private artistsService: ArtistsService) {
    
    this.initApp();

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
      notification.data = JSON.parse(notification.data.data);
      notification.title = notification.data.title;
      notification.body = notification.data.body;
      console.log(notification);
      this.deviceService.notificationAlert(notification);
    });
    swPush.notificationClicks.subscribe((click: any) => {
      click.notification.data = JSON.parse(click.notification.data.data);
      console.log(click.notification);
      this.deviceService.notificationClick(click.notification);
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

  private initApp(): void {
    this.artistsService.getAllArtists();
  }
}
