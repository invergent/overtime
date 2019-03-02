import '@babel/polyfill';
import features from '../../../application/features';
import Responder from '../../Responder';

const {
  Authorisation, updateBranch, addOrChangeLineManager, PasswordReset, ChangePassword, Claim
} = features;

class MainController {
  static async signin(req, res) {
    return Responder.respondWithCookie(req, res, Authorisation.authoriseStaff);
  }

  static async authoriseLineManager(req, res) {
    return Responder.respondWithCookie(req, res, Authorisation.authoriseLineManager);
  }

  static async updateBranch(req, res) {
    return Responder.respond(req, res, updateBranch);
  }

  static async addOrChangeLineManager(req, res) {
    return Responder.respond(req, res, addOrChangeLineManager);
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
}

export default MainController;
