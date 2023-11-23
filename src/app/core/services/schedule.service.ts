import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduleTime } from 'src/app/shared/interfaces/schedule-time.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  public getScheduleFavoriteList(): Observable<ScheduleTime[]> {
    return this.http.get<ScheduleTime[]>('http://localhost:3000/schedule');
  }

  public editScheduleFavoriteList(scheduleData: ScheduleTime): Observable<ScheduleTime[]> {
    const schedule: ScheduleTime = {
      ...scheduleData,
      isFavorite: !scheduleData.isFavorite
    }

    return this.http.put<ScheduleTime[]>(`http://localhost:3000/schedule/${schedule.id}`, schedule);
  }
}
