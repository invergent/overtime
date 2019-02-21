import bcrypt from 'bcrypt';
import tenantsModels from '../../database/tenantsModels';

class ChangePassword {
  static async processPasswordUpdate(req) {
    const {
      currentStaff, body: { currentPassword, newPassword }, tenant
    } = req;

    try {
      const staff = await ChangePassword.findStaffByStaffId(currentStaff.staffId, tenant);
      const isCorrect = await ChangePassword
        .currentPasswordIsCorrect(currentPassword, staff.password);
      if (!isCorrect) {
        return [401, 'Password is incorrect'];
      }

      await ChangePassword.updatePassword(currentStaff.staffId, newPassword, tenant);
      return [200, 'Password changed'];
    } catch (e) {
      return [500, 'An error occurred ERR500CHGPSW'];
    }
  }

  static currentPasswordIsCorrect(currentPasswordFromUser, currentPasswordFromDB) {
    return bcrypt.compare(currentPasswordFromUser, currentPasswordFromDB);
  }

  static findStaffByStaffId(staffId, tenant) {
    const { Staff } = tenantsModels[tenant];
    return Staff.findOne({ where: { staffId }, raw: true });
  }

  static updatePassword(staffId, newPassword, tenant) {
    const { Staff } = tenantsModels[tenant];
    return Staff.update({ password: newPassword }, { where: { staffId } });
  }
}

export default ChangePassword;
