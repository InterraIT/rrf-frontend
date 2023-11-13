import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampConverter'
})
export class TimestampConverterPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) { }
  transform(timeStamp: any, args: string[]): string {
    
    var d = new Date(0);
    d.setUTCSeconds(parseInt(timeStamp, 10) / 1000);
    let diplayDate = this.datePipe.transform(d, args[0]);
    return diplayDate;
  }

  transformDate(timeStamp: any, format:string): string {
    var d = new Date(0);
    d.setUTCSeconds(parseInt(timeStamp, 10) / 1000);
    let diplayDate = this.datePipe.transform(d, format);
    return diplayDate;
  }

}
