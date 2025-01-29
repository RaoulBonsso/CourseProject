import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http:HttpClient) { }

  addCourse(data:any){
    return this.http.post("http://localhost:3000/courses",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  getCourses(){
    return this.http.get("http://localhost:3000/courses").pipe(map((res:any)=>{
      return res;
    }));
  }

  updateCourse(data:any, id:number){
    return this.http.put(`http://localhost:3000/courses/${id}`,data).pipe(map((res:any)=>{
      return res;
    }));
  }
  deleteCourse(id:number){
    return this.http.delete(`http://localhost:3000/courses/${id}`).pipe(map((res:any)=>{
      return res;
    }));
  }
}
