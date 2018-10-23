import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatDialogModule, MatMenuModule} from '@angular/material';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthGuard, PreventLoggedInAccess} from './_guards/auth.guard';
import {AuthenticationService} from './_services/authentication.service';
import {AlertService} from './_services/alert.service';
import {AppRoutingModule} from './app.routing';
import {UserService} from './_services/user.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {DeviceService} from './_services/device.service';
import {MessageService} from './_services/message.service';
import {IndustryService} from './_services/industry-type.service';
import {DevicesComponent} from './devices/devices.component';
import {DeviceDetailComponent} from './devices/device-detail/device-detail.component';
import {DeviceListComponent} from './devices/device-list/device-list.component';
import {DeviceUpdateComponent} from './devices/device-update/device-update.component';
import {DeviceNetworkComponent} from './devices/device-network/device-network.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TopbarComponent} from './topbar/topbar.component';
import {BillingComponent} from './billing/billing.component';
import {RegisterComponent} from './register/register.component';
import {TextComparatorDirective} from './shared/text-comparator.directive';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {ChangepasswordComponent} from './changepassword/changepassword.component';
import {BusinessComponent} from './business/business.component';
import {BusinessListComponent} from './business-list/business-list.component';
import {BillingService} from './_services/billing.service';
import {ProfileComponent} from './profile/profile.component';
import {DeviceInfoComponent} from './devices/device-info/device-info.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UiSwitchModule} from 'ngx-toggle-switch';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DeletecardComponent} from './billing/deletecard/deletecard.component';
import {AgmCoreModule} from '@agm/core';
import {UpdatecardComponent} from './billing/updatecard/updatecard.component';
import {TimeComparatorDirective} from './shared/time-comparator.directive';
import {ProfileFormComponent} from './profile-form/profile-form.component';
import {AddIndustryTypeComponent} from './industry-list/add-industry-type/add-industry-type.component';
import {MuteDeviceComponent} from './mute-device/mute-device.component';
import {ErrorComponent} from './error/error.component';
import {CustomErrorService} from './_services/custom-error.service';
import {IndustryListComponent} from './industry-list/industry-list.component';
import {NotificationComponent} from './notification/notification.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import {PresetFilterComponent} from './preset-filter/preset-filter.component';
import {DeletePresetComponent} from './delete-preset/delete-preset.component';
import {DatetimeformatPipe} from './shared/datetimeformat.pipe';
import {DeleteIndustryTypeComponent} from './industry-list/delete-industry-type/delete-industry-type.component';
import {FranchiseTypeListComponent} from './franchise/franchise-type-list/franchise-type-list.component';
import {AddFranchiseTypeComponent} from './franchise/add-franchise-type/add-franchise-type.component';
import {DeleteFranchiseTypeComponent} from './franchise/delete-franchise-type/delete-franchise-type.component';
import {AddNetworkSettingComponent} from './devices/add-network-setting/add-network-setting.component';
import {NgxMaskModule} from 'ngx-mask'

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        LogoutComponent,
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
        DeletecardComponent,
        UpdatecardComponent,
        TimeComparatorDirective,
        ProfileFormComponent,
        AddIndustryTypeComponent,
        MuteDeviceComponent,
        ErrorComponent,
        IndustryListComponent,
        NotificationComponent,
        TimeAgoPipe,
        PresetFilterComponent,
        DeletePresetComponent,
        DatetimeformatPipe,
        DeleteIndustryTypeComponent,
        FranchiseTypeListComponent,
        AddFranchiseTypeComponent,
        DeleteFranchiseTypeComponent,
        AddNetworkSettingComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        BrowserAnimationsModule,
        UiSwitchModule,
        NgbModule.forRoot(),
        MatDialogModule,
        MatMenuModule,
        MatCheckboxModule,
        NgxMaskModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDe5eC8KdePOw2FkctkofxgbuA4FBZdie4',
            libraries: ['places',
                'geometry']
        }),


    ],
    providers: [
        AuthenticationService,
        UserService,
        AuthGuard,
        PreventLoggedInAccess,
        AlertService,
        DeviceService,
        MessageService,
        BillingService,
        CustomErrorService,
        IndustryService,

        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    bootstrap:
        [AppComponent,
        ],
    entryComponents: [
        DeletecardComponent,
        UpdatecardComponent,
        PresetFilterComponent,
        MuteDeviceComponent,
        DeletePresetComponent,
        DeleteIndustryTypeComponent,
        AddFranchiseTypeComponent,
        AddIndustryTypeComponent,
        DeleteIndustryTypeComponent,
        DeleteFranchiseTypeComponent


    ]

})

export class AppModule {
}
