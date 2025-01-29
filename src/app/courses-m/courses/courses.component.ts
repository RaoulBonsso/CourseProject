import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../../shared/courses.service';
import { Course } from './course.model';
import { Router } from '@angular/router';

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
  addCourse(){
    this.courseModelObj.title = this.formValue.value.ptitle;
    this.courseModelObj.description = this.formValue.value.pdescription;
    this.courseModelObj.time = this.formValue.value.ptime;
    this.api.addCourse(this.courseModelObj).subscribe((data:any)=>{
      console.warn(data);
      alert("Cour Ajouter avec Success")
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset();
      this.getAllCourses();
    }, err =>{
      alert("Une erreur est survenu")
    });
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
