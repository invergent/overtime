class ValidatorHelpers {
  static checkForEmptyFields(fieldValue) {
    if (!fieldValue || !fieldValue.trim()) {
      return [`${fieldValue} is required`];
    }
    return [];
  }

  static checkStaffId(staffId) {
    const staffIdRegex = /^[T][N][0-9]{6}$/;

    if (!staffIdRegex.test(staffId)) {
      return ['Staff ID is invalid'];
    }
    return [];
  }

  static checkLineManagerRole(lineManagerRole) {
    const lineManagerRoles = ['Supervisor', 'BSM'];

    if (!lineManagerRoles.includes(lineManagerRole)) {
      return ['Line Manager role can only be Supervisor or BSM'];
    }
    return [];
  }

  static getMethodName(path) {
    let methodName;
    if (path.indexOf('users') !== -1) {
      methodName = path.slice(15);
    } else {
      methodName = path.slice(1);
    }
    return this.convetWordToCamelCase(methodName);
  }

  static convetWordToCamelCase(word) {
    const [firstWord, secondWord] = word.split('-');
    if (!secondWord) {
      return firstWord;
    }
    return `${firstWord}${secondWord.charAt(0).toUpperCase()}${secondWord.slice(1)}`;
  }
}

export default ValidatorHelpers;
