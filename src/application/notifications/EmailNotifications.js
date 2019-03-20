import helpers from '../helpers';
import { templateNames, roleNames } from '../utils/types';

const { Mailer, NotificationsHelpers, PasswordResetHelper } = helpers;

class EmailNotifications {
  static async sendNotificationEmail(tenant, staff, emailTemplateName, hashedToken) {
    const email = await NotificationsHelpers.createEmail(
      tenant, staff, emailTemplateName, hashedToken
    );
    return EmailNotifications.sendEmail(tenant, email);
  }

  static async sendPasswordResetEmail(tenant, staff) {
    const { staffId } = staff;
    const passwordResetHash = PasswordResetHelper.createAndSaveResetHash(tenant, staffId);
    return EmailNotifications.sendNotificationEmail(
      tenant, staff, templateNames.Reset, passwordResetHash
    );
  }

  static sendLineManagerNotifications(data) {
    const { tenant, staff, lineManagerRole } = data;
    const [hashedToken, emailTemplateName] = NotificationsHelpers
      .createLineManagerEmailDetails(staff, lineManagerRole);
    return EmailNotifications.sendNotificationEmail(tenant, staff, emailTemplateName, hashedToken);
  }

  static sendStaffNotifications(data, notificationType) {
    const { tenant, staff, lineManagerRole } = data;
    const emailTemplateName = NotificationsHelpers.staffEmailTemplateName(
      lineManagerRole, notificationType
    );
    return EmailNotifications.sendNotificationEmail(tenant, staff, emailTemplateName);
  }

  static notifySupervisorOfNewClaim(data) {
    EmailNotifications.sendLineManagerNotifications(data);
  }

  static notifyBSMSupervisorApproved(data) {
    data.lineManagerRole = roleNames.Bsm; // set lineManager role to BSM to notify BSM
    EmailNotifications.sendLineManagerNotifications(data);
  }

  static notifyStaffOfClaimSubmission(data) {
    EmailNotifications.sendStaffNotifications(data);
  }

  static notifyStaffSupervisorApproved(data) {
    EmailNotifications.sendStaffNotifications(data, 'Approved');
  }

  static notifyStaffBSMApproved(data) {
    EmailNotifications.sendStaffNotifications(data, 'Approved');
  }

  static notifyStaffSupervisorDeclined(data) {
    EmailNotifications.sendStaffNotifications(data, 'Declined');
  }

  static notifyStaffBSMDeclined(data) {
    EmailNotifications.sendStaffNotifications(data, 'Declined');
  }

  static notifyStaffCancelled(data) {
    EmailNotifications.sendStaffNotifications(data, 'Cancelled');
  }

  static sendEmail(tenant, email) {
    const mailer = new Mailer(tenant);
    return mailer.send(email);
  }
}

export default EmailNotifications;
