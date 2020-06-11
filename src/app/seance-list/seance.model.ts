import { Movie } from '../movie-list/movie.model';

export interface Seance {
  id: number;
  noOfRoom: number;
  hourOfStart: string;
  movie: Movie;
}
