import signin from '../signin';
import models from '../../../../tenants/vla/models';
import {
  mockLoginCredentials, mockStaff
} from '../../../../__tests__/__mocks__';

jest.mock('../../../helpers/krypter', () => ({
  authenticationEncryption: jest.fn(() => 'someToken')
}));

const { Staff } = models;

describe('Signin Unit test', () => {
  it('should throw a catch error if an execution error occurs', async () => {
    const err = { error: 'that did not work' };
    const req = { body: { staffId: 'someId', password: 'someValue' } };
    const res = {};

    try {
      await signin(req, res, models);
    } catch (e) {
      expect(e).toEqual(Promise.reject(err));
    }
  });

  it('should identify a first time signin', async () => {
    Staff.findOne = jest.fn(() => Promise.resolve(mockStaff));

    const [statusCode, message, data] = await signin(mockLoginCredentials, models);

    expect(statusCode).toBe(200);
    expect(message).toBe('Login successful!');
    expect(data.firstSignin).toBe(true);
  });
});
