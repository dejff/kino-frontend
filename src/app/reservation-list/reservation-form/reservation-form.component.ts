import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {

  constructor() { }

  reservationForm: FormGroup;
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
  }

}
