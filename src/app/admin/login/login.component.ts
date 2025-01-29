import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
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
      pusername: [''],
      ppassword: [''],
    });
  }
  loginUser() {
    const { username, password } = this.loginForm.value;
    this.authService.getUserByUsename(username).subscribe(
      (response) => {
        if (response.length > 0 && response[0].password === password) {
          console.log('Invalid credentials');
        } else {
          sessionStorage.setItem('password', password);
          alert('User authenticated');

          this.router.navigate(['/courses']);
          console.log('User authenticated');
        }
      },
      (error) => {
        alert('Something went wrong');
      }
    );
  }
}
