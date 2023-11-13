import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadProgressComponent } from './file-upload-progress.component';

describe('FileUploadProgressComponent', () => {
  let component: FileUploadProgressComponent;
  let fixture: ComponentFixture<FileUploadProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadProgressComponent]
    });
    fixture = TestBed.createComponent(FileUploadProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
