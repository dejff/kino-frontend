import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SeanceListComponent} from './seance-list/seance-list.component';
import {ReservationListComponent} from './reservation-list/reservation-list.component';
import {MovieListComponent} from './movie-list/movie-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'seances', component: SeanceListComponent },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'movies', component: MovieListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
