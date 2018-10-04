import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Rx";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FranchiseTypeService {
    public getFranchiseType = new Subject<Object>();

    constructor(private http: HttpClient) {
    }

    getFranchiseTypeList() {
        this.http.get('franchise-type/').subscribe(
            response => {
                this.getFranchiseType.next(response);
            }
        );
        return this.getFranchiseType.asObservable();
    }

    postFranchiseType(data) {
        return this.http.post('franchise-type/', data);
    }

    updateFranchiseType(data, id) {
        return this.http.put(`franchise-type/${id}/`, data);
    }

    deleteFranchiseType(id) {
        return this.http.delete(`franchise-type/${id}/`);
    }

}
