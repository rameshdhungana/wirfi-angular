import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(
        private http: HttpClient
    ) { }

    getAllNotification() {
        return this.http.get('notifications/');
    }

    updateNotificationToReadType(id) {
        return this.http.put(`notifications/${id}/`, {});
    }
}
