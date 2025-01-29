import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from '../courses-m/courses/courses.component';
import { AuthGuard } from './guards/auth.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: "courses", component:CoursesComponent, canActivate: [AuthGuard]},
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AdminModule { }
