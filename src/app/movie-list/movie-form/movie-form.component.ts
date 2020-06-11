import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../movie.model';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MovieService} from '../movie.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

  @Input()
  set movie(movie: Movie) {
    if (movie) {
      this.movieId = movie.id;
      this.updateForm(movie);
      this.mode = 'edit';
    }
  }

  movieId: number;
  mode = 'add';
  movieForm: FormGroup;
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private movieService: MovieService) {
  }

  get title(): AbstractControl {
    return this.movieForm.get('title');
  }

  get duration(): AbstractControl {
    return this.movieForm.get('duration');
  }

  get yearOfProduction(): AbstractControl {
    return this.movieForm.get('yearOfProduction');
  }

  ngOnInit() {
    this.prepareForm();
  }

  prepareForm(): void {
    this.movieForm = this.fb.group(
      {
        title: ['', Validators.required],
        yearOfProduction: [''],
        duration: ['', Validators.required]
      }
    );
  }


  updateForm(movie: Movie): void {
    this.title.patchValue(movie.title);
    this.duration.patchValue(movie.duration);
    this.yearOfProduction.patchValue(movie.yearOfProduction);
  }

  prepareMovie(): Movie {
    return {
      id: this.movieId,
      title: this.title.value,
      duration: this.duration.value,
      yearOfProduction: this.yearOfProduction.value
    };
  }

  addMovie() {
    this.validateAllFields(this.movieForm);
    if (this.movieForm.valid) {
      this.prepareMovie();
      this.movieService.addMovie(this.prepareMovie())
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe(
          () => {
            this.movieForm.reset();
            this.movieService.updateOnMovieChanged();
          }
        );
    }
  }

  cancel(): void {
    this.movieForm.markAsUntouched({onlySelf: true});
    this.movieForm.reset();
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
