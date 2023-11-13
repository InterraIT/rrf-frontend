import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerLayoutComponent } from './interviewer-layout.component';

describe('InterviewerLayoutComponent', () => {
  let component: InterviewerLayoutComponent;
  let fixture: ComponentFixture<InterviewerLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewerLayoutComponent]
    });
    fixture = TestBed.createComponent(InterviewerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
