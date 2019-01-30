import bcrypt from 'bcrypt';

class ChangePassword {
  static async processPasswordUpdate(req, models) {
    const {
      currentStaff, body: { currentPassword, newPassword }
    } = req;

    try {
      const staff = await ChangePassword.findStaffByStaffId(currentStaff.staffId, models);
      const isCorrect = await ChangePassword
        .currentPasswordIsCorrect(currentPassword, staff.password);
      if (!isCorrect) {
        return [401, 'Password is incorrect'];
      }

      await ChangePassword.updatePassword(currentStaff.staffId, newPassword, models);
      return [200, 'Password changed'];
    } catch (e) {
      return [500, 'An error occurred ERR500CHGPSW'];
    }
  }

  static currentPasswordIsCorrect(currentPasswordFromUser, currentPasswordFromDB) {
    return bcrypt.compare(currentPasswordFromUser, currentPasswordFromDB);
  }

  static findStaffByStaffId(staffId, models) {
    return models.Staff.findOne({ where: { staffId }, raw: true });
  }

  static updatePassword(staffId, newPassword, models) {
    return models.Staff.update({ password: newPassword }, { where: { staffId } });
  }
}

export default ChangePassword;
