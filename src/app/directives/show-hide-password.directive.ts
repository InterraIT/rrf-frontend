import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowHidePassword]'
})
export class ShowHidePasswordDirective implements AfterViewInit, OnDestroy {

  private _passwordShown: boolean = false;
  private removeListner: () => void;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit():void {
    this.initialize();
  }
  ngOnDestroy(): void {
    this.removeListner();
  }

  initialize() {
    const parentElem = this.el.nativeElement.parentNode;
    const toggleElem = parentElem.querySelector('button');
    this.removeListner = this.renderer.listen(toggleElem, 'click', () => {
      this.togglePassword(toggleElem);
    });
  }

  togglePassword(toggleElem: Element) {
    this._passwordShown = !this._passwordShown;
    if (this._passwordShown) {
      this.el.nativeElement.setAttribute('type', 'text');
      toggleElem.querySelector('i').classList.value = 'fas fa-eye';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      toggleElem.querySelector('i').classList.value = 'fas fa-eye-slash';
    }
  }

}
