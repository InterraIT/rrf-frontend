import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionProfileChildComponent } from './position-profile-child.component';

describe('PositionProfileChildComponent', () => {
  let component: PositionProfileChildComponent;
  let fixture: ComponentFixture<PositionProfileChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PositionProfileChildComponent]
    });
    fixture = TestBed.createComponent(PositionProfileChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
