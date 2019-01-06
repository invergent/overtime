import formProperties from './formProperties';
import checkForEmptyFields from './checkForEmptyFields';

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

  static checkSignInEntries(reqObject) {
    const { staffId, password } = reqObject;
    const staffIdRegex = /^[T][N][0-9]{6}$/;
    const errors = [];

    if (!staffIdRegex.test(staffId)) {
      errors.push('Staff ID is invalid');
    }

    if (!password.trim()) {
      errors.push('Enter a value for password');
    }

    return errors;
  }

  static checkSupervisorFormEntries(reqObject) {
    const {
      supervisorId, firstname, lastname, designation, email
    } = reqObject;
    const staffIdRegex = /^[T][N][0-9]{6}$/;
    const emailRegex = /\S+@\S+\.\S+/;
    const errors = [];

    if (!staffIdRegex.test(supervisorId)) {
      errors.push('Staff ID is invalid');
    }
    if (!emailRegex.test(email)) {
      errors.push('email is invalid');
    }

    errors.push(...checkForEmptyFields(firstname));
    errors.push(...checkForEmptyFields(lastname));
    errors.push(...checkForEmptyFields(designation));

    return errors;
  }
}

export default Validator;
