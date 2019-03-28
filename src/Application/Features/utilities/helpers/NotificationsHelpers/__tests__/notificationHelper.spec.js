import NotificationsHelpers from '../NotificationsHelpers';
import EmailConstructor from '../../EmailConstructor';

describe('NotificationsHelpers Unit test', () => {
  it('should call method to create multiple emails', () => {
    const emailConstructorFn = jest.spyOn(EmailConstructor, 'createForMany').mockReturnValue('emails created');
    const templateNameFn = jest.spyOn(NotificationsHelpers, 'staffEmailTemplateName').mockReturnValue('template');

    const emails = NotificationsHelpers.createMultipleEmails('tenantRef', 'reciepients', 'notificationType');

    expect(emailConstructorFn).toHaveBeenCalled();
    expect(templateNameFn).toHaveBeenCalled();
    expect(emails).toBe('emails created');
  });
});
