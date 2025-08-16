"use client";

import React, { useState, useEffect } from 'react';
import { STORY_SCRIPT } from '@/game/StoryScript';

interface GameOverScreenProps {
  characterType: string;
  finalScore: number;
  levelReached: number;
  onRestart: () => void;
  className?: string;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  characterType, 
  finalScore, 
  levelReached, 
  onRestart, 
  className = "" 
}) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showExplosion, setShowExplosion] = useState(false);
  const [showNarrative, setShowNarrative] = useState(false);
  const [showRestart, setShowRestart] = useState(false);

  const phases = [
    {
      title: "MISSION FAILED",
      content: "The countdown has reached zero.",
      duration: 3000
    },
    {
      title: "NUCLEAR LAUNCH DETECTED",
      content: "Across the globe, early warning systems scream their final alerts as Russia's Dead Hand system activates.",
      duration: 4000
    },
    {
      title: "GLOBAL DEVASTATION",
      content: "Hundreds of nuclear missiles launch simultaneously from silos across the vast Russian territory.",
      duration: 4000
    },
    {
      title: "THE END OF EVERYTHING",
      content: "In major cities worldwide, people look up at the sky as streaks of light appear on the horizon.",
      duration: 5000
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPhase < phases.length - 1) {
        setCurrentPhase(currentPhase + 1);
      } else if (!showExplosion) {
        setShowExplosion(true);
        setTimeout(() => setShowNarrative(true), 3000);
        setTimeout(() => setShowRestart(true), 8000);
      }
    }, phases[currentPhase]?.duration || 3000);

    return () => clearTimeout(timer);
  }, [currentPhase, showExplosion, phases]);

  const getCharacterName = () => {
    const names = {
      developer: 'Ammar Hassan',
      journalist: 'Nadia Volkov',
      agent: 'Marcus Steel',
      hacker: 'Zero'
    };
    return names[characterType as keyof typeof names] || 'Hero';
  };

  return (
    <div className={`game-over-screen ${className}`}>
      <div className="apocalypse-background">
        <img 
          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5dd271f6-9664-4630-85ba-53079b1ca211.png"
          alt="Dark apocalyptic cityscape with mushroom clouds on horizon, nuclear devastation with red orange sky and destruction"
          className="background-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="background-overlay"></div>
      </div>

      {!showExplosion && (
        <div className="countdown-section">
          <div className="nuclear-countdown">
            <div className="countdown-display">
              <span className="countdown-label">NUCLEAR LAUNCH</span>
              <span className="countdown-value">00:00:00</span>
            </div>
            <div className="launch-status">
              <div className="status-text">DEAD HAND ACTIVATED</div>
              <div className="launch-indicator">
                <div className="missile-icon">🚀</div>
                <div className="launch-text">MISSILES LAUNCHING</div>
              </div>
            </div>
          </div>

          <div className="failure-content">
            <h1 className="failure-title">{phases[currentPhase].title}</h1>
            <p className="failure-text">{phases[currentPhase].content}</p>
            
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentPhase + 1) / phases.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {showExplosion && (
        <div className="explosion-section">
          <div className="nuclear-explosion">
            <div className="explosion-core"></div>
            <div className="explosion-ring ring-1"></div>
            <div className="explosion-ring ring-2"></div>
            <div className="explosion-ring ring-3"></div>
            <div className="mushroom-cloud">
              <div className="cloud-stem"></div>
              <div className="cloud-cap"></div>
            </div>
          </div>

          <div className="shockwave-effects">
            <div className="shockwave shockwave-1"></div>
            <div className="shockwave shockwave-2"></div>
            <div className="shockwave shockwave-3"></div>
          </div>

          <div className="radiation-particles">
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i} className={`particle particle-${i % 3}`}></div>
            ))}
          </div>
        </div>
      )}

      {showNarrative && (
        <div className="narrative-section">
          <div className="final-narrative">
            <h2 className="narrative-title">HUMANITY'S FINAL HOUR</h2>
            <div className="narrative-content">
              <p>The nuclear exchange triggers a global response. Within hours, the world's major nuclear powers have launched their own arsenals in retaliation and desperation.</p>
              <p>The age of humanity ends not with a whimper, but with the brightest flash the Earth has ever seen.</p>
              <p>In the aftermath, the planet falls silent. The Shadow Syndicate's victory is pyrrhic - they have inherited a dead world.</p>
            </div>
            
            <div className="casualty-counter">
              <div className="counter-label">ESTIMATED CASUALTIES</div>
              <div className="counter-value">8,000,000,000</div>
              <div className="counter-subtitle">Total Human Population</div>
            </div>

            <div className="final-message">
              <h3>This is how the world ends.</h3>
              <p>Perhaps in another timeline, another hero succeeded where you failed. Perhaps there is still hope in the multiverse.</p>
              <p className="epitaph">The last transmission from Earth: "We tried. We failed. Remember us."</p>
            </div>
          </div>
        </div>
      )}

      {showRestart && (
        <div className="restart-section">
          <div className="mission-summary">
            <h3>MISSION SUMMARY</h3>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-label">Operative</span>
                <span className="stat-value">{getCharacterName()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Level Reached</span>
                <span className="stat-value">{levelReached}/5</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Final Score</span>
                <span className="stat-value">{finalScore.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Mission Status</span>
                <span className="stat-value failure">FAILED</span>
              </div>
            </div>
          </div>

          <div className="restart-actions">
            <button 
              onClick={onRestart}
              className="restart-button"
            >
              TRY AGAIN
              <span className="button-subtitle">Save Humanity</span>
            </button>
          </div>
        </div>
      )}

      <div className="atmospheric-effects">
        <div className="fallout-particles">
          {Array.from({ length: 100 }, (_, i) => (
            <div key={i} className={`fallout-particle fallout-${i % 4}`}></div>
          ))}
        </div>
        <div className="electromagnetic-pulse"></div>
      </div>

      <style jsx>{`
        .game-over-screen {
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

        .apocalypse-background {
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
          filter: brightness(0.3) contrast(1.3) saturate(0.8);
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(139, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0.9) 50%,
            rgba(139, 69, 19, 0.8) 100%
          );
          animation: apocalypseFlicker 3s infinite;
        }

        @keyframes apocalypseFlicker {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0.7; }
        }

        .countdown-section {
          position: relative;
          z-index: 2;
          text-align: center;
          width: 100%;
          max-width: 800px;
          padding: 2rem;
        }

        .nuclear-countdown {
          background: rgba(139, 0, 0, 0.2);
          border: 3px solid #ff0000;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 3rem;
          animation: criticalAlert 1s infinite;
        }

        @keyframes criticalAlert {
          0%, 50%, 100% { border-color: #ff0000; }
          25%, 75% { border-color: #ff6666; }
        }

        .countdown-display {
          font-family: 'Courier New', monospace;
          margin-bottom: 1rem;
        }

        .countdown-label {
          display: block;
          color: #ff6666;
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .countdown-value {
          display: block;
          color: #ff0000;
          font-size: 3rem;
          font-weight: bold;
          text-shadow: 0 0 20px rgba(255, 0, 0, 0.8);
          animation: criticalPulse 0.5s infinite;
        }

        @keyframes criticalPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        .launch-status {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
        }

        .status-text {
          color: #ff0000;
          font-size: 1.25rem;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .launch-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .missile-icon {
          font-size: 2rem;
          animation: missileRotate 2s linear infinite;
        }

        @keyframes missileRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .launch-text {
          color: #ff6666;
          font-size: 1rem;
          font-weight: bold;
        }

        .failure-content {
          background: rgba(0, 0, 0, 0.9);
          border-radius: 12px;
          padding: 3rem 2rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 0, 0, 0.3);
        }

        .failure-title {
          font-size: 3rem;
          font-weight: bold;
          color: #ff0000;
          margin-bottom: 1rem;
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8);
          text-transform: uppercase;
          animation: failureGlow 2s ease-in-out infinite;
        }

        @keyframes failureGlow {
          0%, 100% { text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 0, 0, 0.3); }
          50% { text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 0, 0, 0.6); }
        }

        .failure-text {
          font-size: 1.25rem;
          line-height: 1.6;
          color: #e0e0e0;
          margin-bottom: 2rem;
          animation: fadeInUp 1s ease-out;
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

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff0000, #cc0000);
          transition: width 0.5s ease;
          border-radius: 4px;
        }

        .explosion-section {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .nuclear-explosion {
          position: relative;
          width: 400px;
          height: 400px;
        }

        .explosion-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          background: radial-gradient(circle, #ffffff 0%, #ffff00 30%, #ff6600 70%, #ff0000 100%);
          border-radius: 50%;
          animation: explosionCore 3s ease-out infinite;
        }

        @keyframes explosionCore {
          0% { 
            width: 0px; 
            height: 0px; 
            opacity: 1;
          }
          50% { 
            width: 200px; 
            height: 200px; 
            opacity: 0.9;
          }
          100% { 
            width: 400px; 
            height: 400px; 
            opacity: 0.3;
          }
        }

        .explosion-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 4px solid #ff6600;
          border-radius: 50%;
          animation: explosionRing 3s ease-out infinite;
        }

        .ring-1 {
          animation-delay: 0s;
        }

        .ring-2 {
          animation-delay: 0.5s;
        }

        .ring-3 {
          animation-delay: 1s;
        }

        @keyframes explosionRing {
          0% {
            width: 0px;
            height: 0px;
            opacity: 1;
            border-width: 8px;
          }
          100% {
            width: 600px;
            height: 600px;
            opacity: 0;
            border-width: 1px;
          }
        }

        .mushroom-cloud {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          animation: mushroomRise 4s ease-out 2s both;
        }

        .cloud-stem {
          width: 40px;
          height: 200px;
          background: linear-gradient(to top, #8B4513, #A0522D);
          margin: 0 auto;
          border-radius: 20px;
        }

        .cloud-cap {
          width: 120px;
          height: 80px;
          background: radial-gradient(ellipse, #696969, #2F4F4F);
          border-radius: 50%;
          margin: -20px auto 0;
          animation: cloudExpand 2s ease-out 3s both;
        }

        @keyframes mushroomRise {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(100px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes cloudExpand {
          0% {
            width: 120px;
            height: 80px;
          }
          100% {
            width: 200px;
            height: 120px;
          }
        }

        .shockwave-effects {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .shockwave {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: shockwaveExpand 4s ease-out infinite;
        }

        .shockwave-1 { animation-delay: 0s; }
        .shockwave-2 { animation-delay: 1s; }
        .shockwave-3 { animation-delay: 2s; }

        @keyframes shockwaveExpand {
          0% {
            width: 0px;
            height: 0px;
            opacity: 1;
          }
          100% {
            width: 2000px;
            height: 2000px;
            opacity: 0;
          }
        }

        .radiation-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          animation: particleFloat 6s infinite linear;
        }

        .particle-0 { 
          background: #ffff00; 
          top: 30%; 
          left: 20%; 
          animation-delay: 0s; 
        }
        .particle-1 { 
          background: #ff6600; 
          top: 60%; 
          left: 70%; 
          animation-delay: 2s; 
        }
        .particle-2 { 
          background: #ff0000; 
          top: 80%; 
          left: 40%; 
          animation-delay: 4s; 
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .narrative-section {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent);
          padding: 3rem 2rem 2rem;
          animation: narrativeSlideUp 1s ease-out;
        }

        @keyframes narrativeSlideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .final-narrative {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .narrative-title {
          font-size: 2rem;
          font-weight: bold;
          color: #ff0000;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        .narrative-content {
          margin-bottom: 2rem;
        }

        .narrative-content p {
          color: #e0e0e0;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .casualty-counter {
          background: rgba(139, 0, 0, 0.3);
          border: 2px solid #ff0000;
          border-radius: 8px;
          padding: 1.5rem;
          margin: 2rem 0;
          font-family: 'Courier New', monospace;
        }

        .counter-label {
          color: #ff6666;
          font-size: 0.875rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .counter-value {
          color: #ff0000;
          font-size: 2.5rem;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
          margin-bottom: 0.25rem;
        }

        .counter-subtitle {
          color: #ff6666;
          font-size: 0.75rem;
        }

        .final-message h3 {
          color: #ff0000;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .final-message p {
          color: #cccccc;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 0.75rem;
        }

        .epitaph {
          font-style: italic;
          color: #888888;
          font-size: 0.875rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 1rem;
          margin-top: 1rem;
        }

        .restart-section {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 4;
          text-align: center;
          background: rgba(0, 0, 0, 0.9);
          border-radius: 12px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: restartFadeIn 1s ease-out;
        }

        @keyframes restartFadeIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        .mission-summary h3 {
          color: #ff0000;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
        }

        .summary-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-label {
          color: #cccccc;
          font-size: 0.875rem;
          font-weight: bold;
        }

        .stat-value {
          color: #ffffff;
          font-size: 1.125rem;
          font-weight: bold;
        }

        .stat-value.failure {
          color: #ff0000;
        }

        .restart-actions {
          margin-top: 2rem;
        }

        .restart-button {
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
          position: relative;
          overflow: hidden;
        }

        .restart-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 0, 0, 0.3);
        }

        .button-subtitle {
          display: block;
          font-size: 0.75rem;
          font-weight: normal;
          margin-top: 0.25rem;
          opacity: 0.8;
        }

        .atmospheric-effects {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .fallout-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .fallout-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          animation: falloutDrift 10s infinite linear;
        }

        .fallout-0 { background: #8B4513; top: 10%; left: 10%; animation-delay: 0s; }
        .fallout-1 { background: #A0522D; top: 20%; left: 30%; animation-delay: 2s; }
        .fallout-2 { background: #696969; top: 30%; left: 60%; animation-delay: 4s; }
        .fallout-3 { background: #2F4F4F; top: 40%; left: 80%; animation-delay: 6s; }

        @keyframes falloutDrift {
          0% {
            transform: translateY(-10px) translateX(0);
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh) translateX(50px);
            opacity: 0;
          }
        }

        .electromagnetic-pulse {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent);
          animation: empPulse 5s infinite;
        }

        @keyframes empPulse {
          0%, 90%, 100% { opacity: 0; }
          95% { opacity: 1; }
        }

        @media (max-width: 768px) {
          .countdown-section {
            padding: 1rem;
          }

          .failure-title {
            font-size: 2rem;
          }

          .failure-text {
            font-size: 1rem;
          }

          .nuclear-explosion {
            width: 300px;
            height: 300px;
          }

          .narrative-section {
            padding: 2rem 1rem 1rem;
          }

          .narrative-title {
            font-size: 1.5rem;
          }

          .counter-value {
            font-size: 2rem;
          }

          .summary-stats {
            grid-template-columns: 1fr;
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

export default GameOverScreen;
