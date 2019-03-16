import helpers from '../helpers';
import { templateNames, roleNames } from '../utils/types';

const { Mailer, EmailNotificationsHelpers, PasswordResetHelper } = helpers;

class EmailNotifications {
  static async sendNotificationEmail(tenant, staff, emailTemplateName, hashedToken) {
    const email = await EmailNotificationsHelpers.createEmail(
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

  static sendLineManagerNotifications(tenant, staff, lineManagerRole) {
    const [hashedToken, emailTemplateName] = EmailNotificationsHelpers
      .createLineManagerEmailDetails(staff, lineManagerRole);
    return EmailNotifications.sendNotificationEmail(tenant, staff, emailTemplateName, hashedToken);
  }

  static sendStaffNotifications(tenant, staff, lineManagerRole, notificationType) {
    const emailTemplateName = EmailNotificationsHelpers.staffEmailTemplateName(
      lineManagerRole, notificationType
    );
    return EmailNotifications.sendNotificationEmail(tenant, staff, emailTemplateName);
  }

  static notifySupervisorOfNewClaim(tenant, staff) {
    EmailNotifications.sendLineManagerNotifications(tenant, staff, roleNames.Supervisor);
  }

  static notifyBSMSupervisorApproved(tenant, staff) {
    EmailNotifications.sendLineManagerNotifications(tenant, staff, roleNames.Bsm);
  }

  static notifyStaffOfClaimSubmission(tenant, staff) {
    EmailNotifications.sendStaffNotifications(tenant, staff);
  }

  static notifyStaffSupervisorApproved(tenant, staff, lineManagerRole) {
    EmailNotifications.sendStaffNotifications(tenant, staff, lineManagerRole, 'Approved');
  }

  static notifyStaffBSMApproved(tenant, staff, lineManagerRole) {
    EmailNotifications.sendStaffNotifications(tenant, staff, lineManagerRole, 'Approved');
  }

  static notifyStaffSupervisorDeclined(tenant, staff, lineManagerRole) {
    EmailNotifications.sendStaffNotifications(tenant, staff, lineManagerRole, 'Declined');
  }

  static notifyStaffBSMDeclined(tenant, staff, lineManagerRole) {
    EmailNotifications.sendStaffNotifications(tenant, staff, lineManagerRole, 'Declined');
  }

  static notifyStaffCancelled(tenant, staff, lineManagerRole) {
    EmailNotifications.sendStaffNotifications(tenant, staff, lineManagerRole, 'Cancelled');
  }

  static sendEmail(tenant, email) {
    const mailer = new Mailer(tenant);
    return mailer.send(email);
  }
}

export default EmailNotifications;
