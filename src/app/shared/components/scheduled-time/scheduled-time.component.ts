

import { Component, Input, OnInit } from '@angular/core';
import { ScheduleTime } from '../../interfaces/schedule-time.interface';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-scheduled-time',
  templateUrl: './scheduled-time.component.html',
  styleUrls: ['./scheduled-time.component.scss']
})
export class ScheduledTimeComponent {
  @Input() data!: ScheduleTime;

  constructor(private scheduleService: ScheduleService, private router: Router) { }

  public editScheduleTime(data: ScheduleTime): void {
    this.scheduleService.editScheduleFavoriteList(data).subscribe();
    this.reloadCurrentRoute();
  }

  /* TODO: Melhorar método para inicializar a cada cidade */
  private reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
