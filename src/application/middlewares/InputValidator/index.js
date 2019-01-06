import Validator from './Validator';

class InputValidator {
  static checkProps(req, res, next) {
    const path = req.path.slice(1);
    const missingProps = Validator.checkProps(req.body, path);

    if (missingProps.length) {
      return res.status(400).json({
        message: `The following fields are missing: ${missingProps.slice(2)}`
      });
    }
    return next();
  }

  static checkEntries(req, res, next) {
    const path = req.path.slice(1);
    const validatorMethod = path === 'signin' ? 'checkSignInEntries' : 'checkSupervisorFormEntries';
    const errors = Validator[validatorMethod](req.body);

    if (errors.length) {
      return res.status(400).json({ message: 'validationErrors', errors });
    }
    return next();
  }
}

export default InputValidator;
