import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard, PreventLoggedInAccess} from './_guards/auth.guard';


import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {StripeComponent} from "./stripe/stripe.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate:[PreventLoggedInAccess]},
  {path: 'logout', component: LogoutComponent},
  {path: 'stripe', component: StripeComponent,canActivate:[AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}



