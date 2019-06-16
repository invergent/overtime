import Validator from './Validator';
import ValidatorHelpers from './ValidatorHelpers';
import OvertimeRequestValidator from './OvertimeRequestValidator';
import Dates from '../../Features/utilities/helpers/Dates';
import { staffIdRegex, emailRegex } from '../../Features/utilities/utils/inputValidator';

const {
  getMethodName, validatorResponder, checkPatternedFields, checkDocTypeParam, checkFileType
} = ValidatorHelpers;

class InputValidator {
  static checkProps(req, res, next) {
    const methodName = getMethodName(req.path);
    const missingProps = Validator.checkProps(req.files || req.body, methodName);

    if (missingProps.trim().length) {
      return res.status(400).json({
        message: `The following fields are missing: ${missingProps.slice(2)}`
      });
    }
    return next();
  }

  static checkEntries(req, res, next) {
    const methodName = getMethodName(req.path);
    const errors = Validator[methodName](req.files || req.body, req.path);

    return validatorResponder(res, errors, next);
  }

  static checkBranchId(req, res, next) {
    const { branchId } = req.body;

    if (!branchId) {
      return res.status(400).json({ message: 'branchId is required' });
    }

    if (!Number.isInteger(parseInt(branchId, 10))) {
      return res.status(400).json({ message: 'branchId must be an integer' });
    }
    return next();
  }

  static validateForgotPasswordRequest(req, res, next) {
    const { staffId, email } = req.body;
    let error = ['Please provide either email or password'];
    if (!staffId && !email) return validatorResponder(res, error, next);

    const fieldValue = staffId || email;
    const fieldName = staffId ? 'Staff ID' : 'Email address';
    const regex = staffId ? staffIdRegex : emailRegex;
    error = checkPatternedFields(fieldName, fieldValue, regex);

    return validatorResponder(res, error, next);
  }

  static checkOvertimeProps(req, res, next) {
    const { currentStaff: { staffRole }, body } = req;
    
    const errors = OvertimeRequestValidator.checkOvertimeProps(body, staffRole);

    return validatorResponder(res, errors, next);
  }

  static checkOvertimeValues(req, res, next) {
    const { body } = req;
    const daysInAMonth = Dates.countWeekdaysAndWeekendsOfAMonth();
    const errors = OvertimeRequestValidator.checkOvertimeEntries(body, daysInAMonth);

    return validatorResponder(res, errors, next);
  }

  static checkDocType(req, res, next) {
    const { params: { docType } } = req;
    const errors = checkDocTypeParam(docType);
    return validatorResponder(res, errors, next);
  }

  static checkFileType(req, res, next) {
    const errors = checkFileType(req.files);
    return validatorResponder(res, errors, next);
  }

  static validateProfileEdit(req, res, next) {
    if (!Object.keys(req.body).length) return validatorResponder(res, ['You sent an empty request.']);
    const errors = Validator.profile(req.body);
    return validatorResponder(res, errors, next);
  }

  // static checkParams(req, res, next) {
  //   const { claimId } = req.params;
  //
  //   const error = ValidatorHelpers.validateNumberParam(claimId, 'claimId');
  //   return ValidatorHelpers.validatorResponder(res, error, next);
  // }

  static checkScheduleProps(req, res, next) {
    if (!Object.keys(req.body).length) return validatorResponder(res, ['You sent an empty request.']);
    const errors = Validator.schedules(req.body);
    return validatorResponder(res, errors, next);
  }
}

export default InputValidator;
