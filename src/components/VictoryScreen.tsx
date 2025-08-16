"use client";

import React, { useState, useEffect } from 'react';
import { STORY_SCRIPT, getVictoryStory } from '@/game/StoryScript';

interface VictoryScreenProps {
  characterType: string;
  finalScore: number;
  completionTime: string;
  onRestart: () => void;
  className?: string;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({ 
  characterType, 
  finalScore, 
  completionTime, 
  onRestart, 
  className = "" 
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [showRestart, setShowRestart] = useState(false);

  const victoryStory = getVictoryStory(characterType);
  
  const storyParts = [
    {
      title: "MISSION ACCOMPLISHED",
      content: "Against all odds, you have succeeded. Svetlana Putin is safe, and with mere minutes to spare, she has provided the authorization codes needed to deactivate Russia's Dead Hand nuclear system."
    },
    {
      title: "THE WORLD IS SAVED",
      content: "Around the world, people emerge from shelters and safe rooms, unaware of how close they came to annihilation. The Shadow Syndicate's network has been exposed and is being dismantled by international law enforcement."
    },
    {
      title: "A HERO'S LEGACY",
      content: "The immediate crisis is over, but the world has learned a valuable lesson about the dangers of automated weapons systems and the importance of international cooperation in the face of global threats."
    },
    {
      title: "YOUR CONTRIBUTION",
      content: victoryStory.characterMessage
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSection < storyParts.length - 1) {
        setCurrentSection(currentSection + 1);
      } else if (!showStats) {
        setShowStats(true);
      } else if (!showRestart) {
        setShowRestart(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentSection, showStats, showRestart, storyParts.length]);

  const getCharacterName = () => {
    const names = {
      developer: 'Ammar Hassan',
      journalist: 'Nadia Volkov',
      agent: 'Marcus Steel',
      hacker: 'Zero'
    };
    return names[characterType as keyof typeof names] || 'Hero';
  };

  const getRank = () => {
    if (finalScore >= 1000) return { rank: 'LEGENDARY', color: '#ffd700' };
    if (finalScore >= 750) return { rank: 'ELITE', color: '#c0c0c0' };
    if (finalScore >= 500) return { rank: 'VETERAN', color: '#cd7f32' };
    return { rank: 'OPERATIVE', color: '#ffffff' };
  };

  const rank = getRank();

  return (
    <div className={`victory-screen ${className}`}>
      <div className="victory-background">
        <img 
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4e7ecf3d-5946-4c71-8dcf-e03bd10791b0.png"
          alt="Bright hopeful sunrise over peaceful world cities with people celebrating in streets, nuclear crisis averted with golden light"
          className="background-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="background-overlay"></div>
      </div>

      <div className="victory-content">
        <div className="celebration-header">
          <div className="nuclear-status">
            <div className="status-indicator safe">
              <div className="status-icon">✓</div>
              <div className="status-text">
                <div className="status-label">NUCLEAR THREAT</div>
                <div className="status-value">NEUTRALIZED</div>
              </div>
            </div>
            <div className="countdown-stopped">
              <div className="timer-display">
                <span className="timer-label">COUNTDOWN STOPPED</span>
                <span className="timer-value">00:00:00</span>
              </div>
            </div>
          </div>

          <h1 className="victory-title">WORLD SAVED</h1>
          <h2 className="hero-name">BY {getCharacterName().toUpperCase()}</h2>
        </div>

        <div className="story-section">
          <div className="story-content">
            <h3 className="story-title">{storyParts[currentSection].title}</h3>
            <p className="story-text">{storyParts[currentSection].content}</p>
          </div>

          <div className="progress-indicators">
            {storyParts.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${index <= currentSection ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        {showStats && (
          <div className="mission-stats">
            <h3 className="stats-title">MISSION STATISTICS</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-label">FINAL RANK</div>
                <div className="stat-value" style={{ color: rank.color }}>
                  {rank.rank}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-label">FINAL SCORE</div>
                <div className="stat-value">{finalScore.toLocaleString()}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">COMPLETION TIME</div>
                <div className="stat-value">{completionTime}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">OPERATIVE</div>
                <div className="stat-value">{getCharacterName()}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">LIVES SAVED</div>
                <div className="stat-value">8,000,000,000</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">THREAT LEVEL</div>
                <div className="stat-value" style={{ color: '#00ff00' }}>ELIMINATED</div>
              </div>
            </div>
          </div>
        )}

        {showRestart && (
          <div className="action-section">
            <div className="victory-message">
              <h3>You are a hero to humanity.</h3>
              <p>The nuclear countdown has been stopped. The world is safe. History will remember this day not as the end of the world, but as the day heroes stepped forward when the world needed them most.</p>
            </div>
            
            <div className="action-buttons">
              <button 
                onClick={onRestart}
                className="restart-button"
              >
                PLAY AGAIN
                <span className="button-glow"></span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="celebration-effects">
        <div className="firework firework-1"></div>
        <div className="firework firework-2"></div>
        <div className="firework firework-3"></div>
        <div className="confetti">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className={`confetti-piece confetti-${i % 5}`}></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .victory-screen {
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
          overflow: hidden;
        }

        .victory-background {
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
          filter: brightness(0.7) contrast(1.1) saturate(1.2);
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 100, 0, 0.3) 0%,
            rgba(255, 215, 0, 0.2) 50%,
            rgba(0, 150, 255, 0.3) 100%
          );
        }

        .victory-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 900px;
          padding: 2rem;
          text-align: center;
        }

        .celebration-header {
          margin-bottom: 3rem;
        }

        .nuclear-status {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(0, 255, 0, 0.1);
          border: 2px solid #00ff00;
          border-radius: 8px;
          padding: 1rem 2rem;
        }

        .status-icon {
          font-size: 2rem;
          color: #00ff00;
          text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
          animation: successPulse 2s infinite;
        }

        @keyframes successPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .status-text {
          text-align: left;
        }

        .status-label {
          color: #66ff66;
          font-size: 0.875rem;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }

        .status-value {
          color: #00ff00;
          font-size: 1.25rem;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
        }

        .countdown-stopped {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #00ff00;
          border-radius: 8px;
          padding: 1rem 2rem;
          font-family: 'Courier New', monospace;
        }

        .timer-label {
          display: block;
          color: #66ff66;
          font-size: 0.875rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .timer-value {
          display: block;
          color: #00ff00;
          font-size: 2rem;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
        }

        .victory-title {
          font-size: 4rem;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 0.5rem;
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
          animation: victoryGlow 3s ease-in-out infinite;
        }

        @keyframes victoryGlow {
          0%, 100% { text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.3); }
          50% { text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.6); }
        }

        .hero-name {
          font-size: 1.5rem;
          color: #ffd700;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          margin-bottom: 2rem;
        }

        .story-section {
          background: rgba(0, 0, 0, 0.8);
          border-radius: 12px;
          padding: 3rem 2rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 2rem;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .story-content {
          margin-bottom: 2rem;
        }

        .story-title {
          font-size: 2rem;
          font-weight: bold;
          color: #ffd700;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          animation: fadeInUp 1s ease-out;
        }

        .story-text {
          font-size: 1.125rem;
          line-height: 1.6;
          color: #e0e0e0;
          max-width: 700px;
          margin: 0 auto;
          animation: fadeInUp 1s ease-out 0.3s both;
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
        }

        .progress-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .progress-dot.active {
          background: #ffd700;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }

        .mission-stats {
          background: rgba(0, 0, 0, 0.8);
          border-radius: 12px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 2rem;
          animation: slideInUp 0.8s ease-out;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stats-title {
          color: #ffd700;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .stat-item {
          text-align: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-label {
          color: #cccccc;
          font-size: 0.875rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-value {
          color: #ffffff;
          font-size: 1.25rem;
          font-weight: bold;
        }

        .action-section {
          animation: fadeIn 1s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .victory-message {
          margin-bottom: 2rem;
        }

        .victory-message h3 {
          color: #ffd700;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .victory-message p {
          color: #e0e0e0;
          font-size: 1rem;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .restart-button {
          position: relative;
          background: linear-gradient(45deg, #00ff00, #00cc00);
          border: none;
          color: #000000;
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

        .restart-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 255, 0, 0.3);
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

        .celebration-effects {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .firework {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          animation: fireworkExplode 2s infinite;
        }

        .firework-1 {
          top: 20%;
          left: 20%;
          background: #ff0000;
          animation-delay: 0s;
        }

        .firework-2 {
          top: 30%;
          right: 20%;
          background: #00ff00;
          animation-delay: 0.7s;
        }

        .firework-3 {
          top: 40%;
          left: 50%;
          background: #0080ff;
          animation-delay: 1.4s;
        }

        @keyframes fireworkExplode {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(20);
            opacity: 0.8;
          }
          100% {
            transform: scale(40);
            opacity: 0;
          }
        }

        .confetti {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confettiFall 3s infinite linear;
        }

        .confetti-0 { background: #ff0000; left: 10%; animation-delay: 0s; }
        .confetti-1 { background: #00ff00; left: 30%; animation-delay: 0.5s; }
        .confetti-2 { background: #0080ff; left: 50%; animation-delay: 1s; }
        .confetti-3 { background: #ffff00; left: 70%; animation-delay: 1.5s; }
        .confetti-4 { background: #ff00ff; left: 90%; animation-delay: 2s; }

        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .victory-content {
            padding: 1rem;
          }

          .victory-title {
            font-size: 2.5rem;
          }

          .hero-name {
            font-size: 1.25rem;
          }

          .story-section {
            padding: 2rem 1rem;
          }

          .story-title {
            font-size: 1.5rem;
          }

          .story-text {
            font-size: 1rem;
          }

          .nuclear-status {
            flex-direction: column;
            gap: 1rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .restart-button {
            padding: 0.875rem 2rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VictoryScreen;
