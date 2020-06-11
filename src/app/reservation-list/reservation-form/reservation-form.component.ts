import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Reservation} from '../reservation.model';
import {take, takeUntil} from 'rxjs/operators';
import {ReservationService} from '../reservation.service';
import {Movie} from '../../movie-list/movie.model';
import {SeanceService} from '../../seance-list/seance.service';
import {Seance} from '../../seance-list/seance.model';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {

  @Input()
  set reservation(reservation: Reservation) {
    if (reservation) {
      this.reservationId = reservation.id;
      this.updateForm(reservation);
      this.mode = 'edit';
    }
  }

  constructor(private reservationService: ReservationService,
              private seanceService: SeanceService,
              private fb: FormBuilder) {
  }

  mode = 'add';
  reservationId: number;
  reservationForm: FormGroup;
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();
  availableSeances: Seance[];

  ngOnInit() {
    this.prepareForm();
    this.getSeances();
  }

  get seance() {
    return this.reservationForm.get('seance');
  }

  get lastName() {
    return this.reservationForm.get('lastName');
  }

  get firstName() {
    return this.reservationForm.get('firstName');
  }

  get noOfPlaces() {
    return this.reservationForm.get('noOfPlaces');
  }


  prepareForm(): void {
    this.reservationForm = this.fb.group(
      {
        seance: ['', Validators.required],
        lastName: ['', Validators.required],
        firstName: ['', Validators.required],
        noOfPlaces: ['', Validators.required]
      }
    );
  }

  getSeances(): void {
    this.seanceService.getSeances()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        seances => this.availableSeances = seances
      );
  }


  updateForm(reservation: Reservation): void {
    this.seance.patchValue(reservation.seance);
    this.lastName.patchValue(reservation.lastName);
    this.firstName.patchValue(reservation.firstName);
    this.noOfPlaces.patchValue(reservation.noOfPlaces);
  }

  prepareReservation(): Reservation {
    return {
      id: this.reservationId,
      seance: this.seance.value,
      noOfPlaces: this.noOfPlaces.value,
      lastName: this.lastName.value,
      firstName: this.firstName.value
    };
  }

  addReservation() {
    this.validateAllFields(this.reservationForm);
    if (this.reservationForm.valid) {
      this.reservationService.addReservation(this.prepareReservation())
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe(
          () => {
            this.reservationForm.reset();
            this.reservationService.updateOnReservationChanged();
          }
        );
    }
  }

  cancel(): void {
    this.reservationForm.markAsUntouched({onlySelf: true});
    this.reservationForm.reset();
  }

  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

}
