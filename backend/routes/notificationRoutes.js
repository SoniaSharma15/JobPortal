import express from 'express';
import { sendEmail } from '../utils/emailService.js';

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;
  try {
    await sendEmail(to, subject, message);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

export default router;