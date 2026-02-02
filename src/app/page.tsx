"use client";

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="container">
        <header className="hero">
          <h1 className="title">Welcome to the Experience Hub</h1>
          <p className="subtitle">Choose your adventure</p>
        </header>

        <div className="cards-grid">
          {/* Game Card */}
          <Link href="/game" className="feature-card game-card">
            <div className="card-icon">🎮</div>
            <h2>World Crisis Game</h2>
            <p>
              A thrilling story-driven game where heroes must save humanity from nuclear
              annihilation. Race against time in this epic adventure.
            </p>
            <div className="card-button">Play Now →</div>
          </Link>

          {/* Pixel Shuffle Card */}
          <Link href="/pixel-shuffle" className="feature-card pixel-card">
            <div className="card-icon">✨</div>
            <h2>Pixel Shuffle Magic</h2>
            <p>
              Upload any image and watch it transform into Babar Azam through an amazing
              pixel shuffling animation. See the magic happen!
            </p>
            <div className="card-button">Try it Now →</div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .home-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f3460 100%);
          color: #ffffff;
          padding: 2rem;
          font-family: 'Rajdhani', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .container {
          max-width: 1200px;
          width: 100%;
        }

        .hero {
          text-align: center;
          margin-bottom: 4rem;
        }

        .title {
          font-family: 'Orbitron', sans-serif;
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(90deg, #00ff88 0%, #00ddff 50%, #ff00ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          animation: glow 3s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
          }
          50% {
            text-shadow: 0 0 40px rgba(0, 255, 136, 0.8), 0 0 60px rgba(0, 221, 255, 0.5);
          }
        }

        .subtitle {
          font-size: 1.5rem;
          color: #aaaaaa;
          font-weight: 400;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          padding: 0 1rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 3rem 2rem;
          text-align: center;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .game-card {
          border-color: rgba(255, 0, 0, 0.4);
        }

        .game-card:hover {
          border-color: rgba(255, 0, 0, 0.8);
          box-shadow: 0 12px 40px rgba(255, 0, 0, 0.3);
        }

        .pixel-card {
          border-color: rgba(0, 255, 136, 0.4);
        }

        .pixel-card:hover {
          border-color: rgba(0, 255, 136, 0.8);
          box-shadow: 0 12px 40px rgba(0, 255, 136, 0.3);
        }

        .card-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .feature-card h2 {
          font-family: 'Orbitron', sans-serif;
          font-size: 2rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .game-card h2 {
          color: #ff6b6b;
        }

        .pixel-card h2 {
          color: #00ff88;
        }

        .feature-card p {
          color: #cccccc;
          line-height: 1.6;
          margin-bottom: 2rem;
          flex-grow: 1;
          font-size: 1.125rem;
        }

        .card-button {
          background: linear-gradient(90deg, #00ff88 0%, #00ddff 100%);
          color: #000000;
          font-weight: 700;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          transition: all 0.3s ease;
          font-size: 1.125rem;
        }

        .game-card .card-button {
          background: linear-gradient(90deg, #ff6b6b 0%, #ff0000 100%);
          color: #ffffff;
        }

        .feature-card:hover .card-button {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .title {
            font-size: 2.5rem;
          }

          .subtitle {
            font-size: 1.25rem;
          }

          .cards-grid {
            grid-template-columns: 1fr;
          }

          .feature-card {
            padding: 2rem 1.5rem;
          }

          .feature-card h2 {
            font-size: 1.5rem;
          }

          .card-icon {
            font-size: 3rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .card-icon,
          .title {
            animation: none;
          }

          .feature-card::before {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
