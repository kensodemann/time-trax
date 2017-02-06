import { FormControl } from '@angular/forms';
import { ValidTimeDirective } from './valid-time.directive';

describe('ValidTimeDirective', () => {
  it('should create an instance', () => {
    const directive = new ValidTimeDirective();
    expect(directive).toBeTruthy();
  });

  describe('validate', () => {
    [{
      case: 'returns null for null',
      value: null,
      expectedResult: null
    }, {
      case: 'returns null for empty value',
      value: '',
      expectedResult: null
    }, {
      case: 'returns null for H:MM',
      value: '2:43',
      expectedResult: null
    }, {
      case: 'returns null for :MM',
      value: ':43',
      expectedResult: null
    }, {
      case: 'returns invalid time for missing minute digit',
      value: '2:4',
      expectedResult: { trxValidTime: '2:4' }
    }, {
      case: 'returns invalid time for bad minutes',
      value: '2:61',
      expectedResult: { trxValidTime: '2:61' }
    }, {
      case: 'returns null for H',
      value: '3',
      expectedResult: null
    }, {
      case: 'returns null for H.X',
      value: '8.5',
      expectedResult: null
    }, {
      case: 'returns null for H.XY',
      value: '8.75',
      expectedResult: null
    }, {
      case: 'returns invalid time for a letter in the mix',
      value: '8.a5',
      expectedResult: { trxValidTime: '8.a5' }
    }, {
      case: 'returns invalid time for an unexpected separator',
      value: '8;45',
      expectedResult: { trxValidTime: '8;45' }
    }].forEach((test) => {
      it(test.case, () => {
        const directive = new ValidTimeDirective();
        const control = new FormControl();
        control.setValue(test.value);
        const result = directive.validate(control);
        expect(result).toEqual(test.expectedResult);
      });
    });
  });
});
