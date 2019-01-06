import '@babel/polyfill';
import features from '../../../application/features';
import models from '../models';

const { signin, addOrChangeSupervisor } = features;

export default {
  signin: (req, res) => signin(req, res, models),
  addOrChangeSupervisor: (req, res) => addOrChangeSupervisor(req, res, models)
};
