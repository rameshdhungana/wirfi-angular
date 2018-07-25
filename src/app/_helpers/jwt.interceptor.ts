import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const token = localStorage.getItem('token');
        console.log(token, 'this is token in localstorage');
        request = request.clone({
            url: environment.API_URL + request.url
        });
        console.log('testing testing');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${token}`
                }
            });
            console.log('token is generated');

        }
        return next.handle(request);
    }
}
