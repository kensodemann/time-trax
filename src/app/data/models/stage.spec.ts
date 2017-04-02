/* tslint:disable:no-unused-variable */

import { Stage } from './stage';

describe('Stage', () => {
  it('can be constructed', () => {
    const stage = new Stage();
    expect(stage).toBeTruthy();
  });

  it('copies data when constructed from an object', () => {
    const stage = new Stage({
      _id: '42',
      stageNumber: 4,
      name: 'Coding',
      bogus: 'you should not see me'
    });
    expect(stage._id).toEqual('42');
    expect(stage.stageNumber).toEqual(4);
    expect(stage.name).toEqual('Coding');
    expect((stage as any).bogus).toBeUndefined();
  });
});
