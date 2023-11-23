import { Component, OnInit } from '@angular/core';

import { ScheduleTime } from 'src/app/shared/interfaces/schedule-time.interface';
import { ScheduleService } from '../../core/services/schedule.service';

@Component({
  selector: 'app-favorites-schedule-time',
  templateUrl: './favorites-schedule-time.component.html',
  styleUrls: ['./favorites-schedule-time.component.scss']
})
export class FavoritesScheduleTimeComponent implements OnInit {
  data: ScheduleTime[] = []

  toggleFortaleza: boolean = false;
  toggleAracati: boolean = false;
  toogleFortim: boolean = false;

  isFirstCall: boolean = false;
  listIsEmpty: boolean = false;
  error: boolean = false;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.isFirstCall = true;
    this.listIsEmpty = false;
    this.getDataFavoritesSchedule('');
  }

  public receiveEvent(city: string): void {
    this.getDataFavoritesSchedule(city);
  }

  public getDataFortaleza(): void {
    this.toggleFortaleza = true;
    this.toggleAracati = false;
    this.toogleFortim = false;
    this.isFirstCall = false;
    this.getDataFavoritesSchedule('FORTALEZA');
  }

  public getDataAracati(): void {
    this.toggleFortaleza = false;
    this.toggleAracati = true;
    this.toogleFortim = false;
    this.isFirstCall = false;
    this.getDataFavoritesSchedule('ARACATI');
  }

  public getDataFortim(): void {
    this.toggleFortaleza = false;
    this.toggleAracati = false;
    this.toogleFortim = true;
    this.isFirstCall = false;
    this.getDataFavoritesSchedule('FORTIM');
  }

  private getDataFavoritesSchedule(cityName: string): void {
    this.scheduleService.getScheduleList().subscribe({
      next: (response: ScheduleTime[]) => {
        this.data = [];
        if (response.length) {
          this.mapDataCity(response, cityName)
        }
        this.error = false;
      }, error: () => {
        this.error = true;
        this.listIsEmpty = false;
      }
    })
  }

  private mapDataCity(schedule: ScheduleTime[], cityName: string): void {
    schedule.map((schedule: ScheduleTime) => {
      if (this.isFirstCall && !cityName) {
        this.getCityData(schedule, 'FORTALEZA');
      }
      this.getCityData(schedule, cityName);
    })
  }

  private getCityData(schedule: ScheduleTime, cityName: string): void {
    if (schedule.city === cityName && schedule.isFavorite) {
      this.data.push(schedule);
    }
    this.verifyList();
  }

  private verifyList(): void {
    if (!this.data.length) {
      this.listIsEmpty = true;
    } else {
      this.listIsEmpty = false;
    }
  }
}
