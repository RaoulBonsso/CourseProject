import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Course } from './course.model';
import { Router } from '@angular/router';
import { CoursesService } from '../../shared/services/courses/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  allCourses:any
  formValue! : FormGroup
  courseModelObj: Course = new Course();
  showAdd!:boolean
  shoeEdit!:boolean
  showModal: boolean = false;
  constructor(private fb:FormBuilder, private api:CoursesService, private router: Router){}

  ngOnInit():void {
    this.formValue = this.fb.group({
      ptitle:[''],
      pdescription:[''],
      ptime:['']
    });
    this.getAllCourses();
  }

  clickAddCourse(){
    this.formValue.reset();
    this.showAdd = true;
    this.shoeEdit = false;
  }

  getAllCourses(){
    this.api.getCourses().subscribe((data:any)=>{
      this.allCourses = data;
      console.warn(this.allCourses)
    });
  }
  addCourse() {
    this.courseModelObj.title = this.formValue.value.ptitle;
    this.courseModelObj.description = this.formValue.value.pdescription;
    this.courseModelObj.time = this.formValue.value.ptime;

    if (this.shoeEdit) {
        this.api.updateCourse(this.courseModelObj).subscribe((data: any) => {
            alert("Course mis à jour avec succès");
            this.getAllCourses();
            this.formValue.reset();
            this.showModal = false; // Ferme la modale
        }, err => {
            alert("Une erreur est survenue lors de la mise à jour");
        });
    } else {
        this.api.addCourse(this.courseModelObj).subscribe((data: any) => {
            alert("Course ajouté avec succès");
            this.getAllCourses();
            this.formValue.reset();
            this.showModal = false; // Ferme la modale
        }, err => {
            alert("Une erreur est survenue");
        });
    }
}
  // Ajoute cette méthode dans CoursesComponent
updateCourse(data: any) {
  this.courseModelObj.id = data.id; // Assure-toi que ton modèle a un champ ID
  this.formValue.controls['ptitle'].setValue(data.title);
  this.formValue.controls['pdescription'].setValue(data.description);
  this.formValue.controls['ptime'].setValue(data.time);
  this.showAdd = false; // Pour afficher le bouton Add ou Update
  this.shoeEdit = true;
}

  deleteCourse(data:any){
    this.api.deleteCourse(data.id).subscribe((res)=>{
      alert("Cour supprimer avec Success")
      this.getAllCourses();
    });

  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
