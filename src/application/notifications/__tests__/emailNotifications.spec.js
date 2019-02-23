import EmailNotifications from '../EmailNotifications';
import helpers from '../../helpers';
import { generalNames } from '../../utils/types';
import {
  mockReq, mockStaff
} from '../../../__tests__/__mocks__';

const { EmailNotificationsHelpers, PasswordResetHelper } = helpers;

describe('Notifications Unit tests', () => {
  describe('EmailNotifications', () => {
    it('should send Reset password email', async () => {
      const passwordResetHash = 'passwordResetHash';
      const email = { someProp: 'someValue' };
      const { tenant } = mockReq;
      const { staffId } = mockStaff;

      const createHash = jest.spyOn(PasswordResetHelper, 'createAndSaveResetHash')
        .mockReturnValue(passwordResetHash);
      const createEmail = jest.spyOn(EmailNotificationsHelpers, 'createEmail')
        .mockReturnValue(email);
      const sendEmail = jest.spyOn(EmailNotifications, 'sendEmail');

      await EmailNotifications.sendPasswordResetEmail(tenant, mockStaff);

      expect(createHash).toHaveBeenCalledWith(tenant, staffId);
      expect(createEmail).toHaveBeenCalledWith(tenant, mockStaff, passwordResetHash, generalNames.Reset);
      expect(sendEmail).toHaveBeenCalledWith(tenant, email);
    });
  });
});
