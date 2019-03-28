import sendgrid from '@sendgrid/mail';
import Mailer from '../Mailer';
import {
  mockEmail, mockFilteredStaffWithPendingClaims
} from '../../../../../../__tests__/__mocks__';

jest.mock('@sendgrid/mail');

describe('Mailer unit test', () => {
  const mailer = new Mailer('INIT');
  describe('Create', () => {
    it('should create email in line with sendgrid schema', () => {
      const result = mailer.create(mockEmail);

      expect(result).toHaveProperty('to');
      expect(result).toHaveProperty('from');
      expect(result).toHaveProperty('subject');
      expect(result).toHaveProperty('html');
    });
  });

  describe('sendToMany', () => {
    it('should send email to multiple users', () => {
      const mockSend = jest.spyOn(sendgrid, 'send').mockReturnValue('sent');

      mailer.sendToMany(mockFilteredStaffWithPendingClaims);

      expect(mockSend).toHaveBeenCalledTimes(3);
    });
  });
});
