import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [text, setText] = useState('');
  const [textResult, setTextResult] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [mediaResult, setMediaResult] = useState<any>(null);
  const [loadingText, setLoadingText] = useState(false);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [error, setError] = useState('');

  async function analyzeText() {
    if (!text.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }

    setError('');
    setTextResult(null);
    setLoadingText(true);

    try {
      const r = await axios.post('/api/analyze/text', { text });
      setTextResult(r.data);
    } catch {
      setError('Unable to analyze the text. Please try again.');
    } finally {
      setLoadingText(false);
    }
  }

  async function analyzeMedia() {
    if (!file) {
      setError('Please select an image first.');
      return;
    }

    setError('');
    setMediaResult(null);
    setLoadingMedia(true);

    try {
      const fd = new FormData();
      fd.append('file', file);

      const r = await axios.post('/api/analyze/media', fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMediaResult(r.data);
    } catch {
      setError('Unable to analyze the media. Please try again.');
    } finally {
      setLoadingMedia(false);
    }
  }

  const textConfidence = textResult
    ? (textResult.score * 100).toFixed(2)
    : null;

  const mediaConfidence = mediaResult
    ? (mediaResult.score * 100).toFixed(2)
    : null;

  return (
    <main style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <header style={styles.header}>
          <div style={styles.logo}>AI</div>

          <div>
            <h1 style={styles.title}>
              AI Fake News Detector
            </h1>

            <p style={styles.subtitle}>
              Detect suspicious news and manipulated media using AI
            </p>
          </div>
        </header>

        {/* Status */}
        <div style={styles.status}>
          <span style={styles.statusDot}></span>
          AI Detection System Online
        </div>

        {/* Error */}
        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {/* Text Analysis */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.icon}>📰</div>

            <div>
              <h2 style={styles.cardTitle}>
                Text Analysis
              </h2>

              <p style={styles.cardDescription}>
                Analyze a news article or claim for suspicious content.
              </p>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste a news article or claim here..."
            rows={7}
            style={styles.textarea}
          />

          <button
            onClick={analyzeText}
            disabled={loadingText}
            style={{
              ...styles.button,
              opacity: loadingText ? 0.7 : 1
            }}
          >
            {loadingText ? 'Analyzing...' : 'Analyze News'}
          </button>

          {textResult && (
            <div style={styles.result}>
              <div style={styles.resultTop}>
                <div>
                  <p style={styles.resultLabel}>
                    MODEL RESULT
                  </p>

                  <h3 style={styles.resultValue}>
                    {textResult.label}
                  </h3>
                </div>

                <div style={styles.confidence}>
                  {textConfidence}%
                </div>
              </div>

              <div style={styles.progressBackground}>
                <div
                  style={{
                    ...styles.progress,
                    width: `${textResult.score * 100}%`
                  }}
                />
              </div>

              <p style={styles.resultInfo}>
                Confidence score from the AI text classifier.
              </p>
            </div>
          )}
        </section>

        {/* Media Analysis */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.icon}>🖼️</div>

            <div>
              <h2 style={styles.cardTitle}>
                Media Analysis
              </h2>

              <p style={styles.cardDescription}>
                Screen an image for possible manipulation.
              </p>
            </div>
          </div>

          <label style={styles.uploadBox}>
            <div style={styles.uploadIcon}>📁</div>

            <strong>
              {file ? file.name : 'Choose an image'}
            </strong>

            <span style={styles.uploadText}>
              PNG, JPG, JPEG and other image formats
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFile(e.target.files?.[0] ?? null)
              }
              style={{ display: 'none' }}
            />
          </label>

          <button
            onClick={analyzeMedia}
            disabled={loadingMedia}
            style={{
              ...styles.button,
              opacity: loadingMedia ? 0.7 : 1
            }}
          >
            {loadingMedia ? 'Analyzing...' : 'Analyze Image'}
          </button>

          {mediaResult && (
            <div style={styles.result}>
              <div style={styles.resultTop}>
                <div>
                  <p style={styles.resultLabel}>
                    SCREENING RESULT
                  </p>

                  <h3 style={styles.resultValue}>
                    {mediaResult.label}
                  </h3>
                </div>

                <div style={styles.confidence}>
                  {mediaConfidence}%
                </div>
              </div>

              <div style={styles.progressBackground}>
                <div
                  style={{
                    ...styles.progress,
                    width: `${mediaResult.score * 100}%`
                  }}
                />
              </div>

              <p style={styles.resultInfo}>
                Analysis method: {mediaResult.method}
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <p>
            AI Fake News Detector
          </p>

          <span>
            For informational and research purposes only.
          </span>
        </footer>

      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: '100vh',
    background: '#f4f7fb',
    fontFamily: 'Inter, Arial, sans-serif',
    padding: '40px 20px'
  },

  container: {
    maxWidth: '900px',
    margin: '0 auto'
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    marginBottom: '20px'
  },

  logo: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    background: '#111827',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 800
  },

  title: {
    margin: 0,
    fontSize: '34px',
    color: '#111827'
  },

  subtitle: {
    margin: '6px 0 0',
    color: '#6b7280',
    fontSize: '16px'
  },

  status: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: '#ffffff',
    padding: '9px 14px',
    borderRadius: '999px',
    fontSize: '13px',
    color: '#374151',
    marginBottom: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },

  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#22c55e'
  },

  error: {
    background: '#fef2f2',
    color: '#b91c1c',
    border: '1px solid #fecaca',
    padding: '14px',
    borderRadius: '10px',
    marginBottom: '20px'
  },

  card: {
    background: '#ffffff',
    borderRadius: '18px',
    padding: '28px',
    marginBottom: '24px',
    boxShadow: '0 8px 30px rgba(15,23,42,0.07)'
  },

  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '20px'
  },

  icon: {
    width: '45px',
    height: '45px',
    borderRadius: '12px',
    background: '#eef2ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '21px'
  },

  cardTitle: {
    margin: 0,
    fontSize: '21px',
    color: '#111827'
  },

  cardDescription: {
    margin: '5px 0 0',
    color: '#6b7280',
    fontSize: '14px'
  },

  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    resize: 'vertical',
    border: '1px solid #d1d5db',
    borderRadius: '12px',
    padding: '15px',
    fontSize: '15px',
    outline: 'none',
    marginBottom: '14px',
    fontFamily: 'inherit'
  },

  button: {
    border: 'none',
    background: '#111827',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 700,
    cursor: 'pointer'
  },

  uploadBox: {
    minHeight: '150px',
    border: '2px dashed #d1d5db',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    marginBottom: '14px',
    color: '#374151'
  },

  uploadIcon: {
    fontSize: '30px'
  },

  uploadText: {
    fontSize: '13px',
    color: '#9ca3af'
  },

  result: {
    marginTop: '22px',
    padding: '20px',
    background: '#f8fafc',
    borderRadius: '14px',
    border: '1px solid #e5e7eb'
  },

  resultTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  resultLabel: {
    margin: 0,
    fontSize: '11px',
    color: '#6b7280',
    letterSpacing: '1px',
    fontWeight: 700
  },

  resultValue: {
    margin: '6px 0 0',
    fontSize: '22px',
    color: '#111827'
  },

  confidence: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#111827'
  },

  progressBackground: {
    height: '8px',
    background: '#e5e7eb',
    borderRadius: '99px',
    overflow: 'hidden',
    marginTop: '18px'
  },

  progress: {
    height: '100%',
    background: '#111827',
    borderRadius: '99px'
  },

  resultInfo: {
    margin: '12px 0 0',
    fontSize: '12px',
    color: '#6b7280'
  },

  footer: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '13px',
    padding: '20px'
  }
};