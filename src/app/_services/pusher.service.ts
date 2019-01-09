import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  public _pusher;

  constructor() {
    this._pusher = new Pusher('bedffa99f95575cb78ef', {
      cluster: 'ap2',
      encrypted: true
    });
  }

  getPusher() {
    return this._pusher;
  }
}
