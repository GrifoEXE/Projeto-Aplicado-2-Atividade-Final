import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledTimeComponent } from './scheduled-time.component';

describe('ScheduledTimeComponent', () => {
  let component: ScheduledTimeComponent;
  let fixture: ComponentFixture<ScheduledTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
