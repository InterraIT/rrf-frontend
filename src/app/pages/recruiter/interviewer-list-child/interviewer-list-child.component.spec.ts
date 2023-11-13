import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerListChildComponent } from './interviewer-list-child.component';

describe('InterviewerListChildComponent', () => {
  let component: InterviewerListChildComponent;
  let fixture: ComponentFixture<InterviewerListChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewerListChildComponent]
    });
    fixture = TestBed.createComponent(InterviewerListChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
