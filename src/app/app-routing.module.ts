import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { SignupComponent } from './admin/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  /**
 * Alors ici, nous avons appelé le lazy loading
 * pour qu'il puisse charger de manière paresseuse
 * les différents composants spécifiques et requis du module de cours,
 * ou en règle générale, les éléments des composants de cours.
 */
{
    path: 'courses',
    loadChildren: () =>
      import('./courses-m/courses-m.module').then((m) => m.CoursesMModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
