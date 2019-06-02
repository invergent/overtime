import ClaimService from '../../services/ClaimService';
import StaffService from '../../services/StaffService';

class AdministrationHelpers {
  static convertStaffWorksheetToObjectsArray(tenantRef, worksheet) {
    const arrayOfStaff = [];

    worksheet.eachRow((row) => {
      // eslint-disable-next-line
      const [emptyCell, staffId, firstname, lastname, email, phone] = row.values;
      arrayOfStaff.push({
        tenantRef, staffId, firstname, lastname, email, phone
      });
    });

    return arrayOfStaff;
  }

  static convertBranchWorksheetToObjectsArray(tenantRef, worksheet) {
    const arrayOfBranches = [];

    worksheet.eachRow((row) => {
      // eslint-disable-next-line
      const [emptyCell, name, solId, address] = row.values;
      arrayOfBranches.push({
        tenantRef, name, solId, address
      });
    });

    return arrayOfBranches;
  }

  static filterAdminClaimsQueryResult(queryResult) {
    return queryResult.map((result) => {
      const {
        weekday,
        weekend,
        shift,
        amount,
        status,
        monthOfClaim,
        'Staff.staffId': staffId,
        'Staff.firstname': firstname,
        'Staff.lastname': lastname,
        'Staff.branch.solId': solId,
        'Staff.branch.name': branch,
        'Staff.role.name': role
      } = result;
      return {
        weekday,
        weekend,
        shift,
        amount,
        status,
        staffId,
        firstname,
        lastname,
        solId,
        branch,
        monthOfClaim,
        role
      };
    });
  }

  static async submittedClaimsForAdmin(tenantRef) {
    const claims = await ClaimService.fetchSubmittedClaims(tenantRef);
    return AdministrationHelpers.filterAdminClaimsQueryResult(claims);
  }

  static async exportableClaims(tenantRef) {
    const claims = await ClaimService.fetchClaimsInProcessingForExports(tenantRef, 'Processing');
    return AdministrationHelpers.filterAdminClaimsQueryResult(claims);
  }

  static getClaimStatistics(filteredClaims) {
    const claimStats = {
      total: filteredClaims.length, approved: 0, declined: 0, pending: 0
    };
    return filteredClaims.reduce(AdministrationHelpers.statAccumulator, claimStats);
  }

  static statAccumulator(acc, claim) {
    if (['Processing', 'Completed'].includes(claim.status)) acc.approved += 1;
    if (claim.status.includes('Awaiting')) acc.pending += 1;
    if (claim.status === 'Declined') acc.declined += 1;
    if (claim.status === 'Cancelled') acc.total -= 1;
    return acc;
  }

  static getChartStatistics(tenantRef) {
    return ClaimService.getChartStatistics(tenantRef);
  }

  static fetchStaff(tenantRef, attributes) {
    return StaffService.fetchStaff(tenantRef, attributes);
  }
}

export default AdministrationHelpers;
