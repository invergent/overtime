import Dates from '../Dates';

class ProcessOvertimeClaimHelpers {
  static createOvertimeRequestObject(overtimeRequest, staffId) {
    return {
      monthOfClaim: Dates.convertPreviousYearMonthToString(),
      ...overtimeRequest,
      requester: staffId
    };
  }
}

export default ProcessOvertimeClaimHelpers;
