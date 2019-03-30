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
}

export default AdministrationHelpers;
