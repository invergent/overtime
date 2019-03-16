import sendgrid from '@sendgrid/mail';
import Mailer from '../Mailer';
import { mockEmail } from '../../../../__tests__/__mocks__';

// jest.mock('@sendgrid/mail', () => ({
//   setApiKey: () => {},
//   send: () => {}
// }));

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

  describe('Create', () => {
    it('should create email in line with sendgrid schema', () => {
      jest.spyOn(sendgrid, 'setApiKey').mockReturnValue({});
      const mockSend = jest.spyOn(sendgrid, 'send').mockReturnValue('sent');
      jest.spyOn(mailer, 'create').mockReturnValue({});

      const result = mailer.send(mockEmail);

      expect(result).toEqual('sent');
      expect(mockSend).toHaveBeenCalled();
    });
  });
});
