import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from '../courses-m/courses/courses.component';
import { AuthGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    /**
     * pendent mon processus de modularisation de lapplication
     *  j'ai apri que cest grace a Reactive Form module que
     *  l'on pouvais appele le FormGroup dans la page HTML sans j'ai rencontre
     *  des erreur avant de me rendre compte que il etait vraiment
     * important dans le traitement des donnes venant de la page html
     */
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AdminModule {}
RouterModule.forRoot([
  { path: "courses", component:CoursesComponent, canActivate: [AuthGuard]},
])
