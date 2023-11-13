import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterPositionManageComponent } from './recruiter-position-manage.component';

describe('RecruiterPositionManageComponent', () => {
  let component: RecruiterPositionManageComponent;
  let fixture: ComponentFixture<RecruiterPositionManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterPositionManageComponent]
    });
    fixture = TestBed.createComponent(RecruiterPositionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
