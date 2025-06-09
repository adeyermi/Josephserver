// backend/emailService.js
require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

function sendNotificationEmail(name, gender) {
  return new Promise((resolve, reject) => {
    const title = gender.toLowerCase() === 'male' ? 'Brother' : 'Sister';

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `Revision Started by ${title} ${name}`,
      text: `User ${title} ${name} has started their revision.`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return reject(err);
      resolve(info);
    });
  });
}

function sendVoiceRecordingEmail(name, gender, quizType, filePath, originalFilename) {
  return new Promise((resolve, reject) => {
    const title = gender.toLowerCase() === 'male' ? 'Brother' : 'Sister';

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `Voice Recording from ${title} ${name} (${quizType})`,
      text: `${title} ${name} submitted a voice recording for quiz type: ${quizType}`,
      attachments: [
        {
          filename: originalFilename,
          path: filePath,
        }
      ],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      // Delete the file after sending email
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) console.error('Failed to delete file:', unlinkErr);
      });

      if (err) return reject(err);
      resolve(info);
    });
  });
}

module.exports = {
  sendNotificationEmail,
  sendVoiceRecordingEmail
};
