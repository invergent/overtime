import helpers from '../../helpers';

const { Mailer, krypter, PasswordResetHelper } = helpers;

class PasswordReset {
  static async forgotPassword(req, models, client) {
    const { Staff } = models;
    const { staffId } = req.body;
    const mailer = new Mailer(client);

    const staff = await Staff.findOne({ where: { staffId } });

    if (!staff) {
      return [404, 'Staff does not exist'];
    }

    const message = await PasswordResetHelper.processResetEmailMessage(staff, models);

    mailer.send(message);
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

    const hashedToken = krypter.authenticationEncryption('staffId', staffId);
    data.hashedToken = hashedToken;
    return [200, 'Decryption successful!', data];
  }

  static async resetPassword(req, model) {
    const { currentStaffId, query: { hash }, body: { password } } = req;
    const { Staff, PasswordResetRequest } = model;

    try {
      let [statusCode, message] = await PasswordResetHelper
        .findAndValidateResetRequest(currentStaffId, hash, PasswordResetRequest);

      if (message !== 'valid') {
        return [statusCode, message];
      }

      [statusCode, message] = PasswordResetHelper
        .processPasswordReset(currentStaffId, password, Staff);
      return [statusCode, message];
    } catch (e) {
      return [500, 'An error occured ERR500PSWRST'];
    }
  }
}

export default PasswordReset;
