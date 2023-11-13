import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterMenuComponent } from './recruiter-menu.component';

describe('RecruiterMenuComponent', () => {
  let component: RecruiterMenuComponent;
  let fixture: ComponentFixture<RecruiterMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruiterMenuComponent]
    });
    fixture = TestBed.createComponent(RecruiterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
