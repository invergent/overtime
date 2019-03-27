import EmailConstructor from '../EmailConstructor';
import EmailService from '../../../services/EmailService';
import { mockFilteredStaffWithPendingClaims } from '../../../../__tests__/__mocks__';

describe('EmailConstructor Unit test', () => {
  it('should create a new array of personalizeEmails', async () => {
    jest.spyOn(EmailService, 'fetchEmailTemplateByName').mockResolvedValue('failed');
    jest.spyOn(EmailConstructor, 'personalizeMessage').mockReturnValue('personalizeEmail');

    const emails = await EmailConstructor.createForMany('tenantRef', mockFilteredStaffWithPendingClaims, 'emailTemplateName');

    expect(emails.length).toEqual(mockFilteredStaffWithPendingClaims.length);
  });
});
