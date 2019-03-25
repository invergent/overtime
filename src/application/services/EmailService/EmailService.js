import models from '../../database/models';

const { EmailTemplate } = models;

class EmailService {
  static fetchEmailTemplateByName(tenantRef, templateName) {
    return EmailTemplate.findOne({ where: { name: templateName }, raw: true });
  }
}

export default EmailService;
