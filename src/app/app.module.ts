import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { MapComponent } from './modules/map/map.component';
import { FavoritesScheduleTimeComponent } from './modules/favorites-schedule-time/favorites-schedule-time.component';
import { ListScheduleTimeComponent } from './modules/list-schedule-time/list-schedule-time.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    FavoritesScheduleTimeComponent,
    ListScheduleTimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places', 'drawing', 'geometry']
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
