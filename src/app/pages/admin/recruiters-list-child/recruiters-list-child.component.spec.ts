import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitersListChildComponent } from './recruiters-list-child.component';

describe('RecruitersListChildComponent', () => {
  let component: RecruitersListChildComponent;
  let fixture: ComponentFixture<RecruitersListChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecruitersListChildComponent]
    });
    fixture = TestBed.createComponent(RecruitersListChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
