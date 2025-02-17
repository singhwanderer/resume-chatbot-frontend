import express from 'express';
import { Storage } from '@google-cloud/storage';
import natural from 'natural';
import fs from 'fs';

// Initialize Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Google Cloud Storage configuration
const storage = new Storage();
const bucketName = 'resume-query-chatbot-storage'; // Directly entered bucket name
const fileName = 'resume_singh.txt'; // Directly entered file name

// Initialize natural language processing
const tokenizer = new natural.WordTokenizer();

// Function to retrieve resume text from Google Cloud Storage
async function getResumeText() {
  const file = storage.bucket(bucketName).file(fileName);
  const contents = await file.download();
  return contents.toString('utf8');
}

// Endpoint to interact with the chatbot
app.post('/chatbot', async (req, res) => {
  const userInput = req.body.query;

  try {
    // Retrieve the resume text
    const resumeText = await getResumeText();

    // Tokenize the resume and user input
    const resumeTokens = tokenizer.tokenize(resumeText);
    const inputTokens = tokenizer.tokenize(userInput);

    // Simple matching of input to resume content (can be enhanced)
    const matchedWords = inputTokens.filter(word => resumeTokens.includes(word));

    if (matchedWords.length > 0) {
      res.json({ response: `I found the following information related to your query: ${matchedWords.join(', ')}` });
    } else {
      res.json({ response: "Sorry, I couldn't find any relevant information in the resume." });
    }
  } catch (error) {
    console.error('Error processing request: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
