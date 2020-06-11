import { Component, OnInit } from '@angular/core';
import {Reservation} from '../reservation-list/reservation.model';
import {Seance} from './seance.model';
import {SeanceService} from './seance.service';
import {MatTableDataSource} from '@angular/material';
import {Movie} from '../movie-list/movie.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-seance-list',
  templateUrl: './seance-list.component.html',
  styleUrls: ['./seance-list.component.scss']
})
export class SeanceListComponent implements OnInit {

  dataSource: MatTableDataSource<Seance>;
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = ['room', 'movieTitle', 'movieDuration', 'seanceTime', 'options'];
  editedSeance: Seance;

  constructor(private seanceService: SeanceService) { }

  ngOnInit() {
  }

  editElement(seance: Seance): void {
    this.editedSeance = seance;
  }

  removeElement(seanceId): void {
    this.seanceService.deleteSeance(seanceId);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
