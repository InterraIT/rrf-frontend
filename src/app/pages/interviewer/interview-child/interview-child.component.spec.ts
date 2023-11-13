import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewChildComponent } from './interview-child.component';

describe('InterviewChildComponent', () => {
  let component: InterviewChildComponent;
  let fixture: ComponentFixture<InterviewChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewChildComponent]
    });
    fixture = TestBed.createComponent(InterviewChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
