import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AddComponent } from './pages/add/add.component';
import { AppGuard } from './guards/app-guard.guard';
import { AuthGuard } from './guards/auth-guard.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AppGuard] },
  { path: 'details/:city', component: DetailsComponent, canActivate: [AppGuard] },
  { path: 'add', component: AddComponent, canActivate: [AppGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
