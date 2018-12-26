import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) {
    }

    getDashboard() {
        return this.http.get('dashboard/');
    }

    getDeviceLocation() {
       return this.http.get('device/locations/');
    }
}
