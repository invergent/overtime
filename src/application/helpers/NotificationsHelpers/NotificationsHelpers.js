import EmailConstructor from '../EmailConstructor';
import { templateNames, roleNames } from '../../utils/types';
import krypter from '../krypter';


class NotificationsHelpers {
  static staffEmailTemplateName(lineManagerRole, notificationType) {
    if (notificationType === 'Cancelled') return templateNames[notificationType];
    if (lineManagerRole) return templateNames[`${lineManagerRole}${notificationType}`];
    return templateNames.NewClaimStaff;
  }

  static createLineManagerEmailDetails(staff, lineManagerRole) {
    const emailTemplateName = lineManagerRole === roleNames.Bsm
      ? templateNames.NewClaimBSM : templateNames.NewClaimSupervisor;
    const id = lineManagerRole === roleNames.Bsm
      ? staff['BSM.id'] : staff['supervisor.id'];
    const lineManagerId = lineManagerRole === roleNames.Bsm
      ? staff['BSM.lineManagerId'] : staff['supervisor.lineManagerId'];

    const payload = { id, lineManagerId, lineManagerRole };
    const hashedToken = krypter.authenticationEncryption('lineManager', payload);

    return [hashedToken, emailTemplateName];
  }

  static createEmail(tenant, staff, emailTemplateName, hash) {
    const emailDetails = {
      ...staff,
      emailTemplateName,
      hash
    };
    return EmailConstructor.create(tenant, emailDetails);
  }
}

export default NotificationsHelpers;
