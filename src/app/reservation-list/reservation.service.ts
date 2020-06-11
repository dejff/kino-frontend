import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from './reservation.model';
import {Observable, Subject} from 'rxjs';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) { }

  reservationChanged = new Subject();
  reservationChanged$ = this.reservationChanged.asObservable();

  getReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(`${apiUrl}/reservations`);
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(`${apiUrl}/reservations`, reservation);
  }

  deleteReservation(reservationId: number): void {
    this.httpClient.delete(`${apiUrl}/reservations/${reservationId}`);
  }

  updateOnReservationChanged(): void {
    this.reservationChanged.next();
  }

}
