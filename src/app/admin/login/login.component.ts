import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }
  loginUser() {
    const { username, password } = this.loginForm.value;

    if (!username || !password) {
      alert('Veuillez entrer un nom d\'utilisateur et un mot de passe.');
      return;
    }

    this.authService.validateUser(username, password).subscribe(
      (isValid) => {
        if (isValid) {
          this.authService.getTokenFromApi(username, password).subscribe(
            (tokenResponse) => {
              const token = tokenResponse.token;
              sessionStorage.setItem('authToken', token);
              alert('Utilisateur authentifié avec succès');
              this.router.navigate(['/courses']);
            },
            (error) => {
              console.error('Erreur lors de la récupération du token:', error);
              alert('Une erreur est survenue lors de la récupération du token.');
            }
          );
        } else {
          alert('Identifiants invalides');
        }
      },
      (error) => {
        console.error('Erreur d\'authentification:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    );
  }}
