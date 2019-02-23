import tenantsModels from '../../database/tenantsModels';

class EmailService {
  static fetchEmailTemplateByName(tenant, templateName) {
    const { EmailTemplate } = tenantsModels[tenant];
    return EmailTemplate.findOne({ where: { name: templateName }, raw: true });
  }
}

export default EmailService;
