const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Create a nodemailer transporter with your email service provider credentials
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'yvishnuvamsith@gmail.com',
    pass: 'ftly gard wakp xwec',
  },
});

router.post('/Location', async (req, res) => {
  const { latitude, longitude } = req.body;

  // Compose the email
  const mailOptions = {
    from: 'yvishnuvamsith@gmail.com',
    to: 'vuddagiripranav@gmail.com', // Admin's email address
    subject: 'Emergency Location',
    text: `Emergency Location Coordinates:\nLatitude: ${latitude}\nLongitude: ${longitude}`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Emergency location sent successfully' });
  } catch (error) {
    console.error('Error sending emergency location email:', error);
    res.status(500).json({ message: 'An error occurred while sending the emergency location' });
  }
});

module.exports = router;
