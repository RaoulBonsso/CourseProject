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
  // NOus alons emttre le cours sélectionné et les informations du cours à éditer
  @Output() courseToEdit = new EventEmitter<any>();
  @Input() course!: Course; // La nous recevons un cours en entrée
  @Output() courseSelected = new EventEmitter<number>(); // et cette ligne nous permet demmetre l'id du cours selectione

  onSelect() {
    this.courseSelected.emit(this.course.id); // cette ligne nous permet simplement demttre l'id du cours selectione grace a la declaration de lemetteur que lon a definit en haut
  }
  allCourses:any
   constructor( private api:CoursesService, private router: Router){}
  ngOnInit():void {
    this.getAllCourses();
  }
  goToDetails(courseId: number) {
    this.router.navigate(['/course-details', courseId]); // Redirige vers la page de détails
  }
  /**
   *la cette methode nous permet de recupere tout les courses disponible
   */
  getAllCourses(){
    this.api.getCourses().subscribe((data:any)=>{
      this.allCourses = data;
      console.warn(this.allCourses)
    });
  }

// cette methode nous permet de supprimer un course
  deleteCourse(data:any){
    this.api.deleteCourse(data.id).subscribe((res)=>{
      alert("Cour supprimer avec Success")
      this.getAllCourses();
    });

  }


}
