import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SeanceListComponent} from './seance-list/seance-list.component';
import {MovieListComponent} from './movie-list/movie-list.component';
import {ReservationListComponent} from './reservation-list/reservation-list.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MovieFormComponent} from './movie-list/movie-form/movie-form.component';
import {ReservationFormComponent} from './reservation-list/reservation-form/reservation-form.component';
import {SeanceFormComponent} from './seance-list/seance-form/seance-form.component';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule, MatDatepickerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatSelectModule, MatSortModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule} from '@angular-material-components/moment-adapter';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    SeanceListComponent,
    ReservationListComponent,
    NavbarComponent,
    MovieFormComponent,
    ReservationFormComponent,
    SeanceFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatMenuModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatSortModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
