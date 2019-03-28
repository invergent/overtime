import PasswordResetService from '../PasswordResetService';
import models from '../../../../../Database/models';

const { PasswordResetRequest } = models;

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

  describe('updateOrInsertResetRequest tests', () => {
    it('should update or insert reset request.', async () => {
      const upsert = jest.spyOn(PasswordResetRequest, 'upsert').mockResolvedValue({});
      await PasswordResetService.updateOrInsertResetRequest('INIT', 'staffId');
      expect(upsert).toHaveBeenCalled();
    });
  });
});
