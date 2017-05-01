import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, Validators, ValidatorFn } from '@angular/forms';

export function matchesValidator(value: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return value && control.value && value !== control.value ? { trxMatches: control.value } : null;
  };
}

@Directive({
  selector: '[trxMatches]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchesDirective, multi: true }]
})
export class MatchesDirective implements OnChanges, Validator {
  @Input() trxMatches: string;
  private valFn = Validators.nullValidator;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.trxMatches) {
      this.valFn = matchesValidator(changes.trxMatches.currentValue);
    }
  }

  validate(control: AbstractControl): { [key: string]: any } {
    return this.valFn(control);
  }
}
