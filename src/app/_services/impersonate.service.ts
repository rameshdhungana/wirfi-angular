import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImpersonateService {

    constructor(
      private http: HttpClient
    ) { }

    impersonateUser(user_id) {
        return this.http.get(`impersonate/${user_id}/`);
    }

    stopImpersonation() {
        return this.http.get(`impersonate/stop/`);
    }

}
