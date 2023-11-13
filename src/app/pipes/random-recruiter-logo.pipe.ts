import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Pipe({
  name: 'randomRecruiterLogo'
})
export class RandomRecruiterLogoPipe implements PipeTransform 
{

  constructor(private _sanitizer: DomSanitizer) { }

  transform(value: any): SafeHtml
  {
    let first=value.firstName
    let second=value.lastName
    let data=first[0]+second[0]

    let termsApply = '';
    let background = this.generateRgb(value.userID);
    termsApply = `<span class="img" style="background-color: ${background};">${data.toUpperCase()}</span>`;
   
    return this._sanitizer.bypassSecurityTrustHtml(termsApply);

  }
  generateRgb = (name: string) => {
    const colorCodes = ["#AF004D", "#F4511E", "#0B8043", "#1976D2", "#8E24AA", "#2F383F", "#D81B60", "#EF6C00", "#009688", "#BA50D6", "#82888C", "#D50000", "#FAAF3C", "#33B679", "#7D5F91", "#913F00", "#E67C73", "#D6B83D", "#7CB342", "#41C3F3", "#B39DDB", "#B17343"];
    const hRange = [0, colorCodes.length - 1];
    const hash = this.getHashOfString(name);
    const l = this.normalizeHash(hash, hRange[0], hRange[1]);
    return colorCodes[l];
  };

  generateHSL = (name: string) => {
    const hRange = [0, 360];
    const sRange = this.getRange(85, 100);
    const lRange = this.getRange(10, 30);
    const hash = this.getHashOfString(name);
    const h = this.normalizeHash(hash, hRange[0], hRange[1]);
    const s = this.normalizeHash(hash, sRange[0], sRange[1]);
    const l = this.normalizeHash(hash, lRange[0], lRange[1]);
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  getRange = (value: number, range: number) => {
    return [Math.max(0, value - range), Math.min(value + range, 100)];
  }

  getHashOfString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
  };

  normalizeHash = (hash: number, min: number, max: number) => {
    return Math.floor((hash % (max - min)) + min);
  };

  getInitials = (businessName: string) => {
    let result = businessName.trim();
    if (businessName.length > 1) {
      let parts = businessName.split(/[\s-]+/);
      if (parts.length > 1) {
        result = parts[0].substr(0, 1) + parts[1].substr(0, 1);
      } else {
        result = businessName.substring(0, 2);
      }
    }
    return `${result.toUpperCase()}`
  }



}
