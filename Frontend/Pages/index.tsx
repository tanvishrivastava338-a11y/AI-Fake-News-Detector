import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [text, setText] = useState('');
  const [textResult, setTextResult] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [mediaResult, setMediaResult] = useState<any>(null);

  async function analyzeText() {
    setTextResult(null);
    const r = await axios.post('/api/analyze/text', { text });
    setTextResult(r.data);
  }

  async function analyzeMedia() {
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const r = await axios.post('/api/analyze/media', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setMediaResult(r.data);
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Inter, sans-serif' }}>
      <h1>AI Fake News & Deepfake Detection</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>Text Analysis</h2>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={6} cols={80} />
        <br />
        <button onClick={analyzeText}>Analyze Text</button>
        {textResult && (
          <pre>{JSON.stringify(textResult, null, 2)}</pre>
        )}
      </section>

      <section>
        <h2>Media (Image/Video frame) Analysis</h2>
        <input type="file" accept="image/*,video/*" onChange={e => setFile(e.target.files?.[0] ?? null)} />
        <button onClick={analyzeMedia}>Analyze Media</button>
        {mediaResult && (
          <pre>{JSON.stringify(mediaResult, null, 2)}</pre>
        )}
      </section>
    </div>
  );
}