import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'; // Assurez-vous d'importer le modèle User

import { User } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  validateUser(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.baseUrl}/users?username=${username}&password=${password}`).pipe(
      map(response => response.length > 0),
      catchError(() => of(false))
    );
  }
  getTokenFromApi(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/auth`, { username, password });
  }
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

}
