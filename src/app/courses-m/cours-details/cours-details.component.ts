import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../shared/services/courses/courses.service';

@Component({
  selector: 'app-cours-details',
  templateUrl: './cours-details.component.html',
  styleUrl: './cours-details.component.css'
})
export class CoursDetailsComponent {
  courseId!: number;
  courseDetails: any;

  constructor(private route: ActivatedRoute, private api: CoursesService, private router: Router) {}

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('id')!; // Récupérer l'ID du cours
    this.getCourseDetails();
  }

  getCourseDetails() {
    this.api.getCourseById(this.courseId).subscribe((data: any) => {
      this.courseDetails = data; // Assigne les détails du cours
    });
  }

  goBack() {
    this.router.navigate(['/courses']); // Retour à la liste des cours
  }

}
