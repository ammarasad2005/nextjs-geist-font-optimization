"use client";

import React, { useState, useEffect } from 'react';
import { STORY_SCRIPT } from '@/game/StoryScript';

interface IntroScreenProps {
  onContinue: () => void;
  className?: string;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ 
  onContinue, 
  className = "" 
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showContinueButton, setShowContinueButton] = useState(false);

  const storyParts = [
    {
      title: "MOSCOW, RUSSIA",
      subtitle: "PRESENT DAY",
      content: "The unthinkable has happened. President Vladimir Putin has died suddenly, leaving Russia in unprecedented chaos."
    },
    {
      title: "THE CRISIS DEEPENS",
      subtitle: "CONSTITUTIONAL EMERGENCY",
      content: "According to the constitution, his daughter Svetlana Putin should assume emergency powers to prevent the activation of Russia's \"Dead Hand\" nuclear system."
    },
    {
      title: "VANISHED",
      subtitle: "WITHOUT A TRACE",
      content: "But she's gone. Vanished without a trace. Intelligence reports confirm she was kidnapped by the Shadow Syndicate - a ruthless international criminal organization."
    },
    {
      title: "THE ULTIMATUM",
      subtitle: "24 HOURS REMAINING",
      content: "They have one demand: complete global submission to their rule, or they will ensure Russia's automated nuclear system launches in exactly 24 hours."
    },
    {
      title: "DEAD HAND PROTOCOL",
      subtitle: "GLOBAL ANNIHILATION",
      content: "The Dead Hand system will automatically launch Russia's entire nuclear arsenal at major cities worldwide. Only Svetlana's biometric signature can stop it."
    },
    {
      title: "THE WORLD'S LAST HOPE",
      subtitle: "HEROES NEEDED",
      content: "World leaders are in panic. The world needs someone who can work in the shadows, infiltrate the Syndicate and rescue Svetlana before humanity faces extinction."
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSection < storyParts.length - 1) {
        setCurrentSection(currentSection + 1);
      } else {
        setShowContinueButton(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentSection, storyParts.length]);

  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(() => {
      onContinue();
    }, 500);
  };

  const handleSkip = () => {
    setCurrentSection(storyParts.length - 1);
    setShowContinueButton(true);
  };

  return (
    <div className={`intro-screen ${!isVisible ? 'fade-out' : ''} ${className}`}>
      <div className="intro-background">
        <img 
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e67add52-05e5-4f7d-b9c1-7e4e9e6adecf.png"
          alt="Dark dramatic Moscow cityscape at night with Kremlin silhouette and ominous storm clouds overhead creating tension and urgency"
          className="background-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="background-overlay"></div>
      </div>

      <div className="intro-content">
        <div className="story-section">
          <div className="countdown-timer">
            <div className="timer-display">
              <span className="timer-label">TIME REMAINING</span>
              <span className="timer-value">23:47:32</span>
            </div>
          </div>

          <div className="story-text">
            <h1 className="story-title">{storyParts[currentSection].title}</h1>
            <h2 className="story-subtitle">{storyParts[currentSection].subtitle}</h2>
            <p className="story-content">{storyParts[currentSection].content}</p>
          </div>

          <div className="progress-indicators">
            {storyParts.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${index <= currentSection ? 'active' : ''}`}
              />
            ))}
          </div>

          <div className="intro-actions">
            {!showContinueButton ? (
              <button 
                onClick={handleSkip}
                className="skip-button"
              >
                Skip Intro
              </button>
            ) : (
              <div className="continue-section">
                <div className="mission-brief">
                  <h3>MISSION BRIEFING</h3>
                  <p>The clock is ticking. 23 hours and 47 minutes remain.</p>
                  <p>The fate of 8 billion people now rests in the hands of unlikely heroes...</p>
                </div>
                <button 
                  onClick={handleContinue}
                  className="continue-button"
                >
                  BEGIN MISSION
                  <span className="button-glow"></span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="intro-footer">
        <div className="emergency-alert">
          <div className="alert-icon">⚠️</div>
          <div className="alert-text">
            <strong>GLOBAL EMERGENCY ALERT</strong>
            <span>Nuclear threat level: CRITICAL</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .intro-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          opacity: 1;
          transition: opacity 0.5s ease-out;
        }

        .intro-screen.fade-out {
          opacity: 0;
        }

        .intro-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .background-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.3) contrast(1.2);
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(20, 20, 20, 0.9) 50%,
            rgba(0, 0, 0, 0.8) 100%
          );
        }

        .intro-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 800px;
          padding: 2rem;
          text-align: center;
        }

        .countdown-timer {
          margin-bottom: 2rem;
        }

        .timer-display {
          display: inline-block;
          background: rgba(255, 0, 0, 0.1);
          border: 2px solid #ff0000;
          border-radius: 8px;
          padding: 1rem 2rem;
          font-family: 'Courier New', monospace;
        }

        .timer-label {
          display: block;
          color: #ff6666;
          font-size: 0.875rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .timer-value {
          display: block;
          color: #ff0000;
          font-size: 2rem;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .story-section {
          background: rgba(0, 0, 0, 0.8);
          border-radius: 12px;
          padding: 3rem 2rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .story-text {
          margin-bottom: 2rem;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .story-title {
          font-size: 3rem;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 0.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          animation: fadeInUp 1s ease-out;
        }

        .story-subtitle {
          font-size: 1.25rem;
          color: #cccccc;
          margin-bottom: 1.5rem;
          font-weight: 300;
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        .story-content {
          font-size: 1.125rem;
          line-height: 1.6;
          color: #e0e0e0;
          max-width: 600px;
          margin: 0 auto;
          animation: fadeInUp 1s ease-out 0.4s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .progress-indicators {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .progress-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .progress-dot.active {
          background: #ffffff;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .intro-actions {
          min-height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .skip-button {
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.5);
          color: #ffffff;
          padding: 0.75rem 2rem;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .skip-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #ffffff;
        }

        .continue-section {
          text-align: center;
        }

        .mission-brief {
          margin-bottom: 2rem;
        }

        .mission-brief h3 {
          color: #ff6666;
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .mission-brief p {
          color: #cccccc;
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }

        .continue-button {
          position: relative;
          background: linear-gradient(45deg, #ff0000, #cc0000);
          border: none;
          color: #ffffff;
          padding: 1rem 3rem;
          border-radius: 8px;
          font-size: 1.25rem;
          font-weight: bold;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .continue-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 0, 0, 0.3);
        }

        .button-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .intro-footer {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }

        .emergency-alert {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 0, 0, 0.1);
          border: 1px solid #ff0000;
          border-radius: 6px;
          padding: 1rem 2rem;
          animation: alertBlink 3s infinite;
        }

        @keyframes alertBlink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0.5; }
        }

        .alert-icon {
          font-size: 1.5rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        .alert-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .alert-text strong {
          color: #ff0000;
          font-size: 0.875rem;
          font-weight: bold;
        }

        .alert-text span {
          color: #ff6666;
          font-size: 0.75rem;
        }

        @media (max-width: 768px) {
          .intro-content {
            padding: 1rem;
          }

          .story-section {
            padding: 2rem 1rem;
          }

          .story-title {
            font-size: 2rem;
          }

          .story-subtitle {
            font-size: 1rem;
          }

          .story-content {
            font-size: 1rem;
          }

          .timer-value {
            font-size: 1.5rem;
          }

          .continue-button {
            padding: 0.875rem 2rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
