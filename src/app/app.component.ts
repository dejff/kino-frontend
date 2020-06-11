import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kino-front';

  navLinks = [
    {path: '/movies', label: 'Filmy'},
    {path: '/seances', label: 'Seanse'},
    {path: '/reservations', label: 'Rezerwacje'}
  ];
}
