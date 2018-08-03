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
import { ChangePasswordComponent } from './change-password/change-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';


const routes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, canActivate: [PreventLoggedInAccess]},
    {path: 'logout', component: LogoutComponent},
    {path: 'stripe', component: StripeComponent, canActivate: [AuthGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'devices', component: DeviceListComponent},
    {path: 'device', component: DevicesComponent},
    {path: 'device/:id', component: DeviceDetailComponent},
    {path:'register',component:RegisterComponent},
    {path:'reset/:uid/:token',component:ChangePasswordComponent},
    // {path: 'device/:id/update', component: DeviceUpdateComponent},
    {path: 'device/:id/setup', component: DeviceNetworkComponent},
    {path: 'billing', component: BillingComponent},
    {path: 'verify-email/:key', component: VerifyEmailComponent, canActivate: [PreventLoggedInAccess]},

    { path: 'account-confirm-email/:key', component: VerifyEmailComponent, canActivate: [PreventLoggedInAccess] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}



