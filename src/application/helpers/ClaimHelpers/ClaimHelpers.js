import Dates from '../Dates';
import ClaimService from '../../services/ClaimService';

class ClaimHelpers {
  static createOvertimeRequestObject(overtimeRequest, staffId) {
    return {
      monthOfClaim: Dates.convertPreviousYearMonthToString(),
      ...overtimeRequest,
      requester: staffId,
      status: 'Awaiting supervisor'
    };
  }

  static responseMessage(overtimeRequest) {
    return {
      messageWhenCreated: 'Your claim request was created successfully.',
      messageWhenNotCreated: `You have already submitted a claim request for ${
        overtimeRequest.monthOfClaim
      }. If you wish to make changes, please cancel the current claim and create a new one.`
    };
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
        [`${staff}.Claims.status`]: status
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
        status
      };
    });
  }

  static getIdsOfFilteredPendingClaims(filteredPendingClaims) {
    return filteredPendingClaims.map(claim => claim.claimId);
  }

  static async pendingClaimsForlineManager(tenant, lineManager) {
    const { lineManagerRole } = lineManager;
    const pendingClaims = await ClaimService.fetchPendingClaimsForLineManagers(tenant, lineManager);
    const filteredResults = ClaimHelpers.filterQueryResult(pendingClaims, lineManagerRole);
    return filteredResults;
  }

  static async getIdsOfClaimsAssignedToLineManager(tenant, lineManager) {
    const filteredResults = await ClaimHelpers.pendingClaimsForlineManager(tenant, lineManager);
    const pendingClaimIds = ClaimHelpers.getIdsOfFilteredPendingClaims(filteredResults);
    return pendingClaimIds;
  }
}

export default ClaimHelpers;
