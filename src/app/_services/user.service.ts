import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  registerUser(user) {
    return this.http.post('api/auth/registration/', user);
  }

  sendInvitationEmail(email) {
    return this.http.post('tenant/send-invitation-email/', email);
  }


}
