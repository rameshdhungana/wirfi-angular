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
        this.http.get('location-type/').subscribe(
            response => {
                this.getFranchiseType.next(response);
            }
        );
        return this.getFranchiseType.asObservable();
    }

    postFranchiseType(data) {
        return this.http.post('location-type/', data);
    }

    updateFranchiseType(data, id) {
        return this.http.put(`location-type/${id}/`, data);
    }

    deleteFranchiseType(id) {
        return this.http.delete(`location-type/${id}/`);
    }

}
