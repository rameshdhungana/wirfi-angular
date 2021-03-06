import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard, PreventLoggedInAccess} from './_guards/auth.guard';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DeviceListComponent} from './devices/device-list/device-list.component';
import {DevicesComponent} from './devices/devices.component';
import {DeviceDetailComponent} from './devices/device-detail/device-detail.component';
import {DeviceNetworkComponent} from './devices/device-network/device-network.component';
import {BillingComponent} from './billing/billing.component';
import {RegisterComponent} from './register/register.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {ChangepasswordComponent} from './changepassword/changepassword.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {BusinessComponent} from './business/business.component';
import {BusinessListComponent} from './business-list/business-list.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileFormComponent} from './profile-form/profile-form.component';
import {DeviceAddComponent} from './devices/device-add/device-add.component';
import {AddIndustryTypeComponent} from './industry-list/add-industry-type/add-industry-type.component';
import {MuteDeviceComponent} from './mute-device/mute-device.component';
import {IndustryListComponent} from './industry-list/industry-list.component';
import {NotificationComponent} from './notification/notification.component';
import {FranchiseTypeListComponent} from './franchise/franchise-type-list/franchise-type-list.component';
import {AddNetworkSettingComponent} from './devices/network-setting/add-network-setting/add-network-setting.component';
import {AddPingServerAddressComponent} from './devices/network-setting/add-ping-server-address/add-ping-server-address.component';
import { DeviceUpdateComponent } from './devices/device-update/device-update.component';
import { SuperadminDashboardComponent } from './super-admin/superadmin-dashboard/superadmin-dashboard.component';
import { AdminActivityLogComponent } from './super-admin/admin-activity-log/admin-activity-log.component';
import { UsersListComponent } from './super-admin/users-list/users-list.component';
import { SlashUrlComponent } from './slash-url/slash-url.component';
import { UserCreateComponent } from './super-admin/user-create/user-create.component';
import { DeviceStatusComponent } from './device-status/device-status.component';
import {PlanRouteComponent} from './devices/plan-route/plan-route.component';


const routes: Routes = [
    {path: '', component: SlashUrlComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent, canActivate: [PreventLoggedInAccess]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'profile-update', component: ProfileFormComponent, canActivate: [AuthGuard]},
    {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'devices', component: DeviceListComponent},
    // {path: 'device', component: DevicesComponent, canActivate: [AuthGuard]},
    {path: 'device/:id', component: DeviceDetailComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [PreventLoggedInAccess]},
    {path: 'reset/:uid/:token', component: ResetPasswordComponent},
    {path: 'change-password', component: ChangepasswordComponent, canActivate: [AuthGuard]},
    {path: 'business', component: BusinessComponent, canActivate: [AuthGuard]},
    {path: 'list', component: BusinessListComponent, canActivate: [AuthGuard]},
    {path: 'device-add', component: DeviceAddComponent, canActivate: [AuthGuard]},
    {path: 'billing', component: BillingComponent, canActivate: [AuthGuard]},
    {path: 'me', component: SidebarComponent, canActivate: [AuthGuard]},
    {path: 'device/:id/edit', component: DeviceUpdateComponent},
    {path: 'device/:id/setup', component: DeviceNetworkComponent},
    {path: 'account_confirm_email/:key', component: VerifyEmailComponent},
    {path: 'industry', component: AddIndustryTypeComponent},
    {path: 'mute-device', component: MuteDeviceComponent},
    {path: 'industry-list', component: IndustryListComponent},
    {path: 'notifications', component: NotificationComponent},
    {path: 'franchise-list', component: FranchiseTypeListComponent},
    {path: 'network-setting', component: AddNetworkSettingComponent},
    {path: 'admin-dashboard', component: SuperadminDashboardComponent},
    {path: 'admin-activity-log', component: AdminActivityLogComponent},
    {path: 'users-list', component: UsersListComponent},
    {path: 'users-create', component: UserCreateComponent},
    {path: 'device-status', component: DeviceStatusComponent},
    {path: 'plan-route', component: PlanRouteComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
