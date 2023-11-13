import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewFeedbackPopupComponent } from './interview-feedback-popup.component';

describe('InterviewFeedbackPopupComponent', () => {
  let component: InterviewFeedbackPopupComponent;
  let fixture: ComponentFixture<InterviewFeedbackPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewFeedbackPopupComponent]
    });
    fixture = TestBed.createComponent(InterviewFeedbackPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
