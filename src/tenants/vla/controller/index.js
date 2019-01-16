import '@babel/polyfill';
import features from '../../../MainController';
import models from '../models';

export default {
  signin: (req, res) => features.signin(req, res, models),
  addOrChangeSupervisor: (req, res) => features.addOrChangeSupervisor(req, res, models),
  updateBranch: (req, res) => features.updateBranch(req, res, models),
  forgotPassword: (req, res) => features.forgotPassword(req, res, models, 'VLA'),
  confirmPasswordResetRequest:
    (req, res) => features.confirmPasswordResetRequest(req, res),
  resetPassword: (req, res) => features.resetPassword(req, res, models),
  changePassword: (req, res) => features.changePassword(req, res, models)
};
