import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerListPopupComponent } from './interviewer-list-popup.component';

describe('InterviewerListPopupComponent', () => {
  let component: InterviewerListPopupComponent;
  let fixture: ComponentFixture<InterviewerListPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewerListPopupComponent]
    });
    fixture = TestBed.createComponent(InterviewerListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
