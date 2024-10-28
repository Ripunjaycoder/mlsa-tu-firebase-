const express = require('express');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Firebase configuration and setup
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

app.post('/api/submit-form', async (req, res) => {
  const { name, email } = req.body;

  // Log the request body to ensure data is being received
  console.log("Received form submission:", { name, email });

  if (!name || !email) {
    console.log("Error: Missing name or email.");
    return res.status(400).json({ success: false, message: "Name and email are required." });
  }

  try {
    // Adding user data to Firebase
    const docRef = await addDoc(collection(db, "members"), { name, email });
    console.log("Document written to Firebase with ID:", docRef.id);

    // Prepare the confirmation email
    const msg = {
    to: email,
    from: 'Ripunjay.Deka@studentambassadors.com',
    subject: 'Thank you for registering!',
    html: `
        <p>Hello <strong>${name}</strong>, thank you for registering with MLSA TU Chapter!</p>
        <p>Please visit our 
            <a href="https://mvp.microsoft.com/studentambassadors" target="_blank">Microsoft Student Ambassadors</a> page
            and join our 
            <a href="https://chat.whatsapp.com/EbM3IMWPN1YI8OemScHKZ5" target="_blank">WhatsApp group</a> for future updates.
        </p>
        <p>Have a Great Day Ahead!</p>
    `,
};


    // Send the confirmation email
    await sgMail.send(msg);
    console.log("Confirmation email sent to:", email);

    // Send a detailed response back to the client
    res.json({
      success: true,
      message: `Thank you for registering, ${name}! A confirmation email has been sent to ${email}. Join our WhatsApp group and follow us on Microsoft Student Ambassadors for updates.`,
    });

  } catch (error) {
    // Log detailed error information for debugging
    console.error("Error details:", error);
    res.status(500).json({ success: false, message: 'Error submitting form or sending email' });
  }
});

module.exports = app;

