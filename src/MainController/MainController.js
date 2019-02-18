import features from '../application/features';
import Responder from './Responder';

const {
  signin, updateBranch, addOrChangeLineManager, PasswordReset, ChangePassword,
  ProcessOvertimeClaim
} = features;

class MainController {
  static async signin(req, res, models) {
    return Responder.respondWithCookie(req, res, models, signin);
  }

  static async updateBranch(req, res, models) {
    return Responder.respond(req, res, models, updateBranch);
  }

  static async addOrChangeLineManager(req, res, models) {
    return Responder.respond(req, res, models, addOrChangeLineManager);
  }

  static async forgotPassword(req, res, models, client) {
    return Responder.respond(req, res, models, PasswordReset.forgotPassword, client);
  }

  static async confirmPasswordResetRequest(req, res) {
    return Responder
      .respondWithCookie(req, res, undefined, PasswordReset.confirmPasswordResetRequest);
  }

  static async resetPassword(req, res, models) {
    return Responder.respond(req, res, models, PasswordReset.resetPassword);
  }

  static async changePassword(req, res, models) {
    return Responder.respond(req, res, models, ChangePassword.processPasswordUpdate);
  }

  static async createOvertimeClaim(req, res, models) {
    return Responder.respond(req, res, models, ProcessOvertimeClaim.create);
  }

  static async updateOvertimeClaim(req, res, models) {
    return Responder.respond(req, res, models, ProcessOvertimeClaim.update);
  }
}

export default MainController;
