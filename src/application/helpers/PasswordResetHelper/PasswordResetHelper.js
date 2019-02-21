import bcrypt from 'bcrypt';
import EmailConstructor from '../EmailConstructor';
import krypter from '../krypter';
import types from '../../utils/types';
import tenantsModels from '../../database/tenantsModels';

class PasswordResetHelper {
  static async processResetEmailMessage(staff, tenant) {
    const { staffId } = staff;
    const { EmailTemplate, PasswordResetRequest } = tenantsModels[tenant];

    const passwordResetHash = krypter.createCryptrHash(`${process.env.RESET_SECRET} ${staffId}`);
    await PasswordResetRequest.upsert({ staffId, passwordResetHash, status: 'Pending' });

    const passwordResetDetails = { staff, passwordResetHash, emailTemplateName: types.Reset };
    const message = await EmailConstructor.create(passwordResetDetails, EmailTemplate);
    return message;
  }

  static async findAndValidateResetRequest(currentStaffId, hash, PasswordResetRequestModel) {
    const staffPasswordResetRequest = await PasswordResetRequestModel.findOne({
      where: { staffId: currentStaffId }, raw: true
    });

    if (!staffPasswordResetRequest) {
      return [404, 'Reset link is expired'];
    }

    if (hash !== staffPasswordResetRequest.passwordResetHash) {
      return [403, 'Reset link is invalid'];
    }

    await PasswordResetRequestModel.destroy({ where: { staffId: currentStaffId } });
    return [200, 'valid'];
  }

  static async processPasswordReset(currentStaffId, newPasswordFromUser, StaffModel) {
    const passwordHash = bcrypt.hashSync(newPasswordFromUser, 7);
    await StaffModel.update({ password: passwordHash }, { where: { staffId: currentStaffId } });
    return [200, 'Password reset successful!'];
  }
}

export default PasswordResetHelper;
