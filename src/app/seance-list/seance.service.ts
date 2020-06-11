import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Seance } from './seance.model';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

constructor(private httpClient: HttpClient) { }

  seanceChanged = new Subject();
  seanceChanged$ = this.seanceChanged.asObservable();

  getSeances(): Observable<Seance[]> {
    return this.httpClient.get<Seance[]>(`${apiUrl}/seances`);
  }

  addSeance(seance: Seance): Observable<Seance> {
    return this.httpClient.post<Seance>(`${apiUrl}/seances`, seance);
  }

  deleteSeance(seanceId: number): Observable<{}> {
    return this.httpClient.delete(`${apiUrl}/seances/${seanceId}`);
  }

  updateOnSeanceChanged(): void {
    this.seanceChanged.next();
  }

}
