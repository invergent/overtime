import EmailService from '../../services/EmailService';

class EmailConstructor {
  static async create(tenantRef, emailDetails) {
    const { email: emailAddress, lineManagerEmailAddress, emailTemplateName, hash } = emailDetails;
    const emailTemplate = await EmailService.fetchEmailTemplateByName(tenantRef, emailTemplateName);
    const { htmlMessage, subject } = emailTemplate;

    const personalizedEmail = EmailConstructor.personalizeMessage(emailDetails, htmlMessage);
    return {
      to: hash ? lineManagerEmailAddress : emailAddress,
      subject,
      html: personalizedEmail
    };
  }

  static async createForMany(tenantRef, reciepients, emailTemplateName) {
    const emailTemplate = await EmailService.fetchEmailTemplateByName(tenantRef, emailTemplateName);
    const { htmlMessage, subject } = emailTemplate;

    const personalizedEmails = reciepients.map((reciepient) => {
      const { email: reciepientEmailAddress } = reciepient;
      const personalizedEmail = EmailConstructor.personalizeMessage(reciepient, htmlMessage);

      return {
        to: reciepientEmailAddress,
        subject,
        html: personalizedEmail
      };
    });

    return personalizedEmails;
  }

  static personalizeMessage(reciepient, htmlMessage) {
    const {
      firstname: staffFirstName,
      lastname: staffLastName,
      'supervisor.firstname': supervisorFirstName,
      'supervisor.lastname': supervisorLastName,
      'BSM.firstname': bsmFirstName,
      'BSM.lastname': bsmLastName,
      'company.url': url,
      hash
    } = reciepient;

    return htmlMessage
      .replace(/{{staffFirstName}}/g, staffFirstName)
      .replace(/{{staffLastName}}/g, staffLastName)
      .replace(/{{supervisorFirstName}}/g, supervisorFirstName)
      .replace(/{{supervisorLastName}}/g, supervisorLastName)
      .replace(/{{bsmFirstName}}/g, bsmFirstName)
      .replace(/{{bsmLastName}}/g, bsmLastName)
      .replace(/{{url}}/g, url)
      .replace(/{{hash}}/g, hash);
  }
}

export default EmailConstructor;
