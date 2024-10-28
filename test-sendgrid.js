const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendTestEmail() {
  const msg = {
    to: 'ripunjaydeka141@gmail.com', // Replace with an email you control for testing
    from: 'Ripunjay.Deka@studentambassadors.com', // Verified sender email in SendGrid
    subject: 'Test Email from SendGrid',
    text: 'This is a test email to confirm SendGrid configuration.',
  };

  try {
    await sgMail.send(msg);
    console.log('Test email sent successfully');
  } catch (error) {
    console.error('SendGrid email error:', error.response ? error.response.body : error);
  }
}

sendTestEmail();
