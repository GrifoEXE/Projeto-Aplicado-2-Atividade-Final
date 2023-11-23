import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites-schedule-time',
  templateUrl: './favorites-schedule-time.component.html',
  styleUrls: ['./favorites-schedule-time.component.scss']
})
export class FavoritesScheduleTimeComponent {
  toggleFortaleza: boolean = false;
  toggleAracati: boolean = false;
  toogleFortim: boolean = false;

  public getDataFortaleza(): void {
    this.toggleFortaleza = true;
    this.toggleAracati = false;
    this.toogleFortim = false;
  }

  public getDataAracati(): void {
    this.toggleFortaleza = false;
    this.toggleAracati = true;
    this.toogleFortim = false;
  }

  public getDataFortim(): void {
    this.toggleFortaleza = false;
    this.toggleAracati = false;
    this.toogleFortim = true;
  }
}
