import formProperties from './formProperties';
import ValidatorHelpers from './ValidatorHelpers';

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
    const { staffId, password } = reqObject;
    const errors = [];

    if (!password.trim()) {
      errors.push('Enter a value for password');
    }

    errors.push(...ValidatorHelpers.checkStaffId(staffId));

    return errors;
  }

  static lineManager(reqObject) {
    const {
      lineManagerRole, lineManagerId, firstname, lastname, designation, email
    } = reqObject;
    const emailRegex = /\S+@\S+\.\S+/;
    const errors = [];

    if (!emailRegex.test(email)) {
      errors.push('email is invalid');
    }
    errors.push(...ValidatorHelpers.checkLineManagerRole(lineManagerRole));
    errors.push(...ValidatorHelpers.checkStaffId(lineManagerId));
    errors.push(...ValidatorHelpers.checkForEmptyFields(firstname));
    errors.push(...ValidatorHelpers.checkForEmptyFields(lastname));
    errors.push(...ValidatorHelpers.checkForEmptyFields(designation));

    return errors;
  }

  static reset(reqObject) {
    const { password, newPassword, confirmPassword } = reqObject;
    const truthyPassword = password || newPassword;

    const errors = [];

    errors.push(...ValidatorHelpers.checkForEmptyFields(truthyPassword));
    errors.push(...ValidatorHelpers.checkForEmptyFields(confirmPassword));

    if (truthyPassword.trim() !== confirmPassword.trim()) {
      errors.push('Passwords do not match');
    }

    return errors;
  }

  static changePassword(reqObject) {
    const { currentPassword } = reqObject;
    const errors = [];

    errors.push(...ValidatorHelpers.checkForEmptyFields(currentPassword));
    errors.push(...this.reset(reqObject));

    return errors;
  }
}

export default Validator;
