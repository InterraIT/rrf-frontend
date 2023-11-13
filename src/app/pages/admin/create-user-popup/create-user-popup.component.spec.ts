import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserPopupComponent } from './create-user-popup.component';

describe('CreateUserPopupComponent', () => {
  let component: CreateUserPopupComponent;
  let fixture: ComponentFixture<CreateUserPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserPopupComponent]
    });
    fixture = TestBed.createComponent(CreateUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
