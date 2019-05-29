import bcrypt from 'bcrypt';
import services from '../utilities/services';
import { eventNames, activityNames } from '../utilities/utils/types';
import notifications from '../utilities/notifications';

const { StaffService } = services;

class ChangePassword {
  static async processPasswordUpdate(req) {
    const {
      currentStaff: { staffId }, body: { currentPassword, newPassword }, tenantRef
    } = req;
    const updatePayload = {};

    try {
      const staff = await StaffService.findStaffByStaffIdOrEmail(tenantRef, staffId);
      const isCorrect = await ChangePassword
        .currentPasswordIsCorrect(currentPassword, staff.password);
      if (!isCorrect) return [401, 'Password is incorrect'];

      if (currentPassword === 'password') updatePayload.changedPassword = true;
      updatePayload.password = bcrypt.hashSync(newPassword, 8);

      const updated = await StaffService.updateStaffInfo(tenantRef, staffId, updatePayload);

      if (updated) {
        notifications.emit(eventNames.LogActivity, [activityNames.ChangePassword, staffId]);
      }

      return [updated ? 200 : 500, `Password ${updated ? '' : 'not '}changed!`];
    } catch (e) {
      return [500, 'An error occurred ERR500CHGPSW'];
    }
  }

  static currentPasswordIsCorrect(currentPasswordFromUser, currentPasswordFromDB) {
    if (currentPasswordFromUser === currentPasswordFromDB) {
      return true;
    }
    return bcrypt.compare(currentPasswordFromUser, currentPasswordFromDB);
  }
}

export default ChangePassword;
