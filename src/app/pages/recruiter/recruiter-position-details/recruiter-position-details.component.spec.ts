import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterPositionDetailsComponent } from './recruiter-position-details.component';

describe('RecruiterPositionDetailsComponent', () => {
  let component: RecruiterPositionDetailsComponent;
  let fixture: ComponentFixture<RecruiterPositionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterPositionDetailsComponent]
    });
    fixture = TestBed.createComponent(RecruiterPositionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
