import {Component, OnInit} from '@angular/core';
import {Seance} from './seance.model';
import {SeanceService} from './seance.service';
import {MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-seance-list',
  templateUrl: './seance-list.component.html',
  styleUrls: ['./seance-list.component.scss']
})
export class SeanceListComponent implements OnInit {

  dataSource: MatTableDataSource<Seance>;
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();
  displayedColumns = ['title', 'noOfRoom', 'hourOfStart', 'options'];
  editedSeance: Seance;

  constructor(private seanceService: SeanceService) { }

  ngOnInit() {
    this.getSeances();
    this.seanceAddedSubscription();
  }

  getSeances(): void {
    this.seanceService.getSeances()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        seances => this.dataSource = new MatTableDataSource(seances)
      );
  }

  editElement(seance: Seance): void {
    this.editedSeance = seance;
  }

  removeElement(seanceId): void {
    this.seanceService.deleteSeance(seanceId);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  seanceAddedSubscription(): void {
    this.seanceService.seanceChanged$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        () => this.getSeances()
      );
  }

}
