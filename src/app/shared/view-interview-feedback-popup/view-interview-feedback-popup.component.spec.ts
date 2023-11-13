import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInterviewFeedbackPopupComponent } from './view-interview-feedback-popup.component';

describe('ViewInterviewFeedbackPopupComponent', () => {
  let component: ViewInterviewFeedbackPopupComponent;
  let fixture: ComponentFixture<ViewInterviewFeedbackPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInterviewFeedbackPopupComponent]
    });
    fixture = TestBed.createComponent(ViewInterviewFeedbackPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
