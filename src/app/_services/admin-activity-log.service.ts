import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AdminActivityLogService {

    constructor(private http: HttpClient) {
    }

    getAdminActivityLogList() {
        return this.http.get(`activity-log/`);
    }
}
