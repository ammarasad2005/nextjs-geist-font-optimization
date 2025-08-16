"use client";

import React from 'react';

interface GameUIProps {
  gameState: {
    screen: string;
    currentLevel: number;
    selectedCharacter: string | null;
    playerHealth: number;
    playerLives: number;
    score: number;
    enemies: any[];
    player: any;
  };
  className?: string;
}

export const GameUI: React.FC<GameUIProps> = ({ gameState, className = "" }) => {
  if (gameState.screen !== 'playing' || !gameState.player) {
    return null;
  }

  const healthPercentage = (gameState.playerHealth / gameState.player.maxHealth) * 100;
  const getHealthColor = () => {
    if (healthPercentage > 60) return '#00ff00';
    if (healthPercentage > 30) return '#ffff00';
    return '#ff0000';
  };

  const getCharacterName = () => {
    const names = {
      developer: 'Ammar Hassan',
      journalist: 'Nadia Volkov',
      agent: 'Marcus Steel',
      hacker: 'Zero'
    };
    return names[gameState.selectedCharacter as keyof typeof names] || 'Unknown';
  };

  const getLevelTitle = () => {
    const titles = {
      1: 'The Trail Begins',
      2: 'Border Crossing',
      3: 'The Stronghold',
      4: 'The Inner Sanctum',
      5: 'Final Confrontation'
    };
    return titles[gameState.currentLevel as keyof typeof titles] || `Level ${gameState.currentLevel}`;
  };

  const aliveEnemies = gameState.enemies.filter(enemy => enemy.health > 0);
  const bossEnemy = aliveEnemies.find(enemy => enemy.type === 'boss');

  return (
    <div className={`game-ui ${className}`}>
      {/* Top HUD */}
      <div className="top-hud">
        <div className="mission-info">
          <div className="level-indicator">
            <span className="level-number">LEVEL {gameState.currentLevel}</span>
            <span className="level-title">{getLevelTitle()}</span>
          </div>
          <div className="countdown-timer">
            <span className="timer-label">TIME REMAINING</span>
            <span className="timer-value">23:42:15</span>
          </div>
        </div>

        <div className="character-info">
          <div className="character-name">{getCharacterName()}</div>
          <div className="character-type">{gameState.selectedCharacter?.toUpperCase()}</div>
        </div>
      </div>

      {/* Left HUD - Player Stats */}
      <div className="left-hud">
        <div className="player-stats">
          <div className="health-section">
            <div className="stat-label">HEALTH</div>
            <div className="health-bar-container">
              <div className="health-bar">
                <div 
                  className="health-fill"
                  style={{ 
                    width: `${healthPercentage}%`,
                    backgroundColor: getHealthColor()
                  }}
                ></div>
              </div>
              <div className="health-text">
                {gameState.playerHealth}/{gameState.player.maxHealth}
              </div>
            </div>
          </div>

          <div className="lives-section">
            <div className="stat-label">LIVES</div>
            <div className="lives-display">
              {Array.from({ length: 4 }, (_, i) => (
                <div 
                  key={i}
                  className={`life-indicator ${i < gameState.playerLives ? 'active' : 'inactive'}`}
                >
                  ♥
                </div>
              ))}
            </div>
          </div>

          <div className="score-section">
            <div className="stat-label">SCORE</div>
            <div className="score-value">{gameState.score.toLocaleString()}</div>
          </div>
        </div>

        <div className="abilities-section">
          <div className="stat-label">ABILITIES</div>
          <div className="abilities-list">
            {gameState.player.abilities?.map((ability: string, index: number) => (
              <div key={index} className="ability-item">
                <span className="ability-key">{index + 1}</span>
                <span className="ability-name">{ability.replace('_', ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right HUD - Enemy Info */}
      <div className="right-hud">
        <div className="enemies-section">
          <div className="stat-label">ENEMIES</div>
          <div className="enemies-count">
            {aliveEnemies.length} REMAINING
          </div>
          
          {bossEnemy && (
            <div className="boss-health">
              <div className="boss-label">BOSS: THE SHADOW</div>
              <div className="boss-health-bar">
                <div 
                  className="boss-health-fill"
                  style={{ 
                    width: `${(bossEnemy.health / bossEnemy.maxHealth) * 100}%`
                  }}
                ></div>
              </div>
              <div className="boss-health-text">
                {bossEnemy.health}/{bossEnemy.maxHealth}
              </div>
            </div>
          )}
        </div>

        <div className="objectives-section">
          <div className="stat-label">OBJECTIVES</div>
          <div className="objectives-list">
            <div className="objective-item completed">
              ✓ Infiltrate enemy territory
            </div>
            <div className="objective-item active">
              → Eliminate all hostiles
            </div>
            <div className="objective-item">
              ○ Locate Svetlana Putin
            </div>
          </div>
        </div>
      </div>

      {/* Bottom HUD - Controls */}
      <div className="bottom-hud">
        <div className="controls-help">
          <div className="control-group">
            <span className="control-key">←→</span>
            <span className="control-action">Move</span>
          </div>
          <div className="control-group">
            <span className="control-key">↑</span>
            <span className="control-action">Jump</span>
          </div>
          <div className="control-group">
            <span className="control-key">X</span>
            <span className="control-action">Attack</span>
          </div>
          <div className="control-group">
            <span className="control-key">1-3</span>
            <span className="control-action">Abilities</span>
          </div>
        </div>
      </div>

      {/* Warning Overlays */}
      {healthPercentage < 25 && (
        <div className="warning-overlay low-health">
          <div className="warning-text">LOW HEALTH</div>
        </div>
      )}

      {gameState.playerLives === 1 && (
        <div className="warning-overlay last-life">
          <div className="warning-text">LAST LIFE</div>
        </div>
      )}

      <style jsx>{`
        .game-ui {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 100;
          font-family: 'Courier New', monospace;
        }

        .game-ui * {
          pointer-events: none;
        }

        .top-hud {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .mission-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .level-indicator {
          background: rgba(0, 0, 0, 0.8);
          padding: 10px 15px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .level-number {
          display: block;
          color: #00ff00;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 2px;
        }

        .level-title {
          display: block;
          color: #ffffff;
          font-size: 12px;
        }

        .countdown-timer {
          background: rgba(255, 0, 0, 0.1);
          border: 2px solid #ff0000;
          padding: 8px 12px;
          border-radius: 6px;
          text-align: center;
        }

        .timer-label {
          display: block;
          color: #ff6666;
          font-size: 10px;
          font-weight: bold;
          margin-bottom: 2px;
        }

        .timer-value {
          display: block;
          color: #ff0000;
          font-size: 16px;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .character-info {
          background: rgba(0, 0, 0, 0.8);
          padding: 10px 15px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          text-align: right;
        }

        .character-name {
          color: #ffffff;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 2px;
        }

        .character-type {
          color: #00ff00;
          font-size: 12px;
        }

        .left-hud {
          position: absolute;
          top: 120px;
          left: 20px;
          width: 250px;
        }

        .player-stats {
          background: rgba(0, 0, 0, 0.8);
          padding: 15px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          margin-bottom: 15px;
        }

        .stat-label {
          color: #cccccc;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .health-section {
          margin-bottom: 15px;
        }

        .health-bar-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .health-bar {
          flex: 1;
          height: 20px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .health-fill {
          height: 100%;
          transition: width 0.3s ease, background-color 0.3s ease;
          border-radius: 10px;
        }

        .health-text {
          color: #ffffff;
          font-size: 12px;
          font-weight: bold;
          min-width: 60px;
          text-align: right;
        }

        .lives-section {
          margin-bottom: 15px;
        }

        .lives-display {
          display: flex;
          gap: 5px;
        }

        .life-indicator {
          font-size: 20px;
          transition: all 0.3s ease;
        }

        .life-indicator.active {
          color: #ff0000;
          text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
        }

        .life-indicator.inactive {
          color: #333333;
        }

        .score-section {
          margin-bottom: 0;
        }

        .score-value {
          color: #ffffff;
          font-size: 18px;
          font-weight: bold;
        }

        .abilities-section {
          background: rgba(0, 0, 0, 0.8);
          padding: 15px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .abilities-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .ability-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ability-key {
          background: #333333;
          color: #ffffff;
          width: 20px;
          height: 20px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }

        .ability-name {
          color: #cccccc;
          font-size: 12px;
          text-transform: capitalize;
        }

        .right-hud {
          position: absolute;
          top: 120px;
          right: 20px;
          width: 250px;
        }

        .enemies-section {
          background: rgba(0, 0, 0, 0.8);
          padding: 15px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          margin-bottom: 15px;
        }

        .enemies-count {
          color: #ff6666;
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .boss-health {
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          padding-top: 15px;
        }

        .boss-label {
          color: #ff0000;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .boss-health-bar {
          height: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #ff0000;
          margin-bottom: 5px;
        }

        .boss-health-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff0000, #cc0000);
          transition: width 0.3s ease;
          border-radius: 8px;
        }

        .boss-health-text {
          color: #ff0000;
          font-size: 11px;
          font-weight: bold;
          text-align: right;
        }

        .objectives-section {
          background: rgba(0, 0, 0, 0.8);
          padding: 15px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .objectives-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .objective-item {
          font-size: 12px;
          padding: 3px 0;
        }

        .objective-item.completed {
          color: #00ff00;
        }

        .objective-item.active {
          color: #ffff00;
          animation: blink 1.5s infinite;
        }

        .objective-item:not(.completed):not(.active) {
          color: #666666;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.5; }
        }

        .bottom-hud {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
        }

        .controls-help {
          background: rgba(0, 0, 0, 0.8);
          padding: 10px 20px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          gap: 20px;
        }

        .control-group {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .control-key {
          background: #333333;
          color: #ffffff;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: bold;
        }

        .control-action {
          color: #cccccc;
          font-size: 11px;
        }

        .warning-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 20px 40px;
          border-radius: 8px;
          text-align: center;
          animation: warningPulse 1s infinite;
        }

        .warning-overlay.low-health {
          background: rgba(255, 0, 0, 0.2);
          border: 2px solid #ff0000;
        }

        .warning-overlay.last-life {
          background: rgba(255, 100, 0, 0.2);
          border: 2px solid #ff6600;
        }

        .warning-text {
          color: #ffffff;
          font-size: 24px;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }

        @keyframes warningPulse {
          0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
        }

        @media (max-width: 768px) {
          .left-hud, .right-hud {
            width: 200px;
          }

          .top-hud {
            flex-direction: column;
            gap: 10px;
          }

          .controls-help {
            flex-wrap: wrap;
            gap: 10px;
          }

          .warning-text {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default GameUI;
