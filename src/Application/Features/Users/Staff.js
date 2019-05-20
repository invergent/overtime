import services from '../utilities/services';
import helpers from '../utilities/helpers';
import models from '../../Database/models';

const { ClaimHelpers, UsersHelpers } = helpers;
const { ActivityService, StaffService } = services;
const { Claims } = models;

class Staff {
  static async dashboardData(req) {
    const { currentStaff: { staffId }, tenantRef, path } = req;

    try {
      const data = path.includes('statistics')
        ? await ClaimHelpers.getStaffClaimStats(tenantRef, staffId)
        : await ClaimHelpers.fetchStaffPendingClaim(tenantRef, staffId);

      return [200, 'Request successful', data];
    } catch (e) {
      return [500, 'An error occurred ERR500DSHBOD.'];
    }
  }

  static async activities(req) {
    const { currentStaff: { staffId }, query: { limit } } = req;
    try {
      const activities = await ActivityService.fetchActivities(staffId, limit);
      return [200, 'Request successful', activities];
    } catch (e) {
      return [500, 'An error occurred ERR500ACTVTY.'];
    }
  }

  static async profileData(req) {
    const { tenantRef, currentStaff, currentAdmin } = req;
    const currentUser = currentStaff || currentAdmin;
    const includes = ['supervisor', 'BSM', 'role', 'branch'];
    
    try {
      const staffData = await StaffService.fetchStaffByPk(tenantRef, currentUser.id, includes);
      const refinedStaffData = UsersHelpers.refineUserData(staffData);
      return [200, 'Request successful', refinedStaffData];
    } catch (e) {
      console.log(e);
      
      return [500, 'An error occurred ERR500PROFIL.'];
    }
  }

  static async claimHistory(req) {
    const { tenantRef, currentStaff: { id } } = req;
    try {
      const staffClaimsData = await StaffService.fetchStaffByPk(tenantRef, id, [Claims], [[Claims, 'createdAt', 'DESC']]);
      return [200, 'Request successful', staffClaimsData.Claims];
    } catch (e) {
      return [500, 'An error occurred ERR500STFCLM.'];
    }
  }
}

export default Staff;
