# 🛡️ AI Fake News Detector

An AI-powered web application designed to analyze news content and identify potentially fake or misleading information using Natural Language Processing and Machine Learning.

The project combines a modern web interface, a Node.js backend, and a dedicated Python-based Machine Learning service to provide text-based fake news classification and image/deepfake analysis.

---

## 🚀 Features

- 📰 **Fake News Detection**
  - Analyze news text using an AI-based text classification model.
  - Returns a predicted label along with a confidence score.

- 🤖 **BERT-Based NLP Model**
  - Uses the Hugging Face `mrm8488/bert-tiny-finetuned-fake-news` model for fake-news classification.

- 🖼️ **Image / Deepfake Analysis**
  - Accepts image data for analysis.
  - Uses an image-processing heuristic based on Laplacian variance to estimate whether an image may be suspicious.

- ⚡ **Dedicated ML Service**
  - Machine Learning functionality is separated into its own Python service.
  - Flask provides API endpoints for model predictions.

- 🌐 **Full-Stack Architecture**
  - Frontend for user interaction.
  - Node.js/Express backend for application logic.
  - Python ML service for AI inference.

- 🔌 **REST APIs**
  - Text prediction endpoint.
  - Image/deepfake prediction endpoint.

- 🐳 **Docker Support**
  - Includes Docker Compose configuration for running project services together.

---

## 🧠 How It Works

The application follows a multi-service architecture:

```text
                    ┌─────────────────────┐
                    │      User           │
                    │  News / Image Input │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Frontend       │
                    │   React / Next.js   │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Node.js Backend   │
                    │ Express + TypeScript│
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
          ┌─────────────────┐   ┌─────────────────┐
          │ Text Prediction │   │ Image Analysis  │
          │                 │   │                 │
          │ BERT Fake News  │   │ OpenCV + PIL    │
          │ Classification  │   │ Image Heuristic │
          └─────────────────┘   └─────────────────┘
                    │                     │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Prediction + Score  │
                    └─────────────────────┘
