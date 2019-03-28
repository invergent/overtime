class ValidatorHelpers {
  static checkForEmptyFields(field, value) {
    if (!value || !value.trim()) {
      return [`${field} is required`];
    }
    return [];
  }

  static checkPatternedFields(field, value, regex) {
    if (!value) return [];
    if (!regex.test(value)) return [`${field} is invalid`];
    return [];
  }

  static checkDocTypeParam(docType) {
    if (!['excel'].includes(docType)) return ['Invalid! DocType can only be "excel".'];
    return [];
  }

  // static validateNumberParam(param, claimId) {
  //   const isInter = Number.isInteger(parseInt(param, 10));
  //   const isGreaterThanZero = parseInt(param, 10) > 0;
  //
  //   if (isInter && isGreaterThanZero) return [];
  //   return [`${claimId} must be an integer greater than zero.`];
  // }

  static checkLineManagerRole(lineManagerRole) {
    const lineManagerRoles = ['Supervisor', 'BSM'];

    if (!lineManagerRoles.includes(lineManagerRole)) {
      return ['Line Manager role can only be Supervisor or BSM'];
    }
    return [];
  }

  static getMethodName(path) {
    let methodName;

    switch (true) {
      case (path.indexOf('users') !== -1):
        methodName = path.slice(15);
        break;
      case (path.indexOf('settings') !== -1):
        methodName = path.slice(16);
        break;
      case (path.indexOf('login') !== -1):
        methodName = path.slice(7);
        break;
      default:
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

  static validatorResponder(res, errors, next) {
    if (errors.length) {
      return res.status(400).json({ message: 'validationErrors', errors });
    }
    return next();
  }
}

export default ValidatorHelpers;