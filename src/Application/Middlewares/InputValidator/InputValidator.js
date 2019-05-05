import Validator from './Validator';
import ValidatorHelpers from './ValidatorHelpers';
import OvertimeRequestValidator from './OvertimeRequestValidator';
import Dates from '../../Features/utilities/helpers/Dates';
import { staffIdRegex, emailRegex } from '../../Features/utilities/utils/inputValidator';

class InputValidator {
  static checkProps(req, res, next) {
    const methodName = ValidatorHelpers.getMethodName(req.path);
    const missingProps = Validator.checkProps(req.files || req.body, methodName);

    if (missingProps.trim().length) {
      return res.status(400).json({
        message: `The following fields are missing: ${missingProps.slice(2)}`
      });
    }
    return next();
  }

  static checkEntries(req, res, next) {
    const methodName = ValidatorHelpers.getMethodName(req.path);
    const errors = Validator[methodName](req.files || req.body);

    return ValidatorHelpers.validatorResponder(res, errors, next);
  }

  static checkBranchId(req, res, next) {
    const { branchId } = req.body;

    if (!Number.isInteger(parseInt(branchId, 10))) {
      return res.status(400).json({ message: 'branchId must be an integer' });
    }
    return next();
  }

  static validateForgotPasswordRequest(req, res, next) {
    const { staffId, email } = req.body;
    let error = ['Please provide either email or password'];
    if (!staffId && !email) return ValidatorHelpers.validatorResponder(res, error, next);

    const fieldValue = staffId || email;
    const fieldName = staffId ? 'Staff ID' : 'Email address';
    const regex = staffId ? staffIdRegex : emailRegex;
    error = ValidatorHelpers.checkPatternedFields(fieldName, fieldValue, regex);

    return ValidatorHelpers.validatorResponder(res, error, next);
  }

  static checkOvertimeProps(req, res, next) {
    const { currentStaff: { staffRole }, body } = req;
    console.log(staffRole);
    
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

  static checkFileType(req, res, next) {
    const errors = ValidatorHelpers.checkFileType(req.files);
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
