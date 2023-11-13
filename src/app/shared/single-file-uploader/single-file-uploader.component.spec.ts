import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFileUploaderComponent } from './single-file-uploader.component';

describe('SingleFileUploaderComponent', () => {
  let component: SingleFileUploaderComponent;
  let fixture: ComponentFixture<SingleFileUploaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleFileUploaderComponent]
    });
    fixture = TestBed.createComponent(SingleFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
