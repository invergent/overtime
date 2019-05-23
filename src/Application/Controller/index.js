import '@babel/polyfill';
import features from '../Features';
import Responder from './Responder';

const {
  Authorisation, Branch, LineManager, PasswordReset, ChangePassword, Claim,
  exportDoc, Settings, Administration, Users, imageUpload, ProfileUpdate, Roles,
  Notifications
} = features;

class Controller {
  static async authoriseStaff(req, res) {
    return Responder.respondWithCookie(req, res, Authorisation.authoriseStaff);
  }

  static async authoriseAdmin(req, res) {
    return Responder.respondWithCookie(req, res, Authorisation.authoriseAdmin);
  }

  static async authoriseLineManager(req, res) {
    return Responder.respondWithCookie(req, res, Authorisation.authoriseLineManager);
  }

  static async updateBranch(req, res) {
    return Responder.respond(req, res, Branch.update);
  }

  static async addOrChangeLineManager(req, res) {
    return Responder.respond(req, res, LineManager.addOrChangeLineManager);
  }

  static async forgotPassword(req, res) {
    return Responder.respond(req, res, PasswordReset.forgotPassword);
  }

  static async confirmPasswordResetRequest(req, res) {
    return Responder
      .respondWithCookie(req, res, PasswordReset.confirmPasswordResetRequest);
  }

  static async resetPassword(req, res) {
    return Responder.respond(req, res, PasswordReset.resetPassword);
  }

  static async changePassword(req, res) {
    return Responder.respond(req, res, ChangePassword.processPasswordUpdate);
  }

  static async createOvertimeClaim(req, res) {
    return Responder.respond(req, res, Claim.create);
  }

  static async pendingClaimsForlineManagers(req, res) {
    return Responder.respond(req, res, Claim.sendPendingClaimsTolineManager);
  }

  static async approveClaim(req, res) {
    return Responder.respond(req, res, Claim.approve);
  }

  static async declineClaim(req, res) {
    return Responder.respond(req, res, Claim.decline);
  }

  static async cancelClaim(req, res) {
    return Responder.respond(req, res, Claim.cancel);
  }

  static async submittedClaims(req, res) {
    return Responder.respond(req, res, Administration.submittedClaims);
  }

  static async chartStatistics(req, res) {
    return Responder.respond(req, res, Administration.chartStatistics);
  }

  static async exportDoc(req, res) {
    return Responder.download(req, res, exportDoc);
  }

  static async updateEmailSchedule(req, res) {
    return Responder.respond(req, res, Settings.updateEmailSchedule);
  }

  static async createStaff(req, res) {
    return Responder.respond(req, res, Administration.createStaff);
  }

  static async createBranches(req, res) {
    return Responder.respond(req, res, Administration.createBranches);
  }

  static async markClaimsAsCompleted(req, res) {
    return Responder.respond(req, res, Administration.markClaimsAsCompleted);
  }

  static async staffClaimStats(req, res) {
    return Responder.respond(req, res, Users.Staff.dashboardData);
  }

  static async staffPendingClaim(req, res) {
    return Responder.respond(req, res, Users.Staff.dashboardData);
  }

  static async staffActivities(req, res) {
    return Responder.respond(req, res, Users.Staff.activities);
  }

  static async staffProfileData(req, res) {
    return Responder.respond(req, res, Users.Staff.profileData);
  }

  static async staffClaimHistory(req, res) {
    return Responder.respond(req, res, Users.Staff.claimHistory);
  }

  static async uploadImage(req, res) {
    return Responder.respond(req, res, imageUpload);
  }

  static async updateProfileInfo(req, res) {
    return Responder.respond(req, res, ProfileUpdate.profileInfo);
  }

  static async fetchLineManagers(req, res) {
    return Responder.respond(req, res, LineManager.fetchLineManagers);
  }

  static async fetchBranches(req, res) {
    return Responder.respond(req, res, Branch.fetchBranches);
  }

  static async fetchRoles(req, res) {
    return Responder.respond(req, res, Roles.fetchRoles);
  }

  static async fetchNotifications(req, res) {
    return Responder.respond(req, res, Notifications.getNotifications);
  }

  static async markNotificationsAsReadAndViewed(req, res) {
    return Responder.respond(req, res, Notifications.markAsViewedAndRead);
  }
}

export default Controller;
