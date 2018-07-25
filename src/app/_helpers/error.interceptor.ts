import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {catchError} from 'rxjs/operators';
import {AlertService} from '../_services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError( err => {
      if (err.status === 401) {
        this.authService.logout();
        location.reload(true);
      }

      if (err.status === 0) {
        this.alertService.error('Unable to process your request currently!');
      }

      if (err.status === 400) {
        console.log(err);
        if (err.error.errors.non_field_errors) {
          console.log(err.error.errors.non_field_errors[0]);
          const error_message = err.error.errors.non_field_errors[0];
          this.alertService.error(error_message);
        }
        // for (const key in error) {
        //   for (const message of error[key]) {
        //     const msg = key + ':' + message;
        //     this.alertService.error(msg);
        //   }
        // }
      }
      return throwError(err);
    }));
  }
}
