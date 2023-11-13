import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterLayoutComponent } from './recruiter-layout.component';

describe('RecruiterLayoutComponent', () => {
  let component: RecruiterLayoutComponent;
  let fixture: ComponentFixture<RecruiterLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterLayoutComponent]
    });
    fixture = TestBed.createComponent(RecruiterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
