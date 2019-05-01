import Dates from '../Dates';
import ClaimService from '../../services/ClaimService';
import { claimTypeRates } from '../../utils/general';

class ClaimHelpers {
  static calculateClaimAmount(overtimeRequest) {
    const claimTypeList = Object.keys(overtimeRequest);

    const claimAmountAccumulator = (accumulator, claimType) => {
      const claimUnits = overtimeRequest[claimType];
      const claimRate = claimTypeRates[claimType];
      accumulator += claimUnits * claimRate;
      return accumulator;
    };

    return claimTypeList.reduce(claimAmountAccumulator, 0);
  }

  static createOvertimeRequestObject(overtimeRequest, staffId) {
    return {
      monthOfClaim: Dates.convertPreviousYearMonthToString(),
      ...overtimeRequest,
      requester: staffId,
      amount: ClaimHelpers.calculateClaimAmount(overtimeRequest),
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

  static filterReminderPendingClaims(queryResult) {
    return queryResult.map((result) => {
      const {
        id: claimId, monthOfClaim, amount, 'Staff.firstname': firstname, 'Staff.email': email,
        'Staff.staffId': staffId
      } = result;
      return {
        claimId, staffId, monthOfClaim, amount, firstname, email
      };
    });
  }

  static filterCompletedClaims(queryResult) {
    return ClaimHelpers.filterReminderPendingClaims(queryResult);
  }

  static getIdsOfFilteredPendingClaims(filteredPendingClaims) {
    return filteredPendingClaims.map(claim => claim.claimId);
  }

  static async pendingClaimsForlineManager(tenantRef, lineManager) {
    const { lineManagerRole } = lineManager;
    const pendingClaims = await ClaimService.fetchPendingClaimsForLineManagers(tenantRef, lineManager);
    const filteredResults = ClaimHelpers.filterQueryResult(pendingClaims, lineManagerRole);
    return filteredResults;
  }

  static async getIdsOfClaimsAssignedToLineManager(tenantRef, lineManager) {
    const filteredResults = await ClaimHelpers.pendingClaimsForlineManager(tenantRef, lineManager);
    const pendingClaimIds = ClaimHelpers.getIdsOfFilteredPendingClaims(filteredResults);
    return pendingClaimIds;
  }

  static async getStaffClaimStats(tenantRef, staffId) {
    const claims = await ClaimService.fetchStaffClaims(tenantRef, staffId);
    const claimStats = {
      total: claims.length, completed: 0, declined: 0, cancelled: 0
    };
    return claims.reduce(ClaimHelpers.statAccumulator, claimStats);
  }

  static statAccumulator(acc, claim) {
    if (claim.status === 'Completed') acc.completed += 1;
    if (claim.status === 'Declined') acc.declined += 1;
    if (claim.status === 'Cancelled') acc.cancelled += 1;
    return acc;
  }

  static async fetchStaffPendingClaim(tenantRef, staffId) {
    // a hack for a claim that is either awaiting or processing
    const pendingClaim = await ClaimService.fetchStaffClaims(tenantRef, staffId, 'ing');
    if (!pendingClaim.length) return {};

    const {
      id, monthOfClaim, weekday, weekend, shift, amount, status, createdAt, approvalHistory
    } = pendingClaim[0];
    return {
      id, monthOfClaim, weekday, weekend, shift, amount, status, createdAt, approvalHistory
    };
  }
}

export default ClaimHelpers;
