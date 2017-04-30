import { StagePipe } from './stage.pipe';
import { Stage } from '../../data/models/stage';

describe('StagePipe', () => {
  it('create an instance', () => {
    const pipe = new StagePipe();
    expect(pipe).toBeTruthy();
  });

  it('formats blank for undefined', () => {
    const pipe = new StagePipe();
    expect(pipe.transform(undefined)).toEqual('');
  });

  it('formats blank for null', () => {
    const pipe = new StagePipe();
    expect(pipe.transform(null)).toEqual('');
  });

  it('formats a stage properly', () => {
    const stage = new Stage({ stageNumber: 42, name: 'Answer Question' });
    const pipe = new StagePipe();
    expect(pipe.transform(stage)).toEqual('Answer Question [42]');
  });
});
