import EmailConstructor from '../EmailConstructor';

class EmailNotificationsHelpers {
  static createEmail(tenant, staff, hash, emailTemplateName) {
    const emailDetails = {
      ...staff,
      hash,
      emailTemplateName
    };
    return EmailConstructor.create(tenant, emailDetails);
  }
}

export default EmailNotificationsHelpers;
