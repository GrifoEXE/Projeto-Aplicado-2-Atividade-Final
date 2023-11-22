import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scheduled-time',
  templateUrl: './scheduled-time.component.html',
  styleUrls: ['./scheduled-time.component.scss']
})
export class ScheduledTimeComponent {
  @Input() data = {
    point: 'A',
    date: 'SEG - 08:00'
  }
}
