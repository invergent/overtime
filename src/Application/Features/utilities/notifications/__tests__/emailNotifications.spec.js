import EmailNotifications from '../EmailNotifications';
import helpers from '../../helpers';
import { templateNames } from '../../utils/types';
import { tenantsInfo } from '../../utils/general';
import {
  mockReq, mockStaff
} from '../../../../../__tests__/__mocks__';


jest.mock('@sendgrid/mail', () => () => ({
  setApiKey: () => {},
  send: () => {}
}));
jest.mock('../../helpers/Mailer', () => () => ({
  send: value => value,
  sendToMany: value => value
}));

const { PasswordResetHelper, NotificationsHelpers } = helpers;

describe('Notifications Unit tests', () => {
  tenantsInfo.INIT = { emailAddress: 'someEmailAddress' };

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

      const result = EmailNotifications.sender(tenant, email);

      expect(result).toEqual(email);
    });

    it('should NOT send an email to line manager is staff\'s lineManager is not set', async () => {
      const sendToLineManager = jest.spyOn(EmailNotifications, 'sendLineManagerNotifications');
      const data = { staff: { supervisor: { email: null }, BSM: { email: null } } };

      EmailNotifications.notifySupervisorOfNewClaim(data);
      EmailNotifications.notifyBSMSupervisorApproved(data);

      expect(sendToLineManager).not.toHaveBeenCalled();
    });

    it('should send multiple emails', async () => {
      const { tenant } = mockReq;
      const emails = ['email content one', 'email content two'];

      const result = EmailNotifications.sender(tenant, emails);

      expect(result).toEqual(emails);
    });

    it('should call functions for creating and sending emails respectively', async () => {
      const createEmailsFn = jest.spyOn(NotificationsHelpers, 'createMultipleEmails').mockReturnValue('emails');
      const sendEmailFn = jest.spyOn(EmailNotifications, 'sender').mockReturnValue('email sent');

      const result = await EmailNotifications.sendNotificationEmailToMany('tenantRef', 'reciepients', 'another');

      expect(result).toEqual('email sent');
      expect(createEmailsFn).toHaveBeenCalled();
      expect(sendEmailFn).toHaveBeenCalled();
    });

    it('should call sendNotificationEmailToMany method', () => {
      const sendEmailFn = jest.spyOn(EmailNotifications, 'sendNotificationEmailToMany')
        .mockReturnValue('email sent');

      EmailNotifications.remindStaffOfPendingClaim('tenantRef', 'listOfStaff');

      expect(sendEmailFn).toHaveBeenCalled();
    });
  });
});
