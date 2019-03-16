import EmailNotifications from '../EmailNotifications';
import helpers from '../../helpers';
import { templateNames } from '../../utils/types';
import Mailer from '../../helpers/Mailer';
import {
  mockReq, mockStaff
} from '../../../__tests__/__mocks__';


jest.mock('../../helpers/Mailer', () => () => ({
  send: value => value
}));

const { PasswordResetHelper } = helpers;

describe('Notifications Unit tests', () => {
  describe('EmailNotifications', () => {
    it('should send Reset password email', async () => {
      const passwordResetHash = 'passwordResetHash';
      const { tenant } = mockReq;
      const { staffId } = mockStaff;

      const createHash = jest.spyOn(PasswordResetHelper, 'createAndSaveResetHash')
        .mockReturnValue(passwordResetHash);
      const sendEmail = jest.spyOn(EmailNotifications, 'sendNotificationEmail')
        .mockReturnValue(passwordResetHash);

      const result = await EmailNotifications.sendPasswordResetEmail(tenant, mockStaff);

      expect(createHash).toHaveBeenCalledWith(tenant, staffId);
      expect(sendEmail).toHaveBeenCalledWith(tenant, mockStaff, templateNames.Reset, passwordResetHash);
      expect(result).toEqual(passwordResetHash);
    });

    it('should send an email', async () => {
      const { tenant } = mockReq;
      const email = 'email content';

      const result = EmailNotifications.sendEmail(tenant, email);

      expect(result).toEqual(email);
    });
  });
});
