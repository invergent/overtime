import PasswordResetHelper from '../PasswordResetHelper';
import services from '../../../services';
import krypter from '../../krypter';

const { PasswordResetService } = services;

describe('PasswordResetHelper', () => {
  describe('findAndValidateResetRequest tests', () => {
    it('should validate password reset request as expired if it has already been treated', async () => {
      jest.spyOn(PasswordResetService, 'fetchPasswordResetRequest').mockResolvedValue(null);

      const [statusCode, message] = await PasswordResetHelper
        .findAndValidateResetRequest('tenantRef', 'staffId');

      expect(statusCode).toBe(404);
      expect(message).toBe('Reset link is expired');
    });

    it('should validate password reset request as invalid if hash is incorrect', async () => {
      const data = { passwordResetHash: 'correctHash' };
      jest.spyOn(PasswordResetService, 'fetchPasswordResetRequest').mockResolvedValue(data);

      const [statusCode, message] = await PasswordResetHelper
        .findAndValidateResetRequest('tenantRef', 'staffId', 'incorrectHash');

      expect(statusCode).toBe(403);
      expect(message).toBe('Reset link is invalid');
    });

    it('should validate password reset request as valid and delete it from DB', async () => {
      const data = { passwordResetHash: 'correctHash' };
      jest.spyOn(PasswordResetService, 'fetchPasswordResetRequest').mockResolvedValue(data);
      const deleteTreatedRequest = jest.spyOn(PasswordResetService, 'deletePasswordResetRequest')
        .mockResolvedValue({});

      const [statusCode, message] = await PasswordResetHelper
        .findAndValidateResetRequest('tenantRef', 'staffId', 'correctHash');

      expect(statusCode).toBe(200);
      expect(message).toBe('valid');
      expect(deleteTreatedRequest).toHaveBeenCalled();
    });
  });

  describe('createAndSaveResetHash tests', () => {
    it('should create and save password reset hash', async () => {
      jest.spyOn(krypter, 'createCryptrHash').mockReturnValue('passwordResetHash');
      const update = jest.spyOn(PasswordResetService, 'updateOrInsertResetRequest').mockResolvedValue(null);

      const hash = await PasswordResetHelper.createAndSaveResetHash('tenantRef', 'staffId');

      expect(hash).toBe('passwordResetHash');
      expect(update).toHaveBeenCalled();
    });
  });
});
