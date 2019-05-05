import helpers from '../helpers';
import services from '../services';
import { templateNames, roleNames } from '../utils/types';

const {
  Mailer, NotificationsHelpers, PasswordResetHelper, ClaimHelpers
} = helpers;
const { ClaimService, ClaimApprovalHistoryService } = services;

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
    //a hack to avoid failure during email destructuring
    const newStaff = { ...staff, supervisor: {}, BSM: {} } 
    return EmailNotifications.sendNotificationEmail(
      tenantRef, newStaff, templateNames.Reset, passwordResetHash
    );
  }

  static sendLineManagerNotifications(data) {
    const { tenantRef, staff, lineManagerRole } = data;
    const [hashedToken, emailTemplateName] = NotificationsHelpers
      .createLineManagerEmailDetails(staff, lineManagerRole);

    const newStaff = {
      ...staff,
      lineManagerEmailAddress: staff[lineManagerRole].email
    };

    return EmailNotifications.sendNotificationEmail(tenantRef, newStaff, emailTemplateName, hashedToken);
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
    // if supervisor email address is set
    if (data.staff.supervisor.email) {
      const newData = { ...data, lineManagerRole: roleNames.supervisor };
      EmailNotifications.sendLineManagerNotifications(newData);
    }
  }

  static notifyBSMSupervisorApproved(data) {
    // if supervisor email address is set
    if (data.staff.BSM.email) {
      // set lineManager role to BSM to notify BSM
      const newData = { ...data, lineManagerRole: roleNames.BSM };
      EmailNotifications.sendLineManagerNotifications(newData);
    }
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

  static async notifyStaffCompleted(data) {
    const completedClaimsWithStaff = await ClaimService.fetchCompletedClaim(data.tenantRef, 'Completed');
    const filteredListOfStaff = ClaimHelpers.filterCompletedClaims(completedClaimsWithStaff);
    EmailNotifications.sendNotificationEmailToMany(data.tenantRef, filteredListOfStaff, 'Completed');

    // update completed claim histories
    ClaimApprovalHistoryService.createApprovalHistoryOnCompletion(filteredListOfStaff);
  }

  static sender(tenantRef, emails) {
    const mailer = new Mailer(tenantRef);
    if (Array.isArray(emails)) return mailer.sendToMany(emails);
    return mailer.send(emails);
  }
}

export default EmailNotifications;
