import express from 'express';
import cors from 'cors';
import axios from 'axios';
import multer from 'multer';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Health check
app.get('/', (_req, res) => {
  res.json({
    message: 'AI Fake News Detector Backend is running'
  });
});

// Text analysis
app.post('/api/analyze/text', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: 'Text is required'
      });
    }

    const response = await axios.post(
      'http://127.0.0.1:5000/predict_text',
      { text }
    );

    res.json(response.data);
  } catch (error: any) {
    console.error('Text analysis error:', error.message);

    res.status(500).json({
      error: 'ML service unavailable',
      details: error.message
    });
  }
});

// Media analysis
app.post('/api/analyze/media', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'File is required'
      });
    }

    const response = await axios.post(
      'http://127.0.0.1:5000/predict_deepfake',
      req.file.buffer,
      {
        headers: {
          'Content-Type': req.file.mimetype
        }
      }
    );

    res.json(response.data);
  } catch (error: any) {
    console.error('Media analysis error:', error.message);

    res.status(500).json({
      error: 'ML service unavailable',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://127.0.0.1:${PORT}`);
});