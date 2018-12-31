import signin from '../index';

describe('Signin Unit test', () => {
  it('should throw a catch error if an execution error occurs', () => {
    const err = { error: 'that did not work' };
    const req = { body: { staffId: 'someId', password: 'someValue' } };
    const res = {};
    const models = { Staff: { findOne: jest.fn(() => Promise.reject(err)) } };

    try {
      signin(req, res, models);
    } catch (e) {
      expect(e).toEqual(Promise.reject(err));
    }
  });
});
