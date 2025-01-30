import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  courses = [
    {
      title: 'Cours de JavaScript',
      description: 'Apprenez les bases de JavaScript.',
      imageUrl: 'https://www.example.com/javascript-course.jpg' // Remplacez par une URL d'image réelle
    },
    {
      title: 'Cours de Python',
      description: 'Développez vos compétences en Python.',
      imageUrl: 'https://www.example.com/python-course.jpg' // Remplacez par une URL d'image réelle
    },
    {
      title: 'Cours de Java',
      description: 'Initiez-vous à la programmation Java.',
      imageUrl: 'https://www.example.com/java-course.jpg' // Remplacez par une URL d'image réelle
    }
  ];
}
