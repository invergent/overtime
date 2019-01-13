import '@babel/polyfill';
import features from '../../../MainController';
import models from '../models';

const {
  signin, addOrChangeSupervisor, updateBranch, forgotPassword, confirmPasswordResetRequest,
  resetPassword
} = features;

export default {
  signin: (req, res) => signin(req, res, models),
  addOrChangeSupervisor: (req, res) => addOrChangeSupervisor(req, res, models),
  updateBranch: (req, res) => updateBranch(req, res, models),
  forgotPassword: (req, res) => forgotPassword(req, res, models, 'VLA'),
  confirmPasswordResetRequest:
    (req, res) => confirmPasswordResetRequest(req, res),
  resetPassword: (req, res) => resetPassword(req, res, models)
};
