// test-sendgrid-connection.js

const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Set the SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Define the test email details
const testEmail = {
  to: 'ripunjaydeka2021@gmail.com', // Replace with the recipient's email for testing
  from: 'Ripunjay.Deka@studentambassadors.com', // Use your verified sender email
  subject: 'Test Email from MLSA TU Chapter',
  text: 'This is a test email to confirm SendGrid configuration.',
};

async function sendTestEmail() {
  try {
    // Send the test email
    await sgMail.send(testEmail);
    console.log("Test email sent successfully to:", testEmail.to);
  } catch (error) {
    console.error("SendGrid email error:", error.response ? error.response.body : error);
  }
}

// Run the test
sendTestEmail();
