import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-file-upload-progress',
  templateUrl: './file-upload-progress.component.html',
  styleUrls: ['./file-upload-progress.component.css']
})
export class FileUploadProgressComponent {
  @Input() progress = 0;
  constructor() { }

  ngOnInit() { }


}
