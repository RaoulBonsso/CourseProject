import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Course } from '../../../courses-m/courses/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http:HttpClient) { }

  // ici nous avons les different methode http qui vont nous permettre de pouvoire communique avec le serveur json
  addCourse(data:any){
    return this.http.post("http://localhost:3000/courses",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  /**
   * methode pour recupere les courses
   */
  getCourses(){
    return this.http.get("http://localhost:3000/courses").pipe(map((res:any)=>{
      return res;
    }));
  }
  /**
   * methode pour recupere un cours a partie de sont id
   */
  getCourseById(data:number){
    return this.http.get(`http://localhost:3000/courses/${data}`).pipe(map((res:any)=>{
      return res;
    }));
  }
/** la nous avons la methode update qui prend en parametre un objet de type course et
 non plus un any comme suggere et effectue
*une modification en fonction de l'id du cour en question*/
  updateCourse(data:Course){
    return this.http.put(`http://localhost:3000/courses/${data.id}`,data).pipe(map((res:any)=>{
      return res;
    }));
  }

  /**
   * metohode pour supprimer un cours */  deleteCourse(id:number){
    return this.http.delete(`http://localhost:3000/courses/${id}`).pipe(map((res:any)=>{
      return res;
    }));
  }
}
