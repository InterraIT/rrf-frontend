import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionProfileTabComponent } from './position-profile-tab.component';

describe('PositionProfileTabComponent', () => {
  let component: PositionProfileTabComponent;
  let fixture: ComponentFixture<PositionProfileTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PositionProfileTabComponent]
    });
    fixture = TestBed.createComponent(PositionProfileTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
