import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {catchError} from 'rxjs/operators';
import {AlertService} from '../_services/alert.service';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError( err => {
      if (err.status === 401 || err.status === 406) {
        localStorage.removeItem('token');
        localStorage.removeItem('first_login');
        this.authService.isLoggedInObs();
        this.router.navigateByUrl('login');
      }

      if (err.status === 400) {
        console.log(err);

        // if (err.error.errors.non_field_errors) {
        //   console.log(err.error.errors.non_field_errors[0]);
        //   const error_message = err.error.errors.non_field_errors[0];
        //   this.alertService.error(error_message);
        // }
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
