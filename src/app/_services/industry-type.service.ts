import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable()
export class IndustryService {
    public getIndustryType = new Subject<Object>();

    constructor(private http: HttpClient) {
    }

    getIndustryList() {
        this.http.get('industry-type/').subscribe(
            response => {
                this.getIndustryType.next(response);
            }
        );
        return this.getIndustryType.asObservable();
    }

    postIndustry(data) {
        return this.http.post('industry-type/', data);
    }

    updateIndustry(data, id) {
        return this.http.put(`industry-type/${id}/`, data);
    }

    deleteIndustry(id) {
        return this.http.delete(`industry-type/${id}/`);
    }

}
