import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInterviewsManageComponent } from './my-interviews-manage.component';

describe('MyInterviewsManageComponent', () => {
  let component: MyInterviewsManageComponent;
  let fixture: ComponentFixture<MyInterviewsManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyInterviewsManageComponent]
    });
    fixture = TestBed.createComponent(MyInterviewsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
