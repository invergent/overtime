import Mailer from '../Mailer';
import { mockEmail } from '../../../../__tests__/__mocks__';

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

  describe('Create', () => {
    it('should create email in line with sendgrid schema', () => {
      jest.spyOn(mailer, 'create');

      const result = mailer.send(mockEmail);

      expect(result).toEqual();
    });
  });
});
