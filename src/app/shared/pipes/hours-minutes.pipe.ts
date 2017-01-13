import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hoursMinutes'
})
export class HoursMinutesPipe implements PipeTransform {

  transform(milliseconds: number): string {
    if (!milliseconds && milliseconds !== 0) {
      return '';
    }

    const hours = Math.floor(milliseconds / (60000 * 60));
    const minutes = Math.floor(milliseconds / 60000) - (hours * 60);

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

}
