import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerMenuComponent } from './interviewer-menu.component';

describe('InterviewerMenuComponent', () => {
  let component: InterviewerMenuComponent;
  let fixture: ComponentFixture<InterviewerMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewerMenuComponent]
    });
    fixture = TestBed.createComponent(InterviewerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
