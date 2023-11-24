

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScheduleTime } from '../../interfaces/schedule-time.interface';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-scheduled-time',
  templateUrl: './scheduled-time.component.html',
  styleUrls: ['./scheduled-time.component.scss']
})
export class ScheduledTimeComponent {
  @Input() schedule!: ScheduleTime;
  @Output() reloadCity: EventEmitter<string> = new EventEmitter();

  constructor(private scheduleService: ScheduleService, private router: Router) { }

  updateScheduleTime(schedule: ScheduleTime): void {
    this.scheduleService.updateSchedule(schedule).subscribe({
      next: () => this.reloadCurrentRoute()
    });
  }

  private reloadCurrentRoute() {
    this.reloadCity.emit(this.schedule.city)
  }
}
