import { Router } from '@angular/router';
import { CoursesService } from '../../shared/services/courses/courses.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../courses/course.model';
@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Output() courseToEdit = new EventEmitter<any>();
  @Input() course!: Course; // Reçoit un cours en entrée
  @Output() courseSelected = new EventEmitter<number>(); // Émet l'ID du cours

  onSelect() {
    this.courseSelected.emit(this.course.id); // Émet l'ID du cours sélectionné
  }
  allCourses:any
   constructor( private api:CoursesService, private router: Router){}
  ngOnInit():void {
    this.getAllCourses();
  }
  goToDetails(courseId: number) {
    this.router.navigate(['/course-details', courseId]); // Redirige vers la page de détails
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
