import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, PreventLoggedInAccess } from './_guards/auth.guard';


import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { StripeComponent} from './stripe/stripe.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
// import { DeviceUpdateComponent } from './device-update/device-update.component';
import { DeviceNetworkComponent } from './device-network/device-network.component';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'stripe', component: StripeComponent},
    {path: 'devices', component: DeviceListComponent},
    {path: 'device', component: DevicesComponent},
    {path: 'device/:id', component:DeviceDetailComponent},
    // {path: 'device/:id/update', component: DeviceUpdateComponent},
    {path: 'device/:id/setup', component: DeviceNetworkComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}



