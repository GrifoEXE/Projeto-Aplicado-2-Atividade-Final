import { Component } from '@angular/core';
import { ScheduleTime } from 'src/app/shared/interfaces/schedule-time.interface';

@Component({
  selector: 'app-list-schedule-time',
  templateUrl: './list-schedule-time.component.html',
  styleUrls: ['./list-schedule-time.component.scss']
})
export class ListScheduleTimeComponent {
  data: ScheduleTime[] = [
    {
      point: 'A',
      date: 'SEG - 08:00',
      name: 'PARADA A',
      address: 'Rua Pinto Martins 346, Cambeba',
      city: 'FORTALEZA'
    },
    {
      point: 'A',
      date: 'SEG - 08:00',
      name: 'PARADA A',
      address: 'Rua Pinto Martins 346, Cambeba',
      city: 'FORTALEZA'
    },
    {
      point: 'A',
      date: 'SEG - 08:00',
      name: 'PARADA A',
      address: 'Rua Pinto Martins 346, Cambeba',
      city: 'FORTALEZA'
    },
    {
      point: 'A',
      date: 'SEG - 08:00',
      name: 'PARADA A',
      address: 'Rua Pinto Martins 346, Cambeba',
      city: 'FORTALEZA'
    },
    {
      point: 'A',
      date: 'SEG - 08:00',
      name: 'PARADA A',
      address: 'Rua Pinto Martins 346, Cambeba',
      city: 'FORTALEZA'
    },
    {
      point: 'A',
      date: 'SEG - 08:00',
      name: 'PARADA A',
      address: 'Rua Pinto Martins 346, Cambeba',
      city: 'FORTALEZA'
    },
    {
      point: 'A',
      date: 'SEG - 08:00',
      name: 'PARADA A',
      address: 'Rua Pinto Martins 346, Cambeba',
      city: 'FORTALEZA'
    },
    {
      point: 'A',
      date: 'SEG - 08:00',
      name: 'PARADA A',
      address: 'Rua Pinto Martins 346, Cambeba',
      city: 'FORTALEZA'
    },
    {
      point: 'A',
      date: 'SEG - 08:00',
      name: 'PARADA A',
      address: 'Rua Pinto Martins 346, Cambeba',
      city: 'FORTALEZA'
    },
    {
      point: 'A',
      date: 'SEG - 08:00',
      name: 'PARADA A',
      address: 'Rua Pinto Martins 346, Cambeba',
      city: 'FORTALEZA'
    },
    {
      point: 'A',
      date: 'SEG - 08:00',
      name: 'PARADA A',
      address: 'Rua Pinto Martins 346, Cambeba',
      city: 'FORTALEZA'
    },
    {
      point: 'A',
      date: 'SEG - 08:00',
      name: 'PARADA A',
      address: 'Rua Pinto Martins 346, Cambeba',
      city: 'FORTALEZA'
    },
  ]

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
