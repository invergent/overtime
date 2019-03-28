import bcrypt from 'bcrypt';
import services from '../utilities/services';

const { StaffService } = services;

class ChangePassword {
  static async processPasswordUpdate(req) {
    const {
      currentStaff: { staffId }, body: { currentPassword, newPassword }, tenantRef
    } = req;

    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(tenantRef, staffId);
      const isCorrect = await ChangePassword
        .currentPasswordIsCorrect(currentPassword, staff.password);
      if (!isCorrect) {
        return [401, 'Password is incorrect'];
      }

      const updated = await StaffService.updateStaffInfo(tenantRef, staffId, 'password', newPassword);
      return [updated ? 200 : 500, `Password ${updated ? '' : 'not '}changed!`];
    } catch (e) {
      return [500, 'An error occurred ERR500CHGPSW'];
    }
  }

  static currentPasswordIsCorrect(currentPasswordFromUser, currentPasswordFromDB) {
    return bcrypt.compare(currentPasswordFromUser, currentPasswordFromDB);
  }
}

export default ChangePassword;
