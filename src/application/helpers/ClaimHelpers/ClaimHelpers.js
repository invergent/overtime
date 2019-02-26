import Dates from '../Dates';
import tenantsModels from '../../database/tenantsModels';

class ClaimHelpers {
  static createOvertimeRequestObject(overtimeRequest, staffId) {
    return {
      monthOfClaim: Dates.convertPreviousYearMonthToString(),
      ...overtimeRequest,
      requester: staffId
    };
  }

  static responseMessage(overtimeRequest) {
    return {
      messageWhenCreated: 'Your claim request was created successfully.',
      messageWhenNotCreated: `You have already submitted a claim request for ${
        overtimeRequest.monthOfClaim
      }. If you wish to make changes, please edit your submission.`
    };
  }

  static createQueryOptions(tenant, lineManager) {
    const { lineManagerId, lineManagerRole } = lineManager;
    const bsmOrSupervisorStaff = lineManagerRole === 'BSM' ? 'bsmStaff' : 'supervisorStaff';

    const claimsWhereOptions = { approvalBySupervisor: 'Pending' };

    const { Claims, Staff } = tenantsModels[tenant];

    if (lineManagerRole === 'BSM') {
      claimsWhereOptions.approvalBySupervisor = 'Approved';
      claimsWhereOptions.approvalByBSM = 'Pending';
    }

    const options = {
      where: { lineManagerId },
      include: [{
        model: Staff,
        as: bsmOrSupervisorStaff,
        include: [{
          model: Claims,
          where: claimsWhereOptions
        }]
      }],
      plain: false,
      raw: true
    };

    return options;
  }

  static filterQueryResult(queryResult, lineManagerRole) {
    const staff = lineManagerRole === 'BSM' ? 'bsmStaff' : 'supervisorStaff';

    return queryResult.map((result) => {
      const {
        [`${staff}.staffId`]: staffId,
        [`${staff}.firstname`]: staffFirstName,
        [`${staff}.lastname`]: staffLastName,
        [`${staff}.image`]: image,
        [`${staff}.Claims.id`]: claimId,
        [`${staff}.Claims.monthOfClaim`]: monthOfClaim,
        [`${staff}.Claims.weekday`]: weekday,
        [`${staff}.Claims.weekend`]: weekend,
        [`${staff}.Claims.shift`]: shift,
        [`${staff}.Claims.approvalBySupervisor`]: approvalBySupervisor,
        [`${staff}.Claims.approvalByBSM`]: approvalByBSM
      } = result;
      return {
        staffId,
        staffFirstName,
        staffLastName,
        image,
        claimId,
        monthOfClaim,
        weekday,
        weekend,
        shift,
        approvalBySupervisor,
        approvalByBSM
      };
    });
  }

  static getIdsOfFilteredPendingClaims(filteredPendingClaims) {
    return filteredPendingClaims.map(claim => claim.claimId);
  }
}

export default ClaimHelpers;
