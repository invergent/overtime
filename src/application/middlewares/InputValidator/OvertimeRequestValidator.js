class OvertimeRequestValidator {
  static checkOvertimeProps(overtimeRequest, staffRole) {
    const overtimeTypes = Object.keys(overtimeRequest);
    if (this.canApplyForShifts(staffRole)) {
      return this.checkRPCRequest(overtimeTypes);
    }
    return this.checkNonRPCRequest(overtimeTypes);
  }

  static canApplyForShifts(staffRole) {
    return staffRole === 'RPC';
  }

  static checkRPCRequest(overtimeTypes) {
    if (overtimeTypes[0] !== 'shift' || overtimeTypes.length !== 1) {
      return [400, 'As an RPC, you can only apply for Shifts'];
    }
    return [200, 'okay'];
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

    if (overtimeTypes.includes('weekend') && overtimeTypes.includes('atm')) {
      errors.push('Your can contain either Weekend or ATM shifts; not both.');
    }
    if (!overtimeTypes.length) {
      errors.push('request cannot be empty');
    }
    if (errors.length) {
      return [400, errors];
    }
    return [200, 'okay'];
  }

  static checkOvertimeEntries(overtimeRequest, maxValues) {
    const errors = this.checkOvertimeValues(overtimeRequest, maxValues);
    if (errors.length) {
      return [400, errors];
    }
    return [200, 'okay'];
  }

  static checkOvertimeValues(overtimeRequest, maxValues) {
    const [numberOfWeekdays, numberOfWeekdends] = maxValues;
    const validator = this.validateOvertimeValues;

    const errors = Object.keys(overtimeRequest).reduce((acc, item) => {
      if (['weekend', 'atm'].includes(item)) {
        acc.push(...validator(overtimeRequest[item], numberOfWeekdends, item));
      } else {
        acc.push(...validator(overtimeRequest[item], numberOfWeekdays, item));
      }
      return acc;
    }, []);

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
