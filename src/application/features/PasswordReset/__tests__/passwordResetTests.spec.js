import PasswordReset from '../index';
import PasswordResetHelper from '../../../helpers/PasswordResetHelper';
import { mockReq } from '../../../../__tests__/__mocks__';
import notifications from '../../../notifications';
import krypter from '../../../helpers/krypter';
import services from '../../../services';

const { StaffService } = services;

jest.spyOn(krypter, 'authenticationEncryption').mockImplementation(() => 'someToken');


describe('PasswordReset', () => {
  beforeAll(() => {
    process.env = Object.assign(process.env, { RESET_SECRET: 'resetsecret' });
  });

  describe('Forgot password', () => {
    it('should fail if staff does not exist', async () => {
      jest.spyOn(StaffService, 'findStaffByStaffIdOrEmail').mockResolvedValue(null);
      jest.spyOn(notifications, 'emit');

      const [statusCode, message] = await PasswordReset
        .forgotPassword(mockReq);

      expect(statusCode).toBe(404);
      expect(message).toBe('Staff does not exist');
    });
  });

  describe('Confirm Password Reset Request tests', () => {
    it('should fail if reset password hash is not in the link', async () => {
      jest.spyOn(krypter, 'decryptCryptrHash').mockImplementation(() => 'wrongSecret someId');

      const [statusCode, message] = await PasswordReset
        .confirmPasswordResetRequest(mockReq);

      expect(statusCode).toBe(403);
      expect(message).toBe('Decryption failed!');
    });

    it('should successfully confirm password reset request after decrypting hash', async () => {
      jest.spyOn(krypter, 'decryptCryptrHash').mockImplementation(() => 'resetsecret someId');

      const [statusCode, message] = await PasswordReset
        .confirmPasswordResetRequest(mockReq);

      expect(statusCode).toBe(200);
      expect(message).toBe('Decryption successful!');
    });

    it('should fail if reset password hash is Invalid', async () => {
      const request = { ...mockReq };
      delete request.query.hash;
      const [statusCode, message] = await PasswordReset
        .confirmPasswordResetRequest(request);
      expect(statusCode).toBe(403);
      expect(message).toBe('Invalid reset link');
    });
  });

  describe('Reset password tests', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should fail if request is invalid', async () => {
      jest.spyOn(PasswordResetHelper, 'findAndValidateResetRequest')
        .mockImplementation(() => [403, 'invalid']);

      const [statusCode, message] = await PasswordReset
        .resetPassword(mockReq);

      expect(statusCode).toBe(403);
      expect(message).toBe('invalid');
    });

    it('should reset password successfully', async () => {
      jest.spyOn(PasswordResetHelper, 'findAndValidateResetRequest')
        .mockImplementation(() => [200, 'valid']);
      jest.spyOn(StaffService, 'updateStaffInfo')
        .mockReturnValue(true);

      const [statusCode, message] = await PasswordReset
        .resetPassword(mockReq);
      expect(statusCode).toBe(200);
      expect(message).toBe('Password reset successful!');
    });

    it('should respond with status 500 if new password was not saved', async () => {
      jest.spyOn(PasswordResetHelper, 'findAndValidateResetRequest')
        .mockImplementation(() => [200, 'valid']);
      jest.spyOn(StaffService, 'updateStaffInfo')
        .mockReturnValue(false);

      const [statusCode, message] = await PasswordReset.resetPassword(mockReq);
      expect(statusCode).toBe(500);
      expect(message).toBe('Password reset unsuccessful!');
    });

    it('should throw an exception if an error occurs', async () => {
      jest.spyOn(PasswordResetHelper, 'findAndValidateResetRequest')
        .mockImplementation(() => [200, 'valid']);
      jest.spyOn(StaffService, 'updateStaffInfo').mockRejectedValue('failed');

      const [statusCode, message] = await PasswordReset
        .resetPassword(mockReq);
      expect(statusCode).toBe(500);
      expect(message).toBe('An error occured ERR500PSWRST');
    });
  });
});
