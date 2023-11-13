import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { switchMap } from 'rxjs';
import { UploadedFileInfoModel } from 'src/app/models/uploaded-file-info.model';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { LookupService } from 'src/app/services/lookup.service';

@Component({
  selector: 'app-single-file-uploader',
  templateUrl: './single-file-uploader.component.html',
  styleUrls: ['./single-file-uploader.component.css']
})
export class SingleFileUploaderComponent {
  @Input() public objectType: string;
  @Input() public objectID: string;
  @Input() public loggedinUserID: string;
  @Output() fileUploaded = new EventEmitter<UploadedFileInfoModel>();

  uploadedFile: any = null;
  constructor(private toastr: CustomToastrService,private lookupService:LookupService) {

  }
  /**
     * on file drop handler
     */
  onFileDropped(event: any) {
   // this.prepareFilesList(files);
  }
  /**
   * handle file from browsing
   */
  fileBrowseHandler(event: any) {
    this.prepareFilesList(event.target?.files);
  }

  prepareFilesList(files: Array<any>):boolean {
    let supportedTypeList = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    for (const item of files) {
      if (!item || supportedTypeList.indexOf(item.type) < 0) {
        let message = "Selected file type not allowed";
        this.toastr.error(message);
        return false;
      }

      item.progress = 0;
      this.uploadedFile = item;
    }
    this.uploadFile();
    return true;
  }

  private uploadFile():void{
    let uploadedFileInfo = new UploadedFileInfoModel();
    uploadedFileInfo.originalName = this.uploadedFile?.name;
    uploadedFileInfo.fileSize = Math.round(this.uploadedFile?.size / 1024); 

    this.lookupService.getSignedUploadUrl(this.objectID, this.objectType, this.loggedinUserID, this.uploadedFile?.name).pipe(
      switchMap((response: any) => {
        let splitParts = response.uploadUrl.split('?');
        uploadedFileInfo.savedUrl = splitParts[0];
        return this.lookupService.uploadFileWithProgrss(this.uploadedFile, response.uploadUrl);
      })

    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.uploadedFile.progress = 5;
          break;
        case HttpEventType.UploadProgress:
          this.uploadedFile.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.uploadedFile.progress = 100;
          uploadedFileInfo.status = 0;
          this.fileUploaded.emit(uploadedFileInfo);
      }

    }, (error: any) => {
      console.error(error);
      uploadedFileInfo.status = -1;
      this.fileUploaded.emit(uploadedFileInfo);
      this.toastr.error(error);
    });
  }

}
