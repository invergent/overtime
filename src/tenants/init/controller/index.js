import '@babel/polyfill';
import features from '../../../application/features';
import Responder from '../../Responder';

const {
  signin, updateBranch, addOrChangeLineManager, PasswordReset, ChangePassword,
  ProcessOvertimeClaim, PendingClaims
} = features;

class MainController {
  static async signin(req, res) {
    return Responder.respondWithCookie(req, res, signin);
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
    return Responder.respond(req, res, ProcessOvertimeClaim.create);
  }

  static async updateOvertimeClaim(req, res) {
    return Responder.respond(req, res, ProcessOvertimeClaim.update);
  }

  static async pendingClaimsForlineManagers(req, res) {
    return Responder.respond(req, res, PendingClaims.pendingClaimsForlineManagers);
  }
}

export default MainController;
