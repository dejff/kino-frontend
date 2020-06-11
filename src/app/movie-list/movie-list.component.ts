import {Component, OnInit} from '@angular/core';
import {Movie} from './movie.model';
import {MovieService} from './movie.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  dataSource: MatTableDataSource<Movie>;
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = ['title', 'duration', 'yearOfProduction', 'options'];
  editedMovie: Movie;

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.getMovies();
    this.movieAddedSubscription();
  }

  getMovies(): void {
    this.movieService.getMovies()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        movies => this.dataSource = new MatTableDataSource(movies)
      );
  }

  movieAddedSubscription(): void {
    this.movieService.movieChanged$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        () => {
          this.getMovies();
        }
      );
  }

  editElement(movie: Movie): void {
    this.editedMovie = movie;
  }

  removeElement(movieId): void {
    this.movieService.deleteMovie(movieId)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        () => this.getMovies()
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
