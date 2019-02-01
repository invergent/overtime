import sendgrid from '@sendgrid/mail';

class Mailer {
  constructor(client) {
    this.from = process.env[`${client}_EMAIL_ADDRESS`];
  }

  create(email) {
    const { to, subject, html } = email;
    return {
      from: this.from,
      to: 'invergenttechnologies@gmail.com',
      subject,
      html
    };
  }

  send(email) {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    const formattedEmail = this.create(email);
    sendgrid.send(formattedEmail);
  }
}

export default Mailer;
