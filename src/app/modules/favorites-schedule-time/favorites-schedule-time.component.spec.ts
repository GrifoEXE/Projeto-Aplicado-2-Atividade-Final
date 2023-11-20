import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesScheduleTimeComponent } from './favorites-schedule-time.component';

describe('FavoritesScheduleTimeComponent', () => {
  let component: FavoritesScheduleTimeComponent;
  let fixture: ComponentFixture<FavoritesScheduleTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesScheduleTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesScheduleTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
