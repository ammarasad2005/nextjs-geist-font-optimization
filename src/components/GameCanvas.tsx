"use client";

import React, { useRef, useEffect, useState } from 'react';
import { GameEngine } from '@/game/GameEngine';

interface GameCanvasProps {
  onGameStateChange?: (state: any) => void;
  className?: string;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ 
  onGameStateChange, 
  className = "" 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      // Initialize game engine
      gameEngineRef.current = new GameEngine(canvas);
      
      // Start the game
      gameEngineRef.current.start();
      setIsGameRunning(true);
      
      // Set up game state monitoring
      const gameStateInterval = setInterval(() => {
        if (gameEngineRef.current && onGameStateChange) {
          const gameState = gameEngineRef.current.getGameState();
          onGameStateChange(gameState);
        }
      }, 100); // Update every 100ms

      // Cleanup function
      return () => {
        clearInterval(gameStateInterval);
        if (gameEngineRef.current) {
          gameEngineRef.current.stop();
          gameEngineRef.current = null;
        }
        setIsGameRunning(false);
      };
    } catch (err) {
      console.error('Failed to initialize game:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setIsGameRunning(false);
    }
  }, [onGameStateChange]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const container = canvas.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Maintain aspect ratio (2:1)
      const aspectRatio = 2;
      let canvasWidth = containerWidth;
      let canvasHeight = containerWidth / aspectRatio;
      
      if (canvasHeight > containerHeight) {
        canvasHeight = containerHeight;
        canvasWidth = containerHeight * aspectRatio;
      }
      
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (error) {
    return (
      <div className={`game-canvas-error ${className}`}>
        <div className="error-content">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Game Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Reload Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`game-canvas-container ${className}`}>
      <canvas
        ref={canvasRef}
        className="game-canvas"
        tabIndex={0}
        style={{
          border: '2px solid #333',
          backgroundColor: '#000',
          display: 'block',
          margin: '0 auto',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
      />
      
      {!isGameRunning && !error && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <p className="text-white text-lg">Loading Game...</p>
          </div>
        </div>
      )}
      
      <div className="game-instructions">
        <div className="instructions-panel">
          <h3 className="text-lg font-semibold mb-2">Controls</h3>
          <div className="controls-grid">
            <div className="control-item">
              <span className="key">←→</span>
              <span className="action">Move</span>
            </div>
            <div className="control-item">
              <span className="key">↑/Space</span>
              <span className="action">Jump</span>
            </div>
            <div className="control-item">
              <span className="key">X</span>
              <span className="action">Attack</span>
            </div>
            <div className="control-item">
              <span className="key">1-4</span>
              <span className="action">Select Character</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .game-canvas-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          min-height: 600px;
        }

        .game-canvas {
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .game-canvas-error {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 2px solid #e9ecef;
        }

        .error-content {
          text-align: center;
          padding: 2rem;
        }

        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }

        .loading-content {
          text-align: center;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #333;
          border-top: 4px solid #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .game-instructions {
          margin-top: 1rem;
          width: 100%;
          max-width: 600px;
        }

        .instructions-panel {
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 1rem;
          border-radius: 8px;
          backdrop-filter: blur(10px);
        }

        .controls-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .control-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .key {
          background: #333;
          color: #fff;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: monospace;
          font-weight: bold;
          min-width: 60px;
          text-align: center;
        }

        .action {
          color: #ccc;
        }

        @media (max-width: 768px) {
          .game-canvas-container {
            padding: 1rem;
          }
          
          .controls-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .instructions-panel {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default GameCanvas;
