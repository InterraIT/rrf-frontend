import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomLoaderService } from './custom-loader.service';
import * as saveAs from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http: HttpClient,private loader: CustomLoaderService) { }
  getSignedUploadUrl(objectID: string, objectType: String, userID: string, fileName: string) {
    const url = `${environment.API}/lookup/getSignedUploadUrl?key=${fileName}&userID=${userID}&objectType=${objectType}&objectID=${objectID}`;
    return this.http.get(url);
  }

  downloadFile(fileUrl: string, originalFileName: string) {
    const url = `${environment.API}/lookup/getDirectDownloadSignedUrl?s3Url=${fileUrl}&originalFileName=${originalFileName}`;
    this.loader.show();
    this.http.get(url).subscribe((resp: any) => {
      let signedUrl = resp.data.url;

      this.http.get(signedUrl, { responseType: "blob" })
        .subscribe(blob => {
          this.loader.hide();
          saveAs(blob, originalFileName);
        });
        
    }, (error: any) => {
      this.loader.hide();
    });
  }


  uploadFileWithProgrss(fileToUpload: File, uploadUrl: string) {
    const formData: FormData = new FormData();
    formData.append('doc_file', fileToUpload, fileToUpload.name);

    const headers = new HttpHeaders({
      'Content-Type':'application/octet-stream'
    });
    
    return this.http.put(uploadUrl, fileToUpload, {
      reportProgress: true,
      responseType: "blob",
      observe: 'events'
    });
  }

  getHiringRequirments() {
    const url = `${environment.API}/lookup/getHiringRequirments`;
    return this.http.get(url);
  }
}
