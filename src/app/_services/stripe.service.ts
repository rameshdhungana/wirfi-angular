import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class StripeService {
    constructor(private http: HttpClient) {

    }

    registerStripeToken(token) {
        return this.http.post('stripe/register-token/', token);
    }

}