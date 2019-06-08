import ValidatorHelpers from './ValidatorHelpers';

import {
  emailRegex, staffIdRegex, solIdRegex, formProperties, phoneRegex, numberRegex
} from '../../Features/utilities/utils/inputValidator';

class Validator {
  static checkProps(reqObject, methodName) {
    const expectedProps = Object.keys(formProperties[methodName]);
    const receivedProps = Object.keys(reqObject);

    return expectedProps.reduce((acc, item) => {
      if (!receivedProps.includes(item)) {
        acc = `${acc}, ${item}`;
      }
      return acc;
    }, '');
  }

  static errorDecider(errors) {
    if (errors.length) return { rowIsValid: false, errors };
    return { rowIsValid: true };
  }

  static signin(reqObject) {
    const { staffId, email, password } = reqObject;
    const errors = [];

    errors.push(...ValidatorHelpers.checkPatternedFields('Staff ID', staffId, staffIdRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('Email', email, emailRegex));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Password', password));
    return errors;
  }

  static lineManager(reqObject) {
    const {
      lineManagerRole, firstname, lastname, email
    } = reqObject;
    const errors = [];

    if (!emailRegex.test(email)) {
      errors.push('Email is invalid');
    }

    errors.push(...ValidatorHelpers.checkLineManagerRole(lineManagerRole));
    errors.push(...ValidatorHelpers.checkPatternedFields('email', email, emailRegex));
    errors.push(...ValidatorHelpers.checkForEmptyFields('firstname', firstname));
    errors.push(...ValidatorHelpers.checkForEmptyFields('lastname', lastname));

    return errors;
  }

  static reset(reqObject) {
    const { password, newPassword, confirmPassword } = reqObject;
    const truthyPassword = password || newPassword;

    const errors = [];

    errors.push(...ValidatorHelpers.checkForEmptyFields('password', truthyPassword));
    errors.push(...ValidatorHelpers.checkForEmptyFields('confirmPassword', confirmPassword));

    if (truthyPassword.trim() !== confirmPassword.trim()) {
      errors.push('Passwords do not match');
    }

    return errors;
  }

  static changePassword(reqObject) {
    const { currentPassword } = reqObject;
    const errors = [];

    errors.push(...ValidatorHelpers.checkForEmptyFields('currentPassword', currentPassword));
    errors.push(...this.reset(reqObject));

    return errors;
  }

  static login(reqObject) {
    return Validator.signin(reqObject);
  }

  static emailSchedule(reqObject) {
    const cronTime = reqObject.emailSchedule.trim();
    if (!cronTime) {
      return ['Enter a valid cron time for email scheduling.'];
    }
    return cronTime.split(' ').length === 5 ? [] : ['Invalid cronTime.'];
  }

  static staff(rowValues) {
    // eslint-disable-next-line
    const [emptyCell, staffId, firstname, lastname, middlename, emailAddress] = rowValues;
    const errors = [];

    errors.push(...ValidatorHelpers.checkPatternedFields('Staff ID', staffId, staffIdRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('Email Address', emailAddress, emailRegex));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Firstname', firstname));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Lastname', lastname));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Middlename', middlename, true));
    
    return Validator.errorDecider(errors);
  }

  static branch(rowValues) {
    const [emptyCell, name, solId, address] = rowValues; // eslint-disable-line
    const errors = [];

    errors.push(...ValidatorHelpers.checkForEmptyFields('Branch Name', name));
    errors.push(...ValidatorHelpers.checkPatternedFields('Sol ID', solId, solIdRegex));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Branch address', address));

    return Validator.errorDecider(errors);
  }

  static profile(profileInfo) {
    const errors = [];
    const {
      firstname, lastname, middlename, email, phone, supervisorId, bsmId, roleId, branchId
    } = profileInfo;

    errors.push(...ValidatorHelpers.checkPatternedFields('Email Address', email, emailRegex));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Firstname', firstname, true));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Lastname', lastname, true));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Middlename', middlename, true));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Phone', phone, phoneRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('roleId', roleId, numberRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('Supervisor ID', supervisorId, numberRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('BSM ID', bsmId, numberRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('Branch ID', branchId, numberRegex));

    return errors;
  }

  static single(data, path) {
    const errors = [];
    const {
      staffId, firstname, lastname, middlename, email, phone, solId, name, address
    } = data;

    if (path.includes('branch')) {
      errors.push(...ValidatorHelpers.checkPatternedFields('SOL ID', solId, solIdRegex));
      errors.push(...ValidatorHelpers.checkForEmptyFields('Branch name', name));
      errors.push(...ValidatorHelpers.checkForEmptyFields('Branch address', address));
    } else {
      errors.push(...ValidatorHelpers.checkPatternedFields('Staff ID', staffId, staffIdRegex));
      errors.push(...ValidatorHelpers.checkPatternedFields('Email Address', email, emailRegex));
      errors.push(...ValidatorHelpers.checkForEmptyFields('Firstname', firstname));
      errors.push(...ValidatorHelpers.checkForEmptyFields('Lastname', lastname));
      errors.push(...ValidatorHelpers.checkForEmptyFields('Middlename', middlename));
      errors.push(...ValidatorHelpers.checkForEmptyFields('Phone', phone, phoneRegex));
    }

    return errors;
  }
}

export default Validator;
