import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient
    ) { }

    updateUser(user, id) {
        return this.http.put(`user/${id}/`, user);
    }

    uploadProfile(profile, id) {
        return this.http.post(`user/${id}/image/`, profile);
    }
}
