import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMeetingPopupComponent } from './schedule-meeting-popup.component';

describe('ScheduleMeetingPopupComponent', () => {
  let component: ScheduleMeetingPopupComponent;
  let fixture: ComponentFixture<ScheduleMeetingPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleMeetingPopupComponent]
    });
    fixture = TestBed.createComponent(ScheduleMeetingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
