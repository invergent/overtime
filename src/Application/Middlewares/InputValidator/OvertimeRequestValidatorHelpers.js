class OvertimeRequestValidator {
  static canApplyForShifts(staffRole) {
    return staffRole === 'RPC';
  }

  static checkRPCRequest(overtimeTypes) {
    if (overtimeTypes[0] !== 'shift' || overtimeTypes.length !== 1) {
      return ['As an RPC, you can only apply for Shifts'];
    }
    return [];
  }

  static checkNonRPCRequestProps(overtimeTypes) {
    const overtimeFields = ['weekday', 'weekend', 'atm'];
    const unknownProps = overtimeTypes.reduce((acc, item) => {
      if (!overtimeFields.includes(item)) {
        acc.push(`${item} is not a recognised property`);
      }
      return acc;
    }, []);

    return unknownProps;
  }

  static checkNonRPCRequest(overtimeTypes) {
    const errors = [...this.checkNonRPCRequestProps(overtimeTypes)];

    if (!overtimeTypes.length) {
      errors.push('request cannot be empty');
    }
    return errors;
  }

  static validateOvertimeValues(overtimeValue, maxValue, field) {
    const overtimeFields = ['weekday', 'weekend', 'atm', 'shift'];

    if (!overtimeValue || !overtimeFields.includes(field)) {
      return [`Please enter a value for ${field}.`];
    }
    if (overtimeValue > maxValue) {
      return [`${field} maximum value exceeded.`];
    }
    return [];
  }
}

export default OvertimeRequestValidator;
