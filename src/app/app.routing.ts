import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard, PreventLoggedInAccess} from './_guards/auth.guard';


import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {StripeComponent} from "./stripe/stripe.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DeviceListComponent} from './device-list/device-list.component';
import {DevicesComponent} from './devices/devices.component';
import {DeviceDetailComponent} from './device-detail/device-detail.component';
import {DeviceNetworkComponent} from './device-network/device-network.component';
import {BillingComponent} from "./billing/billing.component";
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { BusinessComponent } from './business/business.component';
import { BusinessListComponent } from './business-list/business-list.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, canActivate: [PreventLoggedInAccess]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'logout', component: LogoutComponent , canActivate: [AuthGuard]},
    {path: 'stripe', component: StripeComponent, canActivate: [AuthGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'devices', component: DeviceListComponent,canActivate: [AuthGuard]},
    {path: 'device', component: DevicesComponent,canActivate: [AuthGuard]},
    {path: 'device/:id', component: DeviceDetailComponent,canActivate: [AuthGuard]},
    {path:'register',component:RegisterComponent,canActivate: [PreventLoggedInAccess]},
    {path:'reset/:uid/:token',component:ResetPasswordComponent,canActivate: [AuthGuard]},
    {path:'change-password',component:ChangepasswordComponent,canActivate: [AuthGuard]},
    {path:'bussiness',component:BusinessComponent,canActivate: [AuthGuard]},
    {path:'list',component:BusinessListComponent,canActivate: [AuthGuard]},
    {path:'billing',component:BillingComponent,canActivate: [AuthGuard]},
    // {path: 'device/:id/update', component: DeviceUpdateComponent},
    {path: 'device/:id/setup', component: DeviceNetworkComponent},
    { path: 'account_confirm_email/:key', component: VerifyEmailComponent ,canActivate: [PreventLoggedInAccess]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}



