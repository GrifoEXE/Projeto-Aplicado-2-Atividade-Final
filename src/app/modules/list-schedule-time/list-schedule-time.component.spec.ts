import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScheduleTimeComponent } from './list-schedule-time.component';

describe('ListScheduleTimeComponent', () => {
  let component: ListScheduleTimeComponent;
  let fixture: ComponentFixture<ListScheduleTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListScheduleTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListScheduleTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
