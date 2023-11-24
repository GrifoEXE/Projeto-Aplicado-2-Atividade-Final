import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { ScheduleTime } from 'src/app/shared/interfaces/schedule-time.interface';

@Component({
  selector: 'app-list-schedule-time',
  templateUrl: './list-schedule-time.component.html',
  styleUrls: ['./list-schedule-time.component.scss']
})
export class ListScheduleTimeComponent implements OnInit {
  schedule: ScheduleTime[] = []

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
    this.getDataSchedule('');
  }

  reloadData(city: string): void {
    this.getDataSchedule(city);
  }

  getDataFortaleza(): void {
    this.toggleFortaleza = true;
    this.toggleAracati = false;
    this.toogleFortim = false;
    this.isFirstCall = false;
    this.getDataSchedule('FORTALEZA');
  }

  getDataAracati(): void {
    this.toggleFortaleza = false;
    this.toggleAracati = true;
    this.toogleFortim = false;
    this.isFirstCall = false;
    this.getDataSchedule('ARACATI');
  }

  getDataFortim(): void {
    this.toggleFortaleza = false;
    this.toggleAracati = false;
    this.toogleFortim = true;
    this.isFirstCall = false;
    this.getDataSchedule('FORTIM');
  }

  private getDataSchedule(cityName: string): void {
    this.scheduleService.getScheduleList().subscribe({
      next: (response: ScheduleTime[]) => {
        this.schedule = [];
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
    if (schedule.city === cityName) {
      this.schedule.push(schedule);
    }
    this.verifyList();
  }

  private verifyList(): void {
    if (!this.schedule.length) {
      this.listIsEmpty = true;
    } else {
      this.listIsEmpty = false;
    }
  }
}
