import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { CourseCardComponent } from './course-card/course-card.component';
import { CoursDetailsComponent } from './cours-details/cours-details.component';

@NgModule({
  declarations: [CoursesComponent,CourseCardComponent, CoursDetailsComponent],
  imports: [CommonModule, ReactiveFormsModule, BrowserModule, AppRoutingModule],
  exports: [CoursesComponent, CourseCardComponent, CoursDetailsComponent]
})
export class CoursesMModule {}
