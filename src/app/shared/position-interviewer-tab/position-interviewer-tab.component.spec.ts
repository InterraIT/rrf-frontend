import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionInterviewerTabComponent } from './position-interviewer-tab.component';

describe('PositionInterviewerTabComponent', () => {
  let component: PositionInterviewerTabComponent;
  let fixture: ComponentFixture<PositionInterviewerTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PositionInterviewerTabComponent]
    });
    fixture = TestBed.createComponent(PositionInterviewerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
