import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CoursesService } from '../shared/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  allProperty:any
  constructor(private fb:FormBuilder, private api:CoursesService){}

  ngOnInit():void {}
  

}
