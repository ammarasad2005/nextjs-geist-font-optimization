"use client";

import React, { useState, useCallback } from 'react';
import GameCanvas from '@/components/GameCanvas';
import IntroScreen from '@/components/IntroScreen';
import CharacterSelect from '@/components/CharacterSelect';
import GameUI from '@/components/GameUI';
import VictoryScreen from '@/components/VictoryScreen';
import GameOverScreen from '@/components/GameOverScreen';

type GameScreen = 'intro' | 'characterSelect' | 'playing' | 'victory' | 'gameOver';

interface GameState {
  screen: GameScreen;
  currentLevel: number;
  selectedCharacter: string | null;
  playerHealth: number;
  playerLives: number;
  score: number;
  enemies: any[];
  player: any;
}

export default function GamePage() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('intro');
  const [gameState, setGameState] = useState<GameState>({
    screen: 'intro',
    currentLevel: 1,
    selectedCharacter: null,
    playerHealth: 100,
    playerLives: 4,
    score: 0,
    enemies: [],
    player: null
  });
  const [finalStats, setFinalStats] = useState({
    score: 0,
    completionTime: '00:00:00',
    levelReached: 1
  });

  const handleIntroComplete = useCallback(() => {
    setCurrentScreen('characterSelect');
  }, []);

  const handleCharacterSelect = useCallback((characterType: string) => {
    setGameState(prev => ({
      ...prev,
      selectedCharacter: characterType,
      screen: 'playing'
    }));
    setCurrentScreen('playing');
  }, []);

  const handleGameStateChange = useCallback((newGameState: GameState) => {
    setGameState(newGameState);
    
    // Handle screen transitions based on game state
    if (newGameState.screen !== currentScreen) {
      setCurrentScreen(newGameState.screen);
      
      // Store final stats when game ends
      if (newGameState.screen === 'victory' || newGameState.screen === 'gameOver') {
        const completionTime = calculateCompletionTime();
        setFinalStats({
          score: newGameState.score,
          completionTime,
          levelReached: newGameState.currentLevel
        });
      }
    }
  }, [currentScreen]);

  const calculateCompletionTime = (): string => {
    // This would normally calculate based on actual game start time
    // For now, return a placeholder
    const minutes = Math.floor(Math.random() * 30) + 10;
    const seconds = Math.floor(Math.random() * 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleRestart = useCallback(() => {
    setCurrentScreen('intro');
    setGameState({
      screen: 'intro',
      currentLevel: 1,
      selectedCharacter: null,
      playerHealth: 100,
      playerLives: 4,
      score: 0,
      enemies: [],
      player: null
    });
    setFinalStats({
      score: 0,
      completionTime: '00:00:00',
      levelReached: 1
    });
  }, []);

  return (
    <div className="game-page">
      {/* Intro Screen */}
      {currentScreen === 'intro' && (
        <IntroScreen onContinue={handleIntroComplete} />
      )}

      {/* Character Selection Screen */}
      {currentScreen === 'characterSelect' && (
        <CharacterSelect onCharacterSelect={handleCharacterSelect} />
      )}

      {/* Main Game Screen */}
      {currentScreen === 'playing' && (
        <div className="game-container">
          <GameCanvas onGameStateChange={handleGameStateChange} />
          <GameUI gameState={gameState} />
        </div>
      )}

      {/* Victory Screen */}
      {currentScreen === 'victory' && gameState.selectedCharacter && (
        <VictoryScreen
          characterType={gameState.selectedCharacter}
          finalScore={finalStats.score}
          completionTime={finalStats.completionTime}
          onRestart={handleRestart}
        />
      )}

      {/* Game Over Screen */}
      {currentScreen === 'gameOver' && gameState.selectedCharacter && (
        <GameOverScreen
          characterType={gameState.selectedCharacter}
          finalScore={finalStats.score}
          levelReached={finalStats.levelReached}
          onRestart={handleRestart}
        />
      )}

      {/* Global Game Styles */}
      <style jsx>{`
        .game-page {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #000000;
          font-family: 'Arial', sans-serif;
        }

        .game-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
        }

        /* Global font loading */
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

        /* Apply fonts globally within game */
        .game-page * {
          font-family: 'Rajdhani', 'Arial', sans-serif;
        }

        .game-page h1, .game-page h2, .game-page h3 {
          font-family: 'Orbitron', 'Arial', sans-serif;
        }

        /* Ensure proper text rendering */
        .game-page {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .game-page {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .game-page {
            font-size: 12px;
          }
        }

        /* Loading states */
        .game-page .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: #ffffff;
          font-size: 1.5rem;
        }

        /* Error states */
        .game-page .error {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: #ff0000;
          text-align: center;
          padding: 2rem;
        }

        .game-page .error h2 {
          margin-bottom: 1rem;
          font-size: 2rem;
        }

        .game-page .error p {
          margin-bottom: 2rem;
          font-size: 1.125rem;
          max-width: 600px;
        }

        .game-page .error button {
          background: #ff0000;
          color: #ffffff;
          border: none;
          padding: 1rem 2rem;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .game-page .error button:hover {
          background: #cc0000;
        }

        /* Accessibility improvements */
        .game-page button:focus,
        .game-page [tabindex]:focus {
          outline: 2px solid #00ff00;
          outline-offset: 2px;
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .game-page {
            filter: contrast(1.5);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .game-page *,
          .game-page *::before,
          .game-page *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Print styles */
        @media print {
          .game-page {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
