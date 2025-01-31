import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseCardComponent } from './course-card/course-card.component';
import { CoursDetailsComponent } from './cours-details/cours-details.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../admin/guards/auth.guard';

@NgModule({
  // declaration des composant du module
  declarations: [
    CoursesComponent,
    CourseCardComponent,
    CoursDetailsComponent
  ],
  /**
*Ici nous avons retirer BrowserModule et AppRoutingModule
 pour pouvoire implamente le lazy loading ces module n
 e sont plus requis leur simples presence genere des
 erreur dans le code.
 */
  imports: [
    CommonModule,
    ReactiveFormsModule,
    /**
enfin voici l'implementation de notre lazy laoding
 qui vas ce charge de definir les route qui sont presente
 et nous pouvons remarque que la route principale
 soit celle pour avoir acces au cours est protege part un authGuard
 */
    RouterModule.forChild([
      { path: '', component: CoursesComponent, canActivate: [AuthGuard] },
      { path: 'course-details/:id', component: CoursDetailsComponent }
    ])
  ],
  exports: [
    CoursesComponent,
    CourseCardComponent,
    CoursDetailsComponent
  ]
})
export class CoursesMModule {}
