import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListChildComponent } from './profile-list-child.component';

describe('ProfileListChildComponent', () => {
  let component: ProfileListChildComponent;
  let fixture: ComponentFixture<ProfileListChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileListChildComponent]
    });
    fixture = TestBed.createComponent(ProfileListChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
