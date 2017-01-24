/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { HoursMinutesPipe } from './hours-minutes.pipe';

describe('HoursMinutesPipe', () => {
  it('create an instance', () => {
    const pipe = new HoursMinutesPipe();
    expect(pipe).toBeTruthy();
  });

  it('formats blank for undefined', () => {
    const pipe = new HoursMinutesPipe();
    expect(pipe.transform(undefined)).toEqual('');
  });

  it('formats blank for null', () => {
    const pipe = new HoursMinutesPipe();
    expect(pipe.transform(null)).toEqual('');
  });

  it('formats 0:00 for zero', () => {
    const pipe = new HoursMinutesPipe();
    expect(pipe.transform(0)).toEqual('0:00');
  });

  it('formats 0:00 for less than one minute', () => {
    const pipe = new HoursMinutesPipe();
    expect(pipe.transform(59995)).toEqual('0:00');
  });

  it('formats 0:01 for one minute', () => {
    const pipe = new HoursMinutesPipe();
    expect(pipe.transform(60000)).toEqual('0:01');
  });

  it('formats 1:00 for one hour', () => {
    const pipe = new HoursMinutesPipe();
    expect(pipe.transform(60000 * 60)).toEqual('1:00');
  });

  it('formats 1:01 for one hour and one minute', () => {
    const pipe = new HoursMinutesPipe();
    expect(pipe.transform(60000 * 61)).toEqual('1:01');
  });

  it('formats 1:11 for one hour eleven minutes', () => {
    const pipe = new HoursMinutesPipe();
    expect(pipe.transform(60000 * 71)).toEqual('1:11');
  });
});
