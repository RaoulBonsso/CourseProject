import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "http://localhost:3000";


  constructor(private http: HttpClient) { }

  getUserByUsename(userName: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?username=${userName}`);
  }
}
