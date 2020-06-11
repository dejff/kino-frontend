import { Seance } from '../seance-list/seance.model';

export interface Reservation {
  id: number;
  seance: Seance;
  lastName: string;
  firstName: string;
  noOfPlaces: number;
}
