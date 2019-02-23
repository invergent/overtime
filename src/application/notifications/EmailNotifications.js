import helpers from '../helpers';
import types from '../utils/types';

const { Mailer, EmailConstructor, EmailNotificationsHelpers } = helpers;

class EmailNotifications {
  static async sendPasswordResetEmail(tenant, staff) {
    const { staffId } = staff;

    const passwordResetHash = EmailNotificationsHelpers.createAndSaveResetHash(tenant, staffId);

    const passwordResetDetails = { ...staff, passwordResetHash, emailTemplateName: types.Reset };
    const email = await EmailConstructor.create(tenant, passwordResetDetails);

    return EmailNotifications.sendEmail(tenant, email);
  }

  static sendEmail(tenant, email) {
    const mailer = new Mailer(tenant);
    mailer.send(email);
  }
}

export default EmailNotifications;
