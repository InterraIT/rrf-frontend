import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListPopupComponent } from './profile-list-popup.component';

describe('ProfileListPopupComponent', () => {
  let component: ProfileListPopupComponent;
  let fixture: ComponentFixture<ProfileListPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileListPopupComponent]
    });
    fixture = TestBed.createComponent(ProfileListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
