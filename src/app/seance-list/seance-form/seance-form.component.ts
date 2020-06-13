import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {SeanceService} from '../seance.service';
import {Seance} from '../seance.model';
import {MovieService} from '../../movie-list/movie.service';
import {Movie} from '../../movie-list/movie.model';
import * as moment from 'moment';

@Component({
  selector: 'app-seance-form',
  templateUrl: './seance-form.component.html',
  styleUrls: ['./seance-form.component.scss']
})
export class SeanceFormComponent implements OnInit {

  @Input()
  set seance(seance: Seance) {
    if (seance) {
      this.seanceId = seance.id;
      this.updateForm(seance);
      this.cdRef.detectChanges();
      this.mode = 'edit';
    }
  }

  mode = 'add';
  seanceId: number;
  seanceForm: FormGroup;
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();
  availableMovies: Movie[];

  constructor(private fb: FormBuilder,
              private seanceService: SeanceService,
              private movieService: MovieService,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.prepareForm();
    this.getMovies();
  }

  get noOfRoom() {
    return this.seanceForm.get('noOfRoom');
  }

  get hourOfStart() {
    return this.seanceForm.get('hourOfStart');
  }

  get movie() {
    return this.seanceForm.get('movie');
  }

  getMovies(): void {
    this.movieService.getMovies()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        movies => this.availableMovies = movies
      );
  }

  prepareForm(): void {
    this.seanceForm = this.fb.group(
      {
        noOfRoom: ['', Validators.required],
        hourOfStart: ['', Validators.required],
        movie: ['', Validators.required]
      }
    );
  }

  updateForm(seance: Seance): void {
    this.movie.patchValue(seance.movie);
    this.hourOfStart.patchValue(moment(seance.hourOfStart).format('YYYY-MM-DD hh:mm:ss'));
    this.noOfRoom.patchValue(seance.noOfRoom);
  }

  prepareSeance(): Seance {
    return {
      id: this.seanceId,
      movie: this.movie.value,
      hourOfStart: moment(this.hourOfStart.value).format('YYYY-MM-DD HH:mm:ss'),
      noOfRoom: this.noOfRoom.value
    };
  }

  addSeance() {
    this.validateAllFields(this.seanceForm);
    if (this.seanceForm.valid) {
      this.prepareSeance();
      this.seanceService.addSeance(this.prepareSeance())
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe(
          () => {
            this.seanceForm.reset();
            this.seanceService.updateOnSeanceChanged();
          }
        );
    }
  }

  cancel(): void {
    this.seanceForm.markAsUntouched({onlySelf: true});
    this.seanceForm.reset();
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

  getMovieTitle(movie: Movie): string {
    return `Film ${movie.title} (${movie.yearOfProduction})`;
  }

}
