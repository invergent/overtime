class EmailConstructor {
  static async create(emailDetails, emailModel) {
    const {
      staff: { firstname, email }, emailTemplateName, passwordResetHash
    } = emailDetails;

    const emailTemplate = await emailModel.findOne(
      { where: { name: emailTemplateName }, raw: true }
    );
    const { htmlMessage } = emailTemplate;

    const personalizedMessage = this.personalizeMessage(firstname, passwordResetHash, htmlMessage);

    return {
      to: email,
      subject: emailTemplate.subject,
      html: personalizedMessage
    };
  }

  static personalizeMessage(name, passwordResetHash, htmlMessage) {
    return htmlMessage.replace(/{{name}}/g, name).replace(/{{hash}}/g, passwordResetHash);
  }
}

export default EmailConstructor;
