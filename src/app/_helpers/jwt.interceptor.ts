import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const token = localStorage.getItem('token');
        request = request.clone({
            url: environment.API_URL + request.url
        });
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${token}`
                }
            });
        }
        if (localStorage.getItem('is_impersonating')) {
            request = request.clone({
                setHeaders: {
                    Personator: `${localStorage.getItem('personator')}`
                }
            });
        }
        return next.handle(request);
    }
}
