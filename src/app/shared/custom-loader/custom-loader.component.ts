import { ChangeDetectorRef, Component } from '@angular/core';
import { CustomLoaderService } from 'src/app/services/custom-loader.service';

@Component({
  selector: 'app-custom-loader',
  templateUrl: './custom-loader.component.html',
  styleUrls: ['./custom-loader.component.css']
})
export class CustomLoaderComponent {
  public showLoadingIndicator = false;
  constructor(
    private loaderService: CustomLoaderService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loaderService.loadingAction
      .subscribe((loadingState) => {
        this.showLoadingIndicator = loadingState;
        this.changeDetectorRef.detectChanges();
      });
  }
}
