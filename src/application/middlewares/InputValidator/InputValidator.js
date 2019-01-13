import Validator from './Validator';
import { checkStaffId } from './validatorHelpers';

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
    const errors = Validator[path](req.body);

    if (errors.length) {
      return res.status(400).json({ message: 'validationErrors', errors });
    }
    return next();
  }

  static checkBranchId(req, res, next) {
    const { branchId } = req.body;

    if (!Number.isInteger(parseInt(branchId, 10))) {
      return res.status(400).json({ message: 'branchId must be an integer' });
    }
    return next();
  }

  static checkStaffId(req, res, next) {
    const { staffId } = req.body;
    const error = checkStaffId(staffId);

    if (error.length) {
      return res.status(400).json({ message: 'staffId is invalid' });
    }
    return next();
  }
}

export default InputValidator;
