import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const token = localStorage.getItem('token');
       if (request.headers.get('map_url')){
        request = request.clone({
            url: environment.MAP_URL + request.url
        });
       }
      else{
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
      }
        return next.handle(request);
    }
}
