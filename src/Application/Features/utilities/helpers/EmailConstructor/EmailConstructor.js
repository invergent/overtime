import EmailService from '../../services/EmailService';

class EmailConstructor {
  static async create(tenantRef, emailDetails) {
    const { email: staffEmailAddress, lineManagerEmailAddress, emailTemplateName } = emailDetails;
    const emailTemplate = await EmailService.fetchEmailTemplateByName(tenantRef, emailTemplateName);
    const { htmlMessage, subject } = emailTemplate;

    let toEmailAddress;

    if (emailTemplateName.includes('Staff')) {
      toEmailAddress = staffEmailAddress;
    } else {
      toEmailAddress = lineManagerEmailAddress;
    }

    const personalizedEmail = EmailConstructor.personalizeMessage(emailDetails, htmlMessage);
    return {
      to: toEmailAddress,
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
      supervisor,
      BSM,
      company,
      hash,
      monthOfClaim,
      amount
    } = reciepient;
    let supervisorFirstName;
    let supervisorLastName;
    let bsmFirstName;
    let bsmLastName;
    let url;

    if (supervisor) {
      const { firstname, lastname } = supervisor;
      [supervisorFirstName, supervisorLastName] = [firstname, lastname];
    }
    if (BSM) {
      const { firstname, lastname } = BSM;
      [supervisorFirstName, supervisorLastName] = [firstname, lastname];
    }
    if (company) {
      url = company.url; // eslint-disable-line
    }

    return htmlMessage
      .replace(/{{staffFirstName}}/g, staffFirstName)
      .replace(/{{staffLastName}}/g, staffLastName)
      .replace(/{{supervisorFirstName}}/g, supervisorFirstName)
      .replace(/{{supervisorLastName}}/g, supervisorLastName)
      .replace(/{{bsmFirstName}}/g, bsmFirstName)
      .replace(/{{bsmLastName}}/g, bsmLastName)
      .replace(/{{url}}/g, url)
      .replace(/{{hash}}/g, hash)
      .replace(/{{amount}}/g, amount)
      .replace(/{{monthOfClaim}}/g, monthOfClaim);
  }
}

export default EmailConstructor;
