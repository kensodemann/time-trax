import { SimpleChange } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatchesDirective } from './matches.directive';

describe('MatchesDirective', () => {
  it('should create an instance', () => {
    const directive = new MatchesDirective();
    expect(directive).toBeTruthy();
  });

  describe('validate', () => {
    [{
      case: 'returns null for null value',
      value: null,
      compareToValue: 'somevalue',
      expectedResult: null
    }, {
      case: 'returns null for empty value',
      value: '',
      compareToValue: 'somevalue',
      expectedResult: null
    }, {
      case: 'returns null for null compare to value',
      value: 'somevalue',
      compareToValue: null,
      expectedResult: null
    }, {
      case: 'returns null for empty compare to value',
      value: 'somevalue',
      compareToValue: '',
      expectedResult: null
    }, {
      case: 'returns null for matching values',
      value: 'somevalue',
      compareToValue: 'somevalue',
      expectedResult: null
    }, {
      case: 'returns invalid for non-matching values',
      value: 'somevalue',
      compareToValue: 'someothervalue',
      expectedResult: { trxMatches: 'somevalue' }
    }].forEach((test) => {
      it(test.case, () => {
        const directive = new MatchesDirective();
        directive.trxMatches = test.compareToValue;
        const change = new SimpleChange(undefined, directive.trxMatches, true);
        directive.ngOnChanges({ trxMatches: change });
        const control = new FormControl();
        control.setValue(test.value);
        const result = directive.validate(control);
        expect(result).toEqual(test.expectedResult);
      });
    });

    it('handles a change to the compare to value', () => {
      const directive = new MatchesDirective();
      directive.trxMatches = 'startingValue';
      let change = new SimpleChange(undefined, directive.trxMatches, true);
      directive.ngOnChanges({ trxMatches: change });
      const control = new FormControl();
      control.setValue('startingValue');
      let result = directive.validate(control);
      expect(result).toEqual(null);

      directive.trxMatches = 'endingValue';
      change = new SimpleChange('startingValue', directive.trxMatches, false);
      directive.ngOnChanges({ trxMatches: change });
      result = directive.validate(control);
      expect(result).toEqual({ trxMatches: 'startingValue' });
    });
  });
});
