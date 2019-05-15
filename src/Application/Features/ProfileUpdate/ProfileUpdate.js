import StaffService from "../utilities/services/StaffService";

class ProfileUpdate {
  static async profileInfo(req) {
    const { tenantRef, currentStaff: { staffId }, body } = req;

    try {
      const updated = await StaffService.updateStaffInfo(tenantRef, staffId, body);
      
      return [updated ? 200 : 500, `Profile ${updated ? '' : 'not '}updated!`];      
    } catch (e) {
      return [500, 'An error occurred ERR500PRFUPD'];
    }
  }
}

export default ProfileUpdate;