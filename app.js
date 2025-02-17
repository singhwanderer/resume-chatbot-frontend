import express from 'express';
import { Storage } from '@google-cloud/storage';
import path from 'path';

// Create a new Express app
const app = express();
const port = process.env.PORT || 8080;

// Initialize Google Cloud Storage
const storage = new Storage();
const bucketName = process.env.BUCKET_NAME; // Use environment variable for bucket name
const resumeFileName = process.env.RESUME_FILE; // Use environment variable for resume file name

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to fetch the resume file from GCS
app.get('/resume', async (req, res) => {
  try {
    const file = storage.bucket(bucketName).file(resumeFileName);
    const fileExists = await file.exists();

    if (fileExists[0]) {
      res.status(200).sendFile(file.publicUrl());
    } else {
      res.status(404).send('Resume file not found');
    }
  } catch (error) {
    console.error('Error fetching resume file:', error);
    res.status(500).send('Error fetching resume file');
  }
});

// Endpoint for authentication (e.g., anonymous sign-in)
app.get('/sign-in', (req, res) => {
  // Replace this with your authentication logic if not using Firebase
  res.status(200).send('Signed in anonymously');
});

// Handle other requests (for now, just send a generic response)
app.get('/', (req, res) => {
  res.send('Welcome to Resume Query Chatbot!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

