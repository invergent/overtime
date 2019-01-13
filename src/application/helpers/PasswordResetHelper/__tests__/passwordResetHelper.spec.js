import bcrypt from 'bcrypt';
import PasswordResetHelper from '../PasswordResetHelper';
import EmailConstructor from '../../EmailConstructor';
import models from '../../../../tenants/vla/models';
import {
  req, mockStaff
} from '../../../../__tests__/__mocks__';

jest.mock('../../krypter', () => ({
  authenticationEncryption: jest.fn(() => 'someToken')
}));

describe('PasswordResetHelper', () => {
  describe('findAndValidateResetRequest tests', () => {
    it('should validate password reset request as expired if it has already been treated', async () => {
      const PasswordResetRequest = { findOne: jest.fn() };

      const [statusCode, message] = await PasswordResetHelper
        .findAndValidateResetRequest(req.currentStaffId, req.query.hash, PasswordResetRequest);

      expect(statusCode).toBe(404);
      expect(message).toBe('Reset link is expired');
    });

    it('should validate password reset request as invalid if hash is incorrect', async () => {
      const passwordResetHash = 'correctHash';
      const PasswordResetRequest = {
        findOne: jest.fn(() => ({ passwordResetHash }))
      };

      const [statusCode, message] = await PasswordResetHelper
        .findAndValidateResetRequest(req.currentStaffId, 'incorrectHash', PasswordResetRequest);

      expect(statusCode).toBe(403);
      expect(message).toBe('Reset link is invalid');
    });

    it('should validate password reset request as valid and delete it from DB', async () => {
      const passwordResetHash = 'correctHash';
      const PasswordResetRequest = {
        findOne: jest.fn(() => ({ passwordResetHash })),
        destroy: jest.fn()
      };

      const [statusCode, message] = await PasswordResetHelper
        .findAndValidateResetRequest(req.currentStaffId, passwordResetHash, PasswordResetRequest);

      expect(statusCode).toBe(200);
      expect(message).toBe('valid');
    });
  });

  describe('processPasswordReset tests', () => {
    it('should reset password successfully', async () => {
      bcrypt.hashSync = jest.fn();
      const Staff = { update: jest.fn() };

      const [statusCode, message] = await PasswordResetHelper
        .processPasswordReset(req.currentStaffId, mockStaff.password, Staff);

      expect(statusCode).toBe(200);
      expect(message).toBe('Password reset successful!');
    });
  });
});
