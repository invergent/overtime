import bcrypt from 'bcrypt';
import services from '../../services';

const { StaffService } = services;

class ChangePassword {
  static async processPasswordUpdate(req) {
    const {
      currentStaff: { staffId }, body: { currentPassword, newPassword }, tenant
    } = req;

    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(tenant, staffId);
      const isCorrect = await ChangePassword
        .currentPasswordIsCorrect(currentPassword, staff.password);
      if (!isCorrect) {
        return [401, 'Password is incorrect'];
      }

      const updated = await StaffService.updatePassword(tenant, staffId, newPassword);
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
