import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  private _pusher;

  constructor() {
    this._pusher = new Pusher('acd2ed37fe2a7fe77dcc', {
      cluster: 'ap2',
      encrypted: true
    });
  }

  getPusher() {
    return this._pusher;
  }
}
