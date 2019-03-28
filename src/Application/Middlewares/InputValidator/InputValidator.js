import Validator from './Validator';
import ValidatorHelpers from './ValidatorHelpers';
import OvertimeRequestValidator from './OvertimeRequestValidator';
import Dates from '../../Features/utilities/helpers/Dates';
import { staffIdRegex } from '../../Features/utilities/utils/inputValidator';

class InputValidator {
  static checkProps(req, res, next) {
    const methodName = ValidatorHelpers.getMethodName(req.path);
    const missingProps = Validator.checkProps(req.body, methodName);

    if (missingProps.trim().length) {
      return res.status(400).json({
        message: `The following fields are missing: ${missingProps.slice(2)}`
      });
    }
    return next();
  }

  static checkEntries(req, res, next) {
    const methodName = ValidatorHelpers.getMethodName(req.path);
    const errors = Validator[methodName](req.body);

    return ValidatorHelpers.validatorResponder(res, errors, next);
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
    const error = ValidatorHelpers.checkPatternedFields('Staff ID', staffId, staffIdRegex);

    return ValidatorHelpers.validatorResponder(res, error, next);
  }

  static checkOvertimeProps(req, res, next) {
    const { currentStaff: { staffRole }, body } = req;
    const errors = OvertimeRequestValidator.checkOvertimeProps(body, staffRole);

    return ValidatorHelpers.validatorResponder(res, errors, next);
  }

  static checkOvertimeValues(req, res, next) {
    const { body } = req;
    const daysInAMonth = Dates.countWeekdaysAndWeekendsOfAMonth();
    const errors = OvertimeRequestValidator.checkOvertimeEntries(body, daysInAMonth);

    return ValidatorHelpers.validatorResponder(res, errors, next);
  }

  static checkDocType(req, res, next) {
    const { params: { docType } } = req;
    const errors = ValidatorHelpers.checkDocTypeParam(docType);
    return ValidatorHelpers.validatorResponder(res, errors, next);
  }

  // static checkParams(req, res, next) {
  //   const { claimId } = req.params;
  //
  //   const error = ValidatorHelpers.validateNumberParam(claimId, 'claimId');
  //   return ValidatorHelpers.validatorResponder(res, error, next);
  // }
}

export default InputValidator;
