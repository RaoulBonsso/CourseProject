import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // declaration dune simple liste statique des course pour mettre sur le dashboard en guuise de vitrine
  courses = [
    {
      title: 'Cours de JavaScript',
      description: 'Apprenez les bases de JavaScript.',
    },
    {
      title: 'Cours de Python',
      description: 'Développez vos compétences en Python.',
    },
    {
      title: 'Cours de Java',
      description: 'Initiez-vous à la programmation Java.',
    }
  ];
}
