import services from '../../services';

const { EmailService } = services;

class EmailConstructor {
  static async create(tenant, emailDetails) {
    const { email, emailTemplateName } = emailDetails;

    const emailTemplate = await EmailService.fetchEmailTemplateByName(tenant, emailTemplateName);
    const { htmlMessage, subject } = emailTemplate;

    const personalizedEmail = EmailConstructor.personalizeMessage(emailDetails, htmlMessage);

    return {
      to: email,
      subject,
      html: personalizedEmail
    };
  }

  static personalizeMessage(emailDetails, htmlMessage) {
    const {
      firstname: staffFirstName,
      lastname: staffLastName,
      'supervisor.firstname': supervisorFirstName,
      'supervisor.lastname': supervisorLastName,
      'BSM.firstname': bsmFirstName,
      'BSM.lastname': bsmLastName,
      hash
    } = emailDetails;

    return htmlMessage
      .replace(/{{staffFirstName}}/g, staffFirstName)
      .replace(/{{staffLastName}}/g, staffLastName)
      .replace(/{{supervisorFirstName}}/g, supervisorFirstName)
      .replace(/{{supervisorLastName}}/g, supervisorLastName)
      .replace(/{{bsmFirstName}}/g, bsmFirstName)
      .replace(/{{bsmLastName}}/g, bsmLastName)
      .replace(/{{hash}}/g, hash);
  }
}

export default EmailConstructor;
