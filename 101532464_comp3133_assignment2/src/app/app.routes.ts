import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { EmployeeListComponent } from './pages/employees/employee-list.component';
import { EmployeeDetailComponent } from './pages/employees/employee-detail.component';
import { EmployeeFormComponent } from './pages/employees/employee-form.component';
import { EmployeeSearchComponent } from './pages/employees/employee-search.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: 'employees/add', component: EmployeeFormComponent, canActivate: [authGuard] },
  { path: 'employees/edit/:id', component: EmployeeFormComponent, canActivate: [authGuard] },
  { path: 'employees/search', component: EmployeeSearchComponent, canActivate: [authGuard] },
  { path: 'employees/:id', component: EmployeeDetailComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
