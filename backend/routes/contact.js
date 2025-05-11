const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Create new contact entry
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    // Save to database
    await contact.save();

    // Send response
    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message. Please try again later.'
    });
  }
});

module.exports = router;
