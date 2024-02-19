import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
