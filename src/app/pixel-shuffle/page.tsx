"use client";

import React, { useState, useRef, useEffect } from 'react';
import PixelShuffleCanvas from '@/components/PixelShuffleCanvas';

export default function PixelShufflePage() {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSourceImage(event.target?.result as string);
        setIsAnimating(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartAnimation = () => {
    if (sourceImage) {
      setIsAnimating(true);
    }
  };

  const handleReset = () => {
    setSourceImage(null);
    setIsAnimating(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="pixel-shuffle-page">
      <div className="container">
        <header className="header">
          <h1>Pixel Shuffle Transformer</h1>
          <p className="subtitle">Upload any image and watch it transform into Babar Azam!</p>
        </header>

        <div className="content">
          {!sourceImage ? (
            <div className="upload-section">
              <div className="upload-card">
                <svg
                  className="upload-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <h2>Upload Your Image</h2>
                <p>Choose an image to begin the pixel shuffle transformation</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="file-input"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="upload-button">
                  Select Image
                </label>
              </div>
            </div>
          ) : (
            <div className="animation-section">
              <PixelShuffleCanvas
                sourceImageUrl={sourceImage}
                isAnimating={isAnimating}
                onAnimationComplete={() => setIsAnimating(false)}
              />
              
              <div className="controls">
                {!isAnimating ? (
                  <button onClick={handleStartAnimation} className="control-button primary">
                    Start Transformation
                  </button>
                ) : (
                  <button className="control-button disabled" disabled>
                    Transforming...
                  </button>
                )}
                <button onClick={handleReset} className="control-button secondary">
                  Upload New Image
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="back-link">
          <a href="/">← Back to Home</a>
        </div>
      </div>

      <style jsx>{`
        .pixel-shuffle-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%);
          color: #ffffff;
          padding: 2rem;
          font-family: 'Rajdhani', sans-serif;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .header h1 {
          font-family: 'Orbitron', sans-serif;
          font-size: 3rem;
          font-weight: 900;
          background: linear-gradient(90deg, #00ff88 0%, #00ddff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          text-shadow: 0 0 30px rgba(0, 255, 136, 0.5);
        }

        .subtitle {
          font-size: 1.25rem;
          color: #aaaaaa;
          font-weight: 400;
        }

        .content {
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-section {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .upload-card {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(0, 255, 136, 0.3);
          border-radius: 20px;
          padding: 4rem 3rem;
          text-align: center;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          max-width: 500px;
          width: 100%;
        }

        .upload-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 2rem;
          color: #00ff88;
          stroke-width: 1.5;
        }

        .upload-card h2 {
          font-family: 'Orbitron', sans-serif;
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .upload-card p {
          color: #aaaaaa;
          margin-bottom: 2rem;
          font-size: 1.125rem;
        }

        .file-input {
          display: none;
        }

        .upload-button {
          display: inline-block;
          background: linear-gradient(90deg, #00ff88 0%, #00ddff 100%);
          color: #000000;
          font-weight: 700;
          padding: 1rem 3rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.125rem;
          border: none;
          box-shadow: 0 4px 15px rgba(0, 255, 136, 0.4);
        }

        .upload-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 255, 136, 0.6);
        }

        .animation-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .controls {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .control-button {
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          font-family: 'Rajdhani', sans-serif;
        }

        .control-button.primary {
          background: linear-gradient(90deg, #00ff88 0%, #00ddff 100%);
          color: #000000;
          box-shadow: 0 4px 15px rgba(0, 255, 136, 0.4);
        }

        .control-button.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 255, 136, 0.6);
        }

        .control-button.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .control-button.secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .control-button.disabled {
          background: rgba(100, 100, 100, 0.3);
          color: #666666;
          cursor: not-allowed;
        }

        .back-link {
          margin-top: 3rem;
          text-align: center;
        }

        .back-link a {
          color: #00ff88;
          text-decoration: none;
          font-size: 1.125rem;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .back-link a:hover {
          color: #00ddff;
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .header h1 {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .upload-card {
            padding: 3rem 2rem;
          }

          .control-button {
            padding: 0.875rem 1.5rem;
            font-size: 0.875rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
