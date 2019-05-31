import StaffService from '../utilities/services/StaffService';

class ProfileUpdate {
  static async profileInfo(req) {
    const {
      tenantRef, currentStaff, currentAdmin, body
    } = req;

    const requester = currentStaff || currentAdmin;

    try {
      const updated = await StaffService.updateStaffInfo(tenantRef, requester.staffId, body);
      
      return [updated ? 200 : 500, `Profile ${updated ? '' : 'not '}updated!`];
    } catch (e) {
      return [500, 'An error occurred ERR500PRFUPD'];
    }
  }
}

export default ProfileUpdate;
