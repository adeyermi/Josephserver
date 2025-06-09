// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { sendNotificationEmail, sendVoiceRecordingEmail } = require('./emailService');

const app = express();
app.use(cors());
app.use(express.json());

// ROUTE 1: Notify admin user started revision
app.post('/api/notify-admin', async (req, res) => {
  const { name, gender } = req.body;
  if (!name || !gender) return res.status(400).json({ error: 'Name and gender required' });

  try {
    await sendNotificationEmail(name, gender);
    res.json({ message: 'Admin notified' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send notification email' });
  }
});

// Multer setup (still used for voice recording)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// ROUTE 2: Upload voice recording & email to admin
app.post('/api/upload-recording', upload.single('audio'), async (req, res) => {
  const { name, gender, quizType } = req.body;
  if (!name || !gender || !quizType) {
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'Missing name, gender or quizType' });
  }
  if (!req.file) return res.status(400).json({ error: 'No audio file uploaded' });

  try {
    await sendVoiceRecordingEmail(name, gender, quizType, req.file.path, req.file.originalname);
    res.json({ message: 'Recording received and emailed to admin' });
  } catch (err) {
    console.error('Email error:', err);
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: 'Failed to send recording email' });
  }
});

// ROUTE 3: Serve single files (Exercise.pdf or MemoryVerse.pdf)
app.get('/api/single/:type', (req, res) => {
  const { type } = req.params;
  const filePath = path.join(__dirname, 'uploads', 'documents', `${type}.pdf`);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).json({ message: 'File not found' });
    res.download(filePath);
  });
});

// // ROUTE 4: List all past question files

app.get('/api/pastquestions', (req, res) => {
  const dir = path.join(__dirname, 'uploads', 'documents', 'PastQuestions');
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).json({ message: 'Failed to load past questions' });

    const pdfs = files.filter(file => file.toLowerCase().endsWith('.pdf'));
    res.json(pdfs);
  });
});


// ROUTE 5: Serve individual past question file
app.get('/api/pastquestions/:filename', (req, res) => {
  // decodeURIComponent to handle spaces and special characters in filename
  const filename = decodeURIComponent(req.params.filename);
  const filePath = path.join(__dirname, 'uploads', 'documents', 'PastQuestions', filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).json({ message: 'File not found' });
    res.download(filePath);
  });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
