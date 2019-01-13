import '@babel/polyfill';
import features from '../../../application/features';
import models from '../models';

const {
  signin, addOrChangeSupervisor, updateBranch, PasswordReset
} = features;

export default {
  signin: (req, res) => signin(req, res, models),
  addOrChangeSupervisor: (req, res) => addOrChangeSupervisor(req, res, models),
  updateBranch: (req, res) => updateBranch(req, res, models),
  forgotPassword: (req, res) => PasswordReset.forgotPassword(req, res, models, 'VLA'),
  confirmPasswordResetRequest:
    (req, res) => PasswordReset.confirmPasswordResetRequest(req, res),
  resetPassword: (req, res) => PasswordReset.resetPassword(req, res, models)
};
