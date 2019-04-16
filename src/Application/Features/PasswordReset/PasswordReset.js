import helpers from '../utilities/helpers';
import services from '../utilities/services';
import notifications from '../utilities/notifications';
import { eventNames, activityNames } from '../utilities/utils/types';

const { krypter, PasswordResetHelper } = helpers;
const { StaffService } = services;

class PasswordReset {
  static async forgotPassword(req) {
    const { body: { staffId, email }, tenantRef } = req;
    const identifier = staffId || email;

    const staff = await StaffService.findStaffByStaffIdOrEmail(tenantRef, identifier, ['company']);
    if (!staff) {
      return [404, 'Staff does not exist'];
    }

    notifications.emit(eventNames.ForgotPassword, [tenantRef, staff]);
    return [200, `We just sent an email to ${staff.email}`];
  }

  static confirmPasswordResetRequest(req) {
    const { hash } = req.query;
    const data = {};

    if (!hash) {
      return [403, 'Invalid reset link'];
    }

    const decrypted = krypter.decryptCryptrHash(hash);
    const [secret, staffId] = decrypted.split(' ');

    if (secret !== process.env.RESET_SECRET) {
      return [403, 'Decryption failed!'];
    }

    const hashedToken = krypter.authenticationEncryption('staff', { staffId });
    data.hashedToken = hashedToken;
    return [200, 'Decryption successful!', data];
  }

  static async resetPassword(req) {
    const {
      currentStaff: { staffId }, query: { hash }, body: { password }, tenantRef
    } = req;

    try {
      const [statusCode, message] = await PasswordResetHelper
        .findAndValidateResetRequest(tenantRef, staffId, hash);

      if (message !== 'valid') return [statusCode, message];

      const updated = await StaffService.updateStaffInfo(tenantRef, staffId, { password });
      if (updated) notifications.emit(eventNames.LogActivity, [activityNames.PasswordReset, staffId]);

      return [updated ? 200 : 500, `Password reset ${updated ? '' : 'un'}successful!`];
    } catch (e) {
      return [500, 'An error occured ERR500PSWRST'];
    }
  }
}

export default PasswordReset;
