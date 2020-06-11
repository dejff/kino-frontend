import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seance-list',
  templateUrl: './seance-list.component.html',
  styleUrls: ['./seance-list.component.scss']
})
export class SeanceListComponent implements OnInit {

  displayedColumns = ['title', 'duration', 'yearOfProduction'];

  constructor() { }

  ngOnInit() {
  }

}
