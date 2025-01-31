import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './admin/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  /**
   * Ici nous avons aussi applique
   * le lazy loading pour charger les different
   *  composant du module admine qui sont login et register
   */
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  /**
 * Alors ici, nous avons appelé le lazy loading
 * pour qu'il puisse charger de manière paresseuse
 * les différents composants spécifiques et requis du module de cours,
 * ou en règle générale, les éléments des composants de cours.
 */
{
    path: 'courses',
    loadChildren: () =>
      import('./courses-m/courses-m.module').then((m) => m.CoursesMModule),canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
