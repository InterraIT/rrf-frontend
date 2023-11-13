import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileManageComponent } from './update-profile-manage.component';

describe('UpdateProfileManageComponent', () => {
  let component: UpdateProfileManageComponent;
  let fixture: ComponentFixture<UpdateProfileManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProfileManageComponent]
    });
    fixture = TestBed.createComponent(UpdateProfileManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
