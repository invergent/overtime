import helpers from '../helpers';
import { generalNames } from '../utils/types';

const {
  Mailer, krypter, EmailNotificationsHelpers, PasswordResetHelper
} = helpers;

class EmailNotifications {
  static async sendPasswordResetEmail(tenant, staff) {
    const { staffId } = staff;

    const passwordResetHash = PasswordResetHelper.createAndSaveResetHash(tenant, staffId);

    const email = await EmailNotificationsHelpers.createEmail(
      tenant, staff, passwordResetHash, generalNames.Reset
    );

    EmailNotifications.sendEmail(tenant, email);
  }

  static async sendLineManagerEmail(tenant, staff, lineManagerRole) {
    const emailTemplateName = lineManagerRole === generalNames.Bsm
      ? generalNames.NewClaimBSM : generalNames.NewClaimSupervisor;
    const lineManagerId = lineManagerRole === generalNames.Bsm
      ? staff['BSM.lineManagerId'] : staff['supervisor.lineManagerId'];

    const payload = { lineManagerId, lineManagerRole };
    const hashedToken = krypter.authenticationEncryption('lineManager', payload);

    const email = await EmailNotificationsHelpers.createEmail(
      tenant, staff, hashedToken, emailTemplateName
    );

    return EmailNotifications.sendEmail(tenant, email);
  }

  static async NotifyLineManangersOfNewClaim(tenant, staff) {
    EmailNotifications.sendLineManagerEmail(tenant, staff, generalNames.Bsm);
    EmailNotifications.sendLineManagerEmail(tenant, staff, generalNames.Supervisor);
  }

  static sendEmail(tenant, email) {
    const mailer = new Mailer(tenant);
    mailer.send(email);
  }
}

export default EmailNotifications;
