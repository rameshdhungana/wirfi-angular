import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {
    }

    updateUser(user, id) {
        return this.http.put(`user/${id}/`, user);
    }

    deleteUser(id) {
        return this.http.delete(`user/${id}/`);
    }

    uploadProfile(profile, id) {
        return this.http.post(`user/${id}/image/`, profile);
    }

    listUser(query_params) {
        return this.http.get(`users/`, {params: query_params});

    }

    createUser(data) {
        return this.http.post(`users/`, data);
    }

    toggleUserPushNotifications(user_id, data) {
        return this.http.post(`user/${user_id}/toggle_push_notifications/`, data);
    }
}
