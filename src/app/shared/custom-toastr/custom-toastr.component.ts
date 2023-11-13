import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-custom-toastr',
  templateUrl: './custom-toastr.component.html',
  styleUrls: ['./custom-toastr.component.css']
})
export class CustomToastrComponent implements OnDestroy{
  @Input() toastrData: any;
  @Output() closeAction = new EventEmitter<any>();
  setOpacity: number = 1;
  private toastrTimeout: any;
  constructor() { }

  closeToastr(): void {
    this.toastrTimeout = setTimeout(() => {
      this.closeAction.emit({});
    }, 30);
  }
  ngOnDestroy(): void{
    clearTimeout(this.toastrTimeout);
  }

}
