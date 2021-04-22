import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  online: boolean = false;

  constructor() {
    this.createOnline$().subscribe((online: boolean) => {
      this.online = online;
    });
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
}
