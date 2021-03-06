import {Component, OnInit} from '@angular/core';
import {Reservation} from './reservation.model';
import {ReservationService} from './reservation.service';
import {MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {

  dataSource: MatTableDataSource<Reservation>;
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = ['seanceTime', 'lastName', 'firstName', 'numberOfPlaces', 'options'];
  editedReservation: Reservation;

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit() {
    this.getReservations();
    this.subscribeOnReservationsChanged();
  }

  getReservations(): void {
    this.reservationService.getReservations()
      .pipe()
      .subscribe(
        reservations => this.dataSource = new MatTableDataSource(reservations)
      );
  }

  subscribeOnReservationsChanged(): void {
    this.reservationService.reservationChanged$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        () => this.getReservations()
      );
  }

  editElement(reservation: Reservation): void {
    this.editedReservation = reservation;
  }

  removeElement(reservationId): void {
    this.reservationService.deleteReservation(reservationId)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        () => this.getReservations()
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
