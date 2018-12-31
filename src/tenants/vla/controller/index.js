import '@babel/polyfill';
import features from '../../../application/features';
import models from '../models';

const { signin } = features;

export default {
  signin: (req, res) => signin(req, res, models)
};
