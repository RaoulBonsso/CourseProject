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

  // ici nous avons les methode pour pouvoire gere les action de connection recuperation de token deconnection et suppresion de token
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

  // cette methode nous permet de recuperer le token depuis le serveur
  getTokenFromApi(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/users`, { username, password });
  }

  // cette methode nous permet de verifier si l'utilisateur est connecte
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
// cette methode nous permet de supprimer le token quand on ce deconnecte
// presentement le token est conserve sous
// le nom de userPassword authToken est undefined mais
//  je le laisse parce que je vais cree
//  une petit api pour continue ce projet plutard et il sera plus
// facile pour moi de reprendre la plus facilement
  logOut(): void {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userPassword');
    console.log("11111")
  }

  // cette methode nous permet de recuperer le token de l'utilisateur
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }
}
