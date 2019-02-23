import bcrypt from 'bcrypt';
import PasswordResetHelper from '../PasswordResetHelper';
import {
  mockReq, mockStaff
} from '../../../../__tests__/__mocks__';
import services from '../../../services';

const { PasswordResetService } = services;

jest.mock('../../krypter', () => ({
  authenticationEncryption: jest.fn(() => 'someToken')
}));

describe('PasswordResetHelper', () => {
  describe('findAndValidateResetRequest tests', () => {
    it('should validate password reset request as expired if it has already been treated', async () => {
      jest.spyOn(PasswordResetService, 'fetchPasswordResetRequest').mockResolvedValue(null);

      const [statusCode, message] = await PasswordResetHelper
        .findAndValidateResetRequest('tenant', 'staffId');

      expect(statusCode).toBe(404);
      expect(message).toBe('Reset link is expired');
    });

    it('should validate password reset request as invalid if hash is incorrect', async () => {
      const data = { passwordResetHash: 'correctHash' };
      jest.spyOn(PasswordResetService, 'fetchPasswordResetRequest').mockResolvedValue(data);

      const [statusCode, message] = await PasswordResetHelper
        .findAndValidateResetRequest('tenant', 'staffId', 'incorrectHash');

      expect(statusCode).toBe(403);
      expect(message).toBe('Reset link is invalid');
    });

    it('should validate password reset request as valid and delete it from DB', async () => {
      const data = { passwordResetHash: 'correctHash' };
      jest.spyOn(PasswordResetService, 'fetchPasswordResetRequest').mockResolvedValue(data);
      const deleteTreatedRequest = jest.spyOn(PasswordResetService, 'deletePasswordResetRequest')
        .mockResolvedValue({});

      const [statusCode, message] = await PasswordResetHelper
        .findAndValidateResetRequest('tenant', 'staffId', 'correctHash');

      expect(statusCode).toBe(200);
      expect(message).toBe('valid');
      expect(deleteTreatedRequest).toHaveBeenCalled();
    });
  });
});
