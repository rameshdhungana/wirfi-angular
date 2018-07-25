import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from './logout/logout.component';
import {AuthGuard, PreventLoggedInAccess} from './_guards/auth.guard';
import {AuthenticationService} from './_services/authentication.service';
import {AlertService} from './_services/alert.service';

import {AppRoutingModule} from './app.routing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


import {UserService} from './_services/user.service';


import {FormsModule} from "@angular/forms";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {StripeComponent} from "./stripe/stripe.component";


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LogoutComponent,
        StripeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,


    ],
    providers: [
        AuthenticationService,
        UserService,
        AuthGuard,
        PreventLoggedInAccess,
        AlertService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}


    ],
    bootstrap: [AppComponent,


    ]
})
export class AppModule {
}

