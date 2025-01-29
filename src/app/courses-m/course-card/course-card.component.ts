import { Component } from '@angular/core';
import { CoursesService } from '../../shared/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  allCourses:any
   constructor( private api:CoursesService, private router: Router){}
  ngOnInit():void {
    this.getAllCourses();
  }
  getAllCourses(){
    this.api.getCourses().subscribe((data:any)=>{
      this.allCourses = data;
      console.warn(this.allCourses)
    });
  }

  deleteCourse(data:any){
    this.api.deleteCourse(data.id).subscribe((res)=>{
      alert("Cour supprimer avec Success")
      this.getAllCourses();
    });

  }


}
