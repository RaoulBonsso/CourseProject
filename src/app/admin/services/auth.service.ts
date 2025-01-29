import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  validateUser(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.baseUrl}/users?username=${username}&password=${password}`).pipe(
      map(response => {
        if (response.length > 0) {
          sessionStorage.setItem('userPassword', password);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  getTokenFromApi(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/users`, { username, password });
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userPassword'); 
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }
}
