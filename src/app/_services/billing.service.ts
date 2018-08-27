import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BillingService {
    public billingList = new BehaviorSubject<Array<any>>([]);

    constructor(private http: HttpClient) {

    }


    getBillingList() {
       this.http.get('billing/').subscribe(res => {
           this.billingList.next(<Array<any>>res);
       });
       return this.billingList;
    }

    registerStripeToken(token) {
        return this.http.post('billing/', token);
    }

    deleteCard(data) {
        return this.http.post('delete-billing-card/', data);
    }

}
