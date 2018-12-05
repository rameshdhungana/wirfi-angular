import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AdminActivityLogService {

    constructor(private http: HttpClient) {
    }

    getAdminActivityLogList(queryparams) {
        return this.http.get(`activity-log/`, {params: queryparams});
    }
}
