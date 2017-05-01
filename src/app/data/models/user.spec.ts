import { User } from './user';

describe('User', () => {
  it('can be constructed', () => {
    const user = new User();
    expect(user).toBeTruthy();
  });

  it('copies data when constructed from an object', () => {
    const user = new User({
      _id: '42',
      username: 'dude',
      firstName: 'Big',
      lastName: 'Jimbo',
      isDefaultAdmin: false,
      roles: ['user', 'admin'],
      bogus: 'you should not see me'
    });
    expect(user._id).toEqual('42');
    expect(user.username).toEqual('dude');
    expect(user.firstName).toEqual('Big');
    expect(user.lastName).toEqual('Jimbo');
    expect(user.isDefaultAdmin).toEqual(false);
    expect(user.roles).toEqual(['user', 'admin']);
    expect((user as any).bogus).toBeUndefined();
  });

  describe('is authorized', () => {
    it('is false for a blank user', () => {
      const user = new User();
      expect(user.isAuthorized('admin')).toBeFalsy();
    });

    it('is true if the role is not specified', () => {
      let user = new User();
      expect(user.isAuthorized()).toBeTruthy();
      user = new User({
        _id: '42',
        username: 'dude',
        firstName: 'Big',
        lastName: 'Jimbo',
        isDefaultAdmin: false,
        roles: ['user', 'admin']
      });
      expect(user.isAuthorized()).toBeTruthy();
    });

    it('is true for a user that has the specified role', () => {
      const user = new User({
        _id: '42',
        username: 'dude',
        firstName: 'Big',
        lastName: 'Jimbo',
        isDefaultAdmin: false,
        roles: ['user', 'admin']
      });
      expect(user.isAuthorized('admin')).toBeTruthy();
    });

    it('is false for a user that does not have the specified role', () => {
      const user = new User({
        _id: '42',
        username: 'dude',
        firstName: 'Big',
        lastName: 'Jimbo',
        isDefaultAdmin: false,
        roles: ['user', 'admin']
      });
      expect(user.isAuthorized('hero')).toBeFalsy();
    });
  });
});
