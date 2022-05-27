import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { RouterGuardGuard } from './router-guard.guard';

const routes: Routes = [
  {path:'', redirectTo:'signin',pathMatch:'full'},
  {path:'signin',component:SignInComponent},
  {path:'signup',component:SignUpComponent},
  {path:'dashboard',component:AuthComponent, canActivate: [RouterGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}