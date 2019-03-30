import ValidatorHelpers from './ValidatorHelpers';

import {
  emailRegex, staffIdRegex, formProperties
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
      lineManagerRole, lineManagerId, firstname, lastname, designation, email
    } = reqObject;
    const errors = [];

    if (!emailRegex.test(email)) {
      errors.push('Email is invalid');
    }

    errors.push(...ValidatorHelpers.checkLineManagerRole(lineManagerRole));
    errors.push(...ValidatorHelpers.checkPatternedFields('lineManagerId', lineManagerId, staffIdRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('email', email, emailRegex));
    errors.push(...ValidatorHelpers.checkForEmptyFields('firstname', firstname));
    errors.push(...ValidatorHelpers.checkForEmptyFields('lastname', lastname));
    errors.push(...ValidatorHelpers.checkForEmptyFields('designation', designation));

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
    const cronTime = reqObject.emailSchedule;
    if (!cronTime) {
      return ['Enter a valid cron time for email scheduling.'];
    }
    return reqObject.emailSchedule.split(' ').length === 5 ? [] : ['Invalid cronTime.'];
  }

  static staff(rowValues) {
    // eslint-disable-next-line
    const [emptyCell, staffId, firstname, lastname, middleName, emailAddress] = rowValues;
    const errors = [];
    
    errors.push(...ValidatorHelpers.checkPatternedFields('Staff ID', staffId, staffIdRegex));
    errors.push(...ValidatorHelpers.checkPatternedFields('Email Address', emailAddress, emailRegex));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Firstname', firstname));
    errors.push(...ValidatorHelpers.checkForEmptyFields('Lastname', lastname));

    if (errors.length) return { rowIsValid: false, errors };
    return { rowIsValid: true };
  }
}

export default Validator;
