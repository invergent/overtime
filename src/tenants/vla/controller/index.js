import '@babel/polyfill';
import features from '../../../application/features';
import models from '../models';

const { signin, addOrChangeSupervisor, updateBranch } = features;

export default {
  signin: (req, res) => signin(req, res, models),
  addOrChangeSupervisor: (req, res) => addOrChangeSupervisor(req, res, models),
  updateBranch: (req, res) => updateBranch(req, res, models)
};
