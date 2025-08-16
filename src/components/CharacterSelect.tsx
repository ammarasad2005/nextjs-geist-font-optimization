"use client";

import React, { useState } from 'react';
import { CHARACTER_INFO } from '@/game/Character';
import { STORY_SCRIPT } from '@/game/StoryScript';

interface CharacterSelectProps {
  onCharacterSelect: (characterType: string) => void;
  className?: string;
}

type CharacterType = 'developer' | 'journalist' | 'agent' | 'hacker';

export const CharacterSelect: React.FC<CharacterSelectProps> = ({ 
  onCharacterSelect, 
  className = "" 
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterType | null>(null);
  const [hoveredCharacter, setHoveredCharacter] = useState<CharacterType | null>(null);

  const characters: CharacterType[] = ['developer', 'journalist', 'agent', 'hacker'];

  const handleCharacterClick = (characterType: CharacterType) => {
    setSelectedCharacter(characterType);
  };

  const handleConfirmSelection = () => {
    if (selectedCharacter) {
      onCharacterSelect(selectedCharacter);
    }
  };

  const getCharacterBackground = (characterType: CharacterType) => {
    return STORY_SCRIPT.CHARACTER_BACKGROUNDS[characterType];
  };

  return (
    <div className={`character-select ${className}`}>
      <div className="select-background">
        <div className="background-overlay"></div>
      </div>

      <div className="select-content">
        <div className="header-section">
          <h1 className="select-title">SELECT YOUR OPERATIVE</h1>
          <p className="select-subtitle">
            Choose your approach to infiltrate the Shadow Syndicate and save humanity
          </p>
          <div className="mission-timer">
            <span className="timer-label">MISSION COUNTDOWN</span>
            <span className="timer-value">23:45:18</span>
          </div>
        </div>

        <div className="characters-grid">
          {characters.map((characterType, index) => {
            const character = CHARACTER_INFO[characterType];
            const background = getCharacterBackground(characterType);
            const isSelected = selectedCharacter === characterType;
            const isHovered = hoveredCharacter === characterType;

            return (
              <div
                key={characterType}
                className={`character-card ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
                onClick={() => handleCharacterClick(characterType)}
                onMouseEnter={() => setHoveredCharacter(characterType)}
                onMouseLeave={() => setHoveredCharacter(null)}
              >
                <div className="card-header">
                  <div className="character-number">{index + 1}</div>
                  <div className="character-avatar">
                    <img 
                      src={`https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/58f6f85c-c884-4946-9bf1-c11290d4c161.png' ').map(n => n[0]).join('')}`}
                      alt={`${character.name} avatar`}
                      className="avatar-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <div className="avatar-fallback">
                      {character.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="character-name">{character.name}</h3>
                  <h4 className="character-title">{character.title}</h4>
                  <p className="character-description">{character.description}</p>

                  <div className="character-stats">
                    <div className="stat-item">
                      <span className="stat-label">Health</span>
                      <div className="stat-bar">
                        <div 
                          className="stat-fill health"
                          style={{ width: `${(character.baseStats.health / 120) * 100}%` }}
                        ></div>
                      </div>
                      <span className="stat-value">{character.baseStats.health}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Attack</span>
                      <div className="stat-bar">
                        <div 
                          className="stat-fill attack"
                          style={{ width: `${(character.baseStats.attack / 30) * 100}%` }}
                        ></div>
                      </div>
                      <span className="stat-value">{character.baseStats.attack}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Range</span>
                      <div className="stat-bar">
                        <div 
                          className="stat-fill range"
                          style={{ width: `${(character.baseStats.range / 80) * 100}%` }}
                        ></div>
                      </div>
                      <span className="stat-value">{character.baseStats.range}</span>
                    </div>
                  </div>

                  <div className="character-strengths">
                    <h5 className="strengths-title">Specializations</h5>
                    <div className="strengths-list">
                      {character.strengths.map((strength, idx) => (
                        <span key={idx} className="strength-tag">{strength}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="select-indicator">
                    {isSelected ? 'SELECTED' : 'SELECT'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedCharacter && (
          <div className="character-details">
            <div className="details-content">
              <h3 className="details-title">Mission Briefing: {CHARACTER_INFO[selectedCharacter].name}</h3>
              <div className="background-story">
                <p>{getCharacterBackground(selectedCharacter)?.background}</p>
              </div>
              <div className="special-abilities">
                <h4>Special Abilities</h4>
                <ul className="abilities-list">
                  {getCharacterBackground(selectedCharacter)?.specialAbilities.map((ability, idx) => (
                    <li key={idx} className="ability-item">{ability}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="action-section">
          {selectedCharacter ? (
            <button 
              onClick={handleConfirmSelection}
              className="confirm-button"
            >
              BEGIN MISSION WITH {CHARACTER_INFO[selectedCharacter].name.toUpperCase()}
              <span className="button-glow"></span>
            </button>
          ) : (
            <div className="selection-prompt">
              <p>Select an operative to view their mission briefing and begin</p>
              <div className="keyboard-hint">
                <span>Use keys 1-4 or click to select</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .character-select {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow-y: auto;
        }

        .select-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(255, 0, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(0, 100, 255, 0.1) 0%, transparent 50%);
        }

        .select-content {
          position: relative;
          z-index: 2;
          padding: 2rem;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .header-section {
          text-align: center;
          margin-bottom: 3rem;
        }

        .select-title {
          font-size: 3rem;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
          text-transform: uppercase;
          letter-spacing: 3px;
        }

        .select-subtitle {
          font-size: 1.25rem;
          color: #cccccc;
          margin-bottom: 2rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .mission-timer {
          display: inline-block;
          background: rgba(255, 0, 0, 0.1);
          border: 2px solid #ff0000;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          font-family: 'Courier New', monospace;
        }

        .timer-label {
          display: block;
          color: #ff6666;
          font-size: 0.75rem;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }

        .timer-value {
          display: block;
          color: #ff0000;
          font-size: 1.5rem;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
        }

        .characters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
        }

        .character-card {
          background: rgba(20, 20, 20, 0.9);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .character-card:hover {
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .character-card.selected {
          border-color: #00ff00;
          box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
        }

        .character-card.selected::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(0, 255, 0, 0.1), transparent);
          pointer-events: none;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .character-number {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #ffffff;
          font-size: 1.25rem;
        }

        .character-avatar {
          position: relative;
          width: 80px;
          height: 80px;
        }

        .avatar-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba(255, 255, 255, 0.2);
        }

        .avatar-fallback {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #333, #555);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #ffffff;
          font-size: 1.5rem;
          border: 3px solid rgba(255, 255, 255, 0.2);
        }

        .card-content {
          margin-bottom: 1rem;
        }

        .character-name {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .character-title {
          font-size: 1rem;
          color: #00ff00;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }

        .character-description {
          font-size: 0.875rem;
          color: #cccccc;
          line-height: 1.4;
          margin-bottom: 1rem;
        }

        .character-stats {
          margin-bottom: 1rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.75rem;
          color: #aaaaaa;
          width: 50px;
          text-align: left;
        }

        .stat-bar {
          flex: 1;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .stat-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .stat-fill.health { background: #00ff00; }
        .stat-fill.attack { background: #ff0000; }
        .stat-fill.range { background: #0080ff; }

        .stat-value {
          font-size: 0.75rem;
          color: #ffffff;
          width: 30px;
          text-align: right;
        }

        .character-strengths {
          margin-bottom: 1rem;
        }

        .strengths-title {
          font-size: 0.875rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .strengths-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.25rem;
        }

        .strength-tag {
          background: rgba(0, 255, 0, 0.2);
          color: #00ff00;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .card-footer {
          text-align: center;
        }

        .select-indicator {
          font-size: 0.875rem;
          font-weight: bold;
          color: #00ff00;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .character-details {
          background: rgba(0, 0, 0, 0.8);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .details-title {
          font-size: 1.5rem;
          color: #ffffff;
          margin-bottom: 1rem;
          font-weight: bold;
        }

        .background-story {
          margin-bottom: 1.5rem;
        }

        .background-story p {
          color: #cccccc;
          line-height: 1.6;
          font-size: 1rem;
        }

        .special-abilities h4 {
          color: #00ff00;
          margin-bottom: 0.75rem;
          font-size: 1.125rem;
        }

        .abilities-list {
          list-style: none;
          padding: 0;
        }

        .ability-item {
          color: #cccccc;
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          position: relative;
          font-size: 0.875rem;
        }

        .ability-item::before {
          content: '▶';
          position: absolute;
          left: 0;
          color: #00ff00;
        }

        .action-section {
          text-align: center;
          margin-top: auto;
        }

        .confirm-button {
          position: relative;
          background: linear-gradient(45deg, #00ff00, #00cc00);
          border: none;
          color: #000000;
          padding: 1rem 3rem;
          border-radius: 8px;
          font-size: 1.125rem;
          font-weight: bold;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .confirm-button:hover {
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

        .selection-prompt {
          color: #cccccc;
        }

        .selection-prompt p {
          font-size: 1.125rem;
          margin-bottom: 1rem;
        }

        .keyboard-hint {
          font-size: 0.875rem;
          color: #888888;
        }

        @media (max-width: 768px) {
          .select-content {
            padding: 1rem;
          }

          .select-title {
            font-size: 2rem;
          }

          .characters-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .character-card {
            padding: 1rem;
          }

          .character-details {
            padding: 1rem;
          }

          .confirm-button {
            padding: 0.875rem 2rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CharacterSelect;
