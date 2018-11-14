import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Options } from 'selenium-webdriver/firefox';

@Injectable({
  providedIn: 'root'
})

export class GoogleApiService {
  google_map_lat_api = 'json?key=AIzaSyDe5eC8KdePOw2FkctkofxgbuA4FBZdie4&address=';

  constructor(
      private http: HttpClient
  ) { }

  get_lat_long(address) {
      const headers = new HttpHeaders();
      return this.http.get(this.google_map_lat_api + address, {
          headers: {'map_url': 'true'}
      });
  }
}
