import { MillisecondsPipe } from './milliseconds.pipe';

describe('MillisecondsPipe', () => {
  it('exists', () => {
    const pipe = new MillisecondsPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns 0 for undefined', () => {
    const pipe = new MillisecondsPipe();
    expect(pipe.transform(undefined)).toEqual(0);
  });

  it('returns 0 for null', () => {
    const pipe = new MillisecondsPipe();
    expect(pipe.transform(null)).toEqual(0);
  });

  it('handles the HH:MM format', () => {
    const pipe = new MillisecondsPipe();
    expect(pipe.transform('1:45')).toEqual(6300000);
  });

  it('handles the HH.XY format', () => {
    const pipe = new MillisecondsPipe();
    expect(pipe.transform('1.45')).toEqual(5220000);
  });

  it('returns undefined for an invalid fractional value', () => {
    const pipe = new MillisecondsPipe();
    expect(pipe.transform('1:A0')).toEqual(undefined);
  });

  it('returns undefined for an invalid hours value', () => {
    const pipe = new MillisecondsPipe();
    expect(pipe.transform('B:45')).toEqual(undefined);
  });
});
