import '@babel/polyfill';
import features from '../../../MainController';
import models from '../models';

export default {
  signin: (req, res) => features.signin(req, res, models),
  addOrChangeLineManager: (req, res) => features.addOrChangeLineManager(req, res, models),
  updateBranch: (req, res) => features.updateBranch(req, res, models),
  forgotPassword: (req, res) => features.forgotPassword(req, res, models, 'INIT'),
  confirmPasswordResetRequest:
    (req, res) => features.confirmPasswordResetRequest(req, res),
  resetPassword: (req, res) => features.resetPassword(req, res, models),
  changePassword: (req, res) => features.changePassword(req, res, models),
  createOvertimeClaim: (req, res) => features.createOvertimeClaim(req, res, models),
  updateOvertimeClaim: (req, res) => features.updateOvertimeClaim(req, res, models)
};
