import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class BillingService {
    constructor(private http: HttpClient) {

    }


    getBillingList() {
        return this.http.get('billing/');
    }

    registerStripeToken(token) {
        return this.http.post('billing/', token);
    }

    deleteCard(data) {
        console.log(data, '#######################')
        return this.http.post('delete-billing-card/', data);
    }

}