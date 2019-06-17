class ValidatorHelpers {
  static checkForEmptyFields(field, value, optional) {
    if (!value && optional) return []; // do not return errors if field is optional
    if (!value || !value.trim()) return [`${field} is required`];
    return [];
  }

  static checkPatternedFields(field, value, regex) {
    if (field === 'Sol ID' && !value) return ['Sol ID is required'];

    // this check is being made for both admin and staff login. either staff id
    // or email would be defined at a time. this check avoid returning a valid error
    // when either check is made.
    if (!value) return [];
    if (!regex.test(value)) return [`${field} is invalid`];
    return [];
  }

  static checkDocTypeParam(docType) {
    if (!['excel'].includes(docType)) return ['Invalid! DocType can only be "excel".'];
    return [];
  }

  static checkFileType(files) {
    const { excelDoc, image } = files;
    const imageTypes = '.jpg, .jpeg, .png or .svg';
    const expectedFileType = excelDoc ? 'xlsx' : imageTypes;

    const file = excelDoc || image;
    const fileNameSplits = file.name.split('.');
    const fileExtension = fileNameSplits[fileNameSplits.length - 1];

    // if file is neither an excel doc or an image file, return an error
    if ((fileExtension !== 'xlsx') && (!imageTypes.includes(fileExtension))) {
      return [`file type must be ${expectedFileType}`];
    }
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

  static checkCronTime(field, cronTime) {
    if (typeof cronTime === 'undefined') return [];
    return cronTime.trim().split(' ').length === 5 ? [] : [`${field} cron time setting is invalid.`];
  }

  static checkBooleanField(field, value, optional) {
    if (typeof value !== 'boolean' && !optional) return [`${field} must be a boolean`];
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
      case (path.indexOf('single') !== -1):
        methodName = path.slice(path.indexOf('branch') !== -1 ? 14 : 13);
        break;
      case (path.indexOf('login') !== -1):
      case (path.indexOf('staff') !== -1):
      case (path.indexOf('branch') !== -1):
        methodName = path.slice(7);
        break;
      default:
        methodName = path.slice(1);
    }
    return ValidatorHelpers.convetWordToCamelCase(methodName);
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
