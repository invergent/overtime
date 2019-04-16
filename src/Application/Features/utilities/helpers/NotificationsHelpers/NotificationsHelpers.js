import EmailConstructor from '../EmailConstructor';
import { templateNames, roleNames } from '../../utils/types';
import krypter from '../krypter';


class NotificationsHelpers {
  static staffEmailTemplateName(lineManagerRole, notificationType) {
    if (lineManagerRole) return templateNames[`${lineManagerRole}${notificationType}`];
    if (notificationType) return templateNames[notificationType];
    return templateNames.NewClaimStaff;
  }

  static createLineManagerEmailDetails(staff, lineManagerRole) {
    const emailTemplateName = lineManagerRole === roleNames.BSM
      ? templateNames.NewClaimBSM : templateNames.NewClaimSupervisor;
    const id = lineManagerRole === roleNames.BSM
      ? staff['BSM.id'] : staff['supervisor.id'];

    const payload = { id, lineManagerRole };
    const hashedToken = krypter.authenticationEncryption('lineManager', payload);

    return [hashedToken, emailTemplateName];
  }

  static createEmail(tenantRef, staff, emailTemplateName, hash) {
    const emailDetails = {
      ...staff,
      emailTemplateName,
      hash
    };
    return EmailConstructor.create(tenantRef, emailDetails);
  }

  static createMultipleEmails(tenantRef, reciepients, notificationType) {
    const template = NotificationsHelpers.staffEmailTemplateName(undefined, notificationType);
    return EmailConstructor.createForMany(tenantRef, reciepients, template);
  }
}

export default NotificationsHelpers;
