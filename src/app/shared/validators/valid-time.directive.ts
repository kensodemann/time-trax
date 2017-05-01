import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

export function timeFormatValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const dec = /^[+-]?\d*(\.\d+)?$/;
    const hrsMin = /^[+-]?\d*:[0-5][0-9]$/;

    return !control.value || hrsMin.test(control.value) || dec.test(control.value) ? null : { 'trxValidTime': control.value };
  };
}

@Directive({
  selector: '[trxValidTime]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ValidTimeDirective, multi: true }]
})
export class ValidTimeDirective implements Validator {
  private valFn = timeFormatValidator();

  constructor() { }

  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}
