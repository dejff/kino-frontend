import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Movie} from './movie.model';
import {apiUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) {
  }

  movieChanged = new Subject();
  movieChanged$ = this.movieChanged.asObservable();


  getMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${apiUrl}/movies`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.httpClient.post<Movie>(`${apiUrl}/movies`, movie);
  }

  deleteMovie(movieId: number): void {
    this.httpClient.delete(`${apiUrl}/movies/${movieId}`);
  }

  updateOnMovieChanged(): void {
    this.movieChanged.next();
  }

}
