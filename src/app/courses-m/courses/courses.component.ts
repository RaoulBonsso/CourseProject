import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../admin/services/auth.service';

import { Course } from './course.model';
import { Router } from '@angular/router';
import { CoursesService } from '../../shared/services/courses/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  // declaration des variables important pour stocke les donnes
  allCourses:any
  formValue! : FormGroup
  courseModelObj: Course = new Course();
  showAdd!:boolean
  shoeEdit!:boolean
  showModal: boolean = false;
  constructor(private fb:FormBuilder, private api:CoursesService, private router: Router, private authService: AuthService){}

  ngOnInit():void {
    this.formValue = this.fb.group({
      ptitle:[''],
      pdescription:[''],
      ptime:['']
    });
    this.getAllCourses();
  }

    // fonction pour afficher le formulaire d'ajout de cours
  clickAddCourse(){
    this.formValue.reset();
    this.showAdd = true;
    this.shoeEdit = false;
  }

    // fonction pour récupérer tous les cours via l'API
  getAllCourses(){
    this.api.getCourses().subscribe((data:any)=>{
      this.allCourses = data;
      console.warn(this.allCourses)
    });
  }

   // fonction pour ajouter ou mettre à jour un cours
  addCourse() {
    this.courseModelObj.title = this.formValue.value.ptitle;
    this.courseModelObj.description = this.formValue.value.pdescription;
    this.courseModelObj.time = this.formValue.value.ptime;

    if (this.shoeEdit) {
        this.api.updateCourse(this.courseModelObj).subscribe((data: any) => {
            alert("Course mis à jour avec succès");
            let ref = document.getElementById('clear');
            ref?.click();
            this.formValue.reset();
            this.getAllCourses();
            this.formValue.reset();
            this.showModal = false;
        }, err => {
            alert("Une erreur est survenue lors de la mise à jour");
        });
    } else {
        this.api.addCourse(this.courseModelObj).subscribe((data: any) => {
            alert("Course ajouté avec succès");
            let ref = document.getElementById('clear');
            ref?.click();
            this.formValue.reset();
            this.getAllCourses();
            this.formValue.reset();
            this.showModal = false;
        }, err => {
            alert("Une erreur est survenue");
        });
    }
}
// fonction pour remplir le formulaire d'édition avec les données du cours sélectionné
// en gros ce que l'on fait ici c'est affecte les valeur recupere au champs de donnes pour pouvoir les editer plus facilement et les mettre a jour
updateCourse(data: Course) {
  this.courseModelObj.id = data.id;
  this.formValue.controls['ptitle'].setValue(data.title);
  this.formValue.controls['pdescription'].setValue(data.description);
  this.formValue.controls['ptime'].setValue(data.time);
  this.showAdd = false;
  this.shoeEdit = true;
}
// fonction pour supprimer un cours
  deleteCourse(data:Course){
    this.api.deleteCourse(data.id).subscribe((res)=>{
      alert("Cour supprimer avec Success")
      this.getAllCourses();
    });

  }
   // fonction pour naviguer vers les détails d'un cours spécifique
  goToDetails(courseId: number) {
    this.router.navigate(['/course-details', courseId]);
  }

    // fonction pour déconnecter l'utilisateur
  logOut(){
    /**
     * Alors ici ce que nous fessont c'est appele la methode
     * logOut qui est present dans le authService pour supprimer
     *  le token qui avait ete stocke a la connection de l'utilisateur
     * pour guarantire un securite minimal et apres lon redirige l'utilisateur
     * sur la page de login
     */
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
