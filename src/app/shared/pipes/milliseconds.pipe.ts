import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'milliseconds'
})
export class MillisecondsPipe implements PipeTransform {


  transform(value: string): number {
    if (!value) {
      return 0;
    }

    if (this.isNumberOfHours(value)) {
      return this.hoursToMilliseconds(Number(value));
    }

    if (this.isHoursMinutes(value)) {
      return this.hoursToMilliseconds(this.parseHoursMinutes(value));
    }

    return undefined;
  }

  private hoursToMilliseconds(n: number): number {
    return Math.round(n * 60 * 60 * 1000);
  }

  private isNumberOfHours(value: string): Boolean {
    return /^(\d+)?(\.\d+)?$/.test(value);
  }

  private isHoursMinutes(value: string): Boolean {
    return /^(\d+)?(:[0-5]\d)$/.test(value);
  }

  private parseHoursMinutes(value: string): number {
    const hoursMinutes = value.split(':');
    return Number(hoursMinutes[0]) + (Number(hoursMinutes[1]) / 60);
  }
}
