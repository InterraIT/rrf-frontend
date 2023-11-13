import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInterviewListComponent } from './my-interview-list.component';

describe('MyInterviewListComponent', () => {
  let component: MyInterviewListComponent;
  let fixture: ComponentFixture<MyInterviewListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyInterviewListComponent]
    });
    fixture = TestBed.createComponent(MyInterviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
