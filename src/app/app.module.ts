import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from './logout/logout.component';
import {AuthGuard, PreventLoggedInAccess} from './_guards/auth.guard';
import {AuthenticationService} from './_services/authentication.service';
import {AlertService} from './_services/alert.service';
import {AppRoutingModule} from './app.routing';
import {UserService} from './_services/user.service';
import {FormsModule} from "@angular/forms";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {StripeComponent} from "./stripe/stripe.component";
import {StripeService} from "./_services/stripe.service";
import {DashboardComponent} from './dashboard/dashboard.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {DeviceService} from './_services/device.service';
import {MessageService} from './_services/message.service';
import {DevicesComponent} from './devices/devices.component';
import {DeviceDetailComponent} from './device-detail/device-detail.component';
import {DeviceListComponent} from './device-list/device-list.component';
import {DeviceUpdateComponent} from './device-update/device-update.component';
import {DeviceNetworkComponent} from './device-network/device-network.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TopbarComponent } from './topbar/topbar.component';
import { BillingComponent } from './billing/billing.component';
import { RegisterComponent } from './register/register.component';
import { TextComparatorDirective } from './shared/text-comparator.directive';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { BusinessComponent } from './business/business.component';
import { BusinessListComponent } from './business-list/business-list.component';
import {BillingService} from "./_services/billing.service";
import { ProfileComponent } from './profile/profile.component';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { UiSwitchModule } from 'ngx-toggle-switch';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LogoutComponent,
        StripeComponent,
        DashboardComponent,
        SidebarComponent,
        DevicesComponent,
        DeviceDetailComponent,
        DeviceListComponent,
        DeviceUpdateComponent,
        DeviceNetworkComponent,
        TopbarComponent,
        BillingComponent,
        RegisterComponent,
        TextComparatorDirective,
        ResetPasswordComponent,
        VerifyEmailComponent,
        ChangepasswordComponent,
        BusinessComponent,
        BusinessListComponent,
        ProfileComponent,
        DeviceInfoComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        NgxMaterialTimepickerModule.forRoot(),
        BrowserAnimationsModule,
        UiSwitchModule


    ],
    providers: [
        AuthenticationService,
        UserService,
        AuthGuard,
        PreventLoggedInAccess,
        AlertService,
        DeviceService,
        StripeService,
        MessageService,
        BillingService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    bootstrap:
        [AppComponent,
        ]
})

export class AppModule {
}
