class AdministrationHelpers {
  static convertWorksheetToObjectsArray(tenantRef, worksheet) {
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
}

export default AdministrationHelpers;
