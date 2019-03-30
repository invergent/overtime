import helpers from '../utilities/helpers';
import services from '../utilities/services';

const { AdministrationHelpers } = helpers;
const { StaffService, BranchService } = services;

class Administration {
  static async createStaff(req) {
    const { tenantRef, worksheet } = req;
    const worksheetConverter = AdministrationHelpers.convertStaffWorksheetToObjectsArray;

    try {
      const staffArray = worksheetConverter(tenantRef, worksheet);
      const results = await StaffService.bulkCreateStaff(staffArray);
      const createdStaff = results.map(result => result.dataValues);
      return [201, `${createdStaff.length} staff created successfully.`, createdStaff];
    } catch (e) {
      return [500, 'There was an error creating staff ERR500CRTSTF.', e];
    }
  }

  static async createBranches(req) {
    const { tenantRef, worksheet } = req;
    const worksheetConverter = AdministrationHelpers.convertBranchWorksheetToObjectsArray;

    try {
      const branchesArray = worksheetConverter(tenantRef, worksheet);
      const results = await BranchService.bulkCreateBranches(branchesArray);
      const createdBranches = results.map(result => result.dataValues);
      return [201, `${createdBranches.length} branches created successfully.`, createdBranches];
    } catch (e) {
      console.log(e);
      return [500, 'There was an error creating branches ERR500CRTBRC.', e];
    }
  }
}

export default Administration;
