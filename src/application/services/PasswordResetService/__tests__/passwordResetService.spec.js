import PasswordResetService from '../PasswordResetService';
import tenantsModels from '../../../database/tenantsModels';

const { PasswordResetRequest } = tenantsModels.INIT;

describe('PasswordResetService Unit tests', () => {
  describe('fetchPasswordResetRequest tests', () => {
    it('should fetch PasswordResetRequest', async () => {
      const fetch = jest.spyOn(PasswordResetRequest, 'findOne').mockResolvedValue({});
      await PasswordResetService.fetchPasswordResetRequest('INIT', 'staffId');
      expect(fetch).toHaveBeenCalled();
    });
  });

  describe('deletePasswordResetRequest tests', () => {
    it('should remove a PasswordResetRequest that has been treated.', async () => {
      const destroy = jest.spyOn(PasswordResetRequest, 'destroy').mockResolvedValue({});
      await PasswordResetService.deletePasswordResetRequest('INIT', 'staffId');
      expect(destroy).toHaveBeenCalled();
    });
  });
});
