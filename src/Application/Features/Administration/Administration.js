import helpers from '../utilities/helpers';
import services from '../utilities/services';
import notifications from '../utilities/notifications';
import { eventNames } from '../utilities/utils/types';

const { AdministrationHelpers } = helpers;
const { StaffService, BranchService, ClaimService } = services;

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
      return [500, 'There was an error creating branches ERR500CRTBRC.', e];
    }
  }

  static async submittedClaims(req) {
    const { tenantRef } = req;
    try {
      const claims = await AdministrationHelpers.submittedClaimsForAdmin(tenantRef);
      return [200, `Found ${claims.length} claims`, claims];
    } catch (e) {
      return [500, 'There was a problem fetching claims ERR500ADMCLM.'];
    }
  }

  static async markClaimsAsCompleted(req) {
    const { tenantRef } = req;
    try {
      const [updated] = await ClaimService.markClaimsAsCompleted(tenantRef);
      
      if (updated) {
        notifications.emit(eventNames.Completed, [{ tenantRef }]);
      }
      return [
        200,
        updated
          ? `Successfully marked ${updated} claims as completed.`
          : 'No claims were marked as completed.'
      ];
    } catch (e) {
      return [500, 'An error occurred while marking claims as completed ERR500CLMMCC.', e];
    }
  }
}

export default Administration;
