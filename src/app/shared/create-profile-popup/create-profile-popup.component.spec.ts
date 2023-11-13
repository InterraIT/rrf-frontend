import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfilePopupComponent } from './create-profile-popup.component';

describe('CreateProfilePopupComponent', () => {
  let component: CreateProfilePopupComponent;
  let fixture: ComponentFixture<CreateProfilePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProfilePopupComponent]
    });
    fixture = TestBed.createComponent(CreateProfilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
