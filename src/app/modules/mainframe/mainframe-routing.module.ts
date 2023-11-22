import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainframeComponent } from './pages/mainframe.component';
import { MapComponent } from '../map/map.component';
import { ListScheduleTimeComponent } from '../list-schedule-time/list-schedule-time.component';
import { FavoritesScheduleTimeComponent } from '../favorites-schedule-time/favorites-schedule-time.component';

const routes: Routes = [
  {
    path: '',
    component: MainframeComponent,
    children: [
      {
        path: '',
        component: MapComponent,
      },
      {
        path: 'horarios',
        component: ListScheduleTimeComponent,
      },
      {
        path: 'favoritos',
        component: FavoritesScheduleTimeComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainframeRoutingModule { }
