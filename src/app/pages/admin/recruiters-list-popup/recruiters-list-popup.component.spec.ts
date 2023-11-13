import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitersListPopupComponent } from './recruiters-list-popup.component';

describe('RecruitersListPopupComponent', () => {
  let component: RecruitersListPopupComponent;
  let fixture: ComponentFixture<RecruitersListPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruitersListPopupComponent]
    });
    fixture = TestBed.createComponent(RecruitersListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
