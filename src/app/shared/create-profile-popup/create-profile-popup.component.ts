import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { UploadedFileInfoModel } from 'src/app/models/uploaded-file-info.model';
import { CustomToastrService } from 'src/app/services/custom-toastr.service';
import { ProfilesService } from 'src/app/services/profiles.service';
import { TokenManagerService } from 'src/app/services/token-manager.service';

@Component({
  selector: 'app-create-profile-popup',
  templateUrl: './create-profile-popup.component.html',
  styleUrls: ['./create-profile-popup.component.css']
})
export class CreateProfilePopupComponent {
  @Output() refreshParent = new EventEmitter<any>();
  @Input() public inputObjectID: string;
  @Input() public inputObjectType: string;
  public createprofilesForm: FormGroup;
  objectType: string;
  objectID: string;
  loggedinUserID: string;
  resumeInfo = {
    originalFileName: "",
    docURL: "",
    docSize: 0
  }
  constructor(public activeModal: NgbActiveModal,
    public profiles: ProfilesService,
    private formBuilder: FormBuilder,
    private tokenService: TokenManagerService,
    private toastr: CustomToastrService,
    private translate: TranslateService
    ) {

    this.createprofilesForm = this.formBuilder.group({
      candidateFirstName: ['', [Validators.required, Validators.maxLength(100)]],
      candidateLastName: ['', [Validators.required, Validators.maxLength(100)]],
      candidateEmailID: ['',[Validators.required, Validators.email]],
      candidatePhoneNo: ['',[Validators.required,Validators.maxLength(12)]],
      yearOfExperience: ['', [Validators.required, Validators.maxLength(2)]],
      currentSalary: ['', [Validators.required]],
      currencyCode: ['',Validators.required],
      keySkills: ['',Validators.required]
    });
    this.loggedinUserID = this.tokenService.currentUser.userID;

  }

  get candidateFirstName() { return this.createprofilesForm.get("candidateFirstName"); }
  get candidateLastName() { return this.createprofilesForm.get("candidateLastName"); }
  get candidateEmailID() { return this.createprofilesForm.get("candidateEmailID"); }
  get candidatePhoneNo() { return this.createprofilesForm.get("candidatePhoneNo"); }
  get yearOfExperience() { return this.createprofilesForm.get("yearOfExperience"); }
  get currentSalary() { return this.createprofilesForm.get("currentSalary"); }
  get currencyCode() { return this.createprofilesForm.get("currencyCode"); }
  get keySkills() { return this.createprofilesForm.get("keySkills"); }

  ngOnInit(): void {
    this.objectType = this.inputObjectType;
    this.objectID = this.inputObjectID;
  }

  onSubmit() {
    if (!this.resumeInfo.docURL) {
      this.toastr.error("Please upload resume");
      return;
    }
    let payload = this.createprofilesForm.value;
    payload["resume"] = this.resumeInfo;

    this.profiles.addProfile(this.objectID, this.createprofilesForm.value).subscribe((res: any) => {
      this.refreshParent.emit(true);
      this.toastr.success("Profile added sucessfully");
      this.activeModal.close('Override click');
    });

  }

  onFileUploaded(uploadedFileInfo: UploadedFileInfoModel) {
    this.resumeInfo.docSize = uploadedFileInfo.fileSize;
    this.resumeInfo.docURL = uploadedFileInfo.savedUrl;
    this.resumeInfo.originalFileName = uploadedFileInfo.originalName;
  }
}
