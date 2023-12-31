import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent implements OnInit {
  @Output() onClose = new EventEmitter<any>();

  caption: string;
  title: string;
  confirmLabel: string = "YES";
  declineLabel: string = "NO";

  constructor(public activeModal: NgbActiveModal,) {
    
  }
  public ngOnInit(): void { }

  confirm() {
    this.onClose.emit(true);
    this.activeModal.close('Override click');
  }

  decline() {
    this.onClose.emit(false);
    this.activeModal.close('Override click');
  }

}
