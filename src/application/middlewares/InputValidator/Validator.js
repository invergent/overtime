import formProperties from './formProperties';
import { checkStaffId, checkForEmptyFields } from './validatorHelpers';

class Validator {
  static checkProps(reqObject, path) {
    const expectedProps = Object.keys(formProperties[path]);
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

    errors.push(...checkStaffId(staffId));

    return errors;
  }

  static supervisor(reqObject) {
    const {
      supervisorId, firstname, lastname, designation, email
    } = reqObject;
    const emailRegex = /\S+@\S+\.\S+/;
    const errors = [];

    if (!emailRegex.test(email)) {
      errors.push('email is invalid');
    }
    errors.push(...checkStaffId(supervisorId));
    errors.push(...checkForEmptyFields(firstname));
    errors.push(...checkForEmptyFields(lastname));
    errors.push(...checkForEmptyFields(designation));

    return errors;
  }

  static reset(reqObject) {
    const { password, confirmPassword } = reqObject;
    const errors = [];

    errors.push(...checkForEmptyFields(password));
    errors.push(...checkForEmptyFields(confirmPassword));

    if (password.trim() !== confirmPassword.trim()) {
      errors.push('Passwords do not match');
    }

    return errors;
  }
}

export default Validator;
