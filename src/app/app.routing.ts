import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard, PreventLoggedInAccess} from './_guards/auth.guard';


import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {StripeComponent} from "./stripe/stripe.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'stripe', component: StripeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}



