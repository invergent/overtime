import ClaimService from '../../services/ClaimService';

class AdministrationHelpers {
  static convertStaffWorksheetToObjectsArray(tenantRef, worksheet) {
    const arrayOfStaff = [];

    worksheet.eachRow((row) => {
      // eslint-disable-next-line
      const [emptyCell, staffId, firstname, lastname, middleName, email] = row.values;
      arrayOfStaff.push({
        tenantRef, staffId, firstname, lastname, middleName, email
      });
    });

    return arrayOfStaff;
  }

  static convertBranchWorksheetToObjectsArray(tenantRef, worksheet) {
    const arrayOfBranches = [];

    worksheet.eachRow((row) => {
      // eslint-disable-next-line
      const [emptyCell, branchName, solId] = row.values;
      arrayOfBranches.push({
        tenantRef, branchName, solId
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
        monthOfClaim: monthofclaim,
        'Staff.staffId': staffId,
        'Staff.firstname': firstname,
        'Staff.lastname': lastname,
        'Staff.middleName': middlename,
        'Staff.branch.solId': solId,
        'Staff.branch.branchName': branch,
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
        middlename,
        solId,
        branch,
        monthofclaim,
        role
      };
    });
  }

  static async submittedClaimsForAdmin(tenantRef) {
    const claims = await ClaimService.fetchSubmittedClaims(tenantRef);
    return AdministrationHelpers.filterAdminClaimsQueryResult(claims);
  }
}

export default AdministrationHelpers;
