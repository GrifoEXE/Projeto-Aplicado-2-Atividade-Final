

import { Component, Input } from '@angular/core';
import { ScheduleTime } from '../../interfaces/schedule-time.interface';


@Component({
  selector: 'app-scheduled-time',
  templateUrl: './scheduled-time.component.html',
  styleUrls: ['./scheduled-time.component.scss']
})
export class ScheduledTimeComponent {
  @Input() data: ScheduleTime | undefined;
}
