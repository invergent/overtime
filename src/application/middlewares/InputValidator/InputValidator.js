import Validator from './Validator';
import ValidatorHelpers from './ValidatorHelpers';
import OvertimeRequestValidator from './OvertimeRequestValidator';
import Dates from '../../helpers/Dates';

class InputValidator {
  static checkProps(req, res, next) {
    const methodName = ValidatorHelpers.getMethodName(req.path);
    const missingProps = Validator.checkProps(req.body, methodName);

    if (missingProps.length) {
      return res.status(400).json({
        message: `The following fields are missing: ${missingProps.slice(2)}`
      });
    }
    return next();
  }

  static checkEntries(req, res, next) {
    const methodName = ValidatorHelpers.getMethodName(req.path);
    const errors = Validator[methodName](req.body);

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
    const error = ValidatorHelpers.checkStaffId(staffId);

    if (error.length) {
      return res.status(400).json({ message: 'staffId is invalid' });
    }
    return next();
  }

  static checkOvertimeProps(req, res, next) {
    const { currentStaff: { staffRole }, body } = req;
    const [statusCode, errors] = OvertimeRequestValidator.checkOvertimeProps(body, staffRole);

    if (statusCode === 400) {
      return res.status(statusCode).json({ message: 'validationErrors', errors });
    }
    return next();
  }

  static checkOvertimeValues(req, res, next) {
    const { body } = req;
    const daysInAMonth = Dates.countWeekdaysAndWeekendsOfAMonth();
    const [statusCode, errors] = OvertimeRequestValidator.checkOvertimeEntries(body, daysInAMonth);

    if (statusCode === 400) {
      return res.status(statusCode).json({ message: 'validationErrors', errors });
    }
    return next();
  }
}

export default InputValidator;
