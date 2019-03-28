import helpers from '../helpers';
import { templateNames, roleNames } from '../utils/types';

const { Mailer, NotificationsHelpers, PasswordResetHelper } = helpers;

class EmailNotifications {
  static async sendNotificationEmail(tenantRef, staff, emailTemplateName, hashedToken) {
    const email = await NotificationsHelpers.createEmail(
      tenantRef, staff, emailTemplateName, hashedToken
    );
    return EmailNotifications.sender(tenantRef, email);
  }

  static async sendPasswordResetEmail(tenantRef, staff) {
    const { staffId } = staff;
    const passwordResetHash = PasswordResetHelper.createAndSaveResetHash(tenantRef, staffId);
    return EmailNotifications.sendNotificationEmail(
      tenantRef, staff, templateNames.Reset, passwordResetHash
    );
  }

  static sendLineManagerNotifications(data) {
    const { tenantRef, staff, lineManagerRole } = data;
    const [hashedToken, emailTemplateName] = NotificationsHelpers
      .createLineManagerEmailDetails(staff, lineManagerRole);
    return EmailNotifications.sendNotificationEmail(tenantRef, staff, emailTemplateName, hashedToken);
  }

  static sendStaffNotifications(data, notificationType) {
    const { tenantRef, staff, lineManagerRole } = data;
    const emailTemplateName = NotificationsHelpers.staffEmailTemplateName(
      lineManagerRole, notificationType
    );
    return EmailNotifications.sendNotificationEmail(tenantRef, staff, emailTemplateName);
  }

  static async sendNotificationEmailToMany(tenantRef, reciepients, notificationType) {
    const emails = await NotificationsHelpers.createMultipleEmails(
      tenantRef, reciepients, notificationType
    );
    return EmailNotifications.sender(tenantRef, emails);
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

  static remindStaffOfPendingClaim(tenantRef, listOfStaff) {
    EmailNotifications.sendNotificationEmailToMany(tenantRef, listOfStaff, 'Reminder');
  }

  static sender(tenantRef, emails) {
    const mailer = new Mailer(tenantRef);
    if (Array.isArray(emails)) return mailer.sendToMany(emails);
    return mailer.send(emails);
  }
}

export default EmailNotifications;
