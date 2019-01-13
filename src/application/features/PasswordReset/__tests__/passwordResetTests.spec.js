import PasswordReset from '../index';
import PasswordResetHelper from '../../../helpers/PasswordResetHelper';
import { req } from '../../../../__tests__/__mocks__';
import models from '../../../../tenants/vla/models';
import krypter from '../../../helpers/krypter';

const { Staff } = models;

jest.mock('../../../helpers/Mailer');
krypter.authenticationEncryption = jest.fn(() => 'someToken');


describe('PasswordReset', () => {
  beforeAll(() => {
    process.env = Object.assign(process.env, { RESET_SECRET: 'resetsecret' });
  });

  describe('Forgot password', () => {
    it('should fail if staff does not exist', async () => {
      Staff.findOne = jest.fn(() => Promise.resolve(null));

      const [statusCode, message] = await PasswordReset
        .forgotPassword(req, models, 'someClient');

      expect(statusCode).toBe(404);
      expect(message).toBe('Staff does not exist');
    });
  });

  describe('Confirm Password Reset Request tests', () => {
    it('should fail if reset password hash is not in the link', async () => {
      krypter.decryptCryptrHash = jest.fn(() => 'wrongSecret someId');
      const [statusCode, message] = await PasswordReset
        .confirmPasswordResetRequest(req);
      expect(statusCode).toBe(403);
      expect(message).toBe('Decryption failed!');
    });

    it('should successfully confirm password reset request after decrypting hash', async () => {
      krypter.decryptCryptrHash = jest.fn(() => 'resetsecret someId');
      const [statusCode, message] = await PasswordReset
        .confirmPasswordResetRequest(req);
      expect(statusCode).toBe(200);
      expect(message).toBe('Decryption successful!');
    });

    it('should fail if reset password hash is Invalid', async () => {
      const request = { ...req };
      delete request.query.hash;
      const [statusCode, message] = await PasswordReset
        .confirmPasswordResetRequest(request);
      expect(statusCode).toBe(403);
      expect(message).toBe('Invalid reset link');
    });
  });

  describe('Reset password tests', () => {
    it('should fail if request is invalid', async () => {
      PasswordResetHelper.findAndValidateResetRequest = jest.fn(() => [403, 'invalid']);

      const [statusCode, message] = await PasswordReset
        .resetPassword(req, models);
      expect(statusCode).toBe(403);
      expect(message).toBe('invalid');
    });

    it('should reset password successfully', async () => {
      jest.resetAllMocks();
      PasswordResetHelper.findAndValidateResetRequest = jest.fn(() => [200, 'valid']);
      PasswordResetHelper.processPasswordReset = jest.fn(() => [200, 'valid']);

      const [statusCode, message] = await PasswordReset
        .resetPassword(req, models);
      expect(statusCode).toBe(200);
      expect(message).toBe('valid');
    });

    it('should throw an exception if an error occurs', async () => {
      jest.resetAllMocks();
      const err = 'failed';
      PasswordResetHelper.findAndValidateResetRequest = jest.fn(() => [200, 'valid']);
      PasswordResetHelper.processPasswordReset = jest.fn(() => Promise.reject(err));

      const [statusCode, message] = await PasswordReset
        .resetPassword(req, models);
      expect(statusCode).toBe(500);
      expect(message).toBe('An error occured ERR500PSWRST');
    });
  });
});
