import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { SignupComponent } from './admin/signup/signup.component';
import { CoursesComponent } from './courses-m/courses/courses.component';
import { AuthGuard } from './admin/guards/auth.guard';
import { CoursDetailsComponent } from './courses-m/cours-details/cours-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  { path: 'course-details/:id', component: CoursDetailsComponent },
  {path: 'courses', component:CoursesComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
