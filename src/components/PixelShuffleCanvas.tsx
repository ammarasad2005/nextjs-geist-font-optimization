"use client";

import React, { useRef, useEffect, useState } from 'react';

interface PixelShuffleCanvasProps {
  sourceImageUrl: string;
  isAnimating: boolean;
  onAnimationComplete: () => void;
}

interface Pixel {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  r: number;
  g: number;
  b: number;
  a: number;
  targetR: number;
  targetG: number;
  targetB: number;
  targetA: number;
  velocityX: number;
  velocityY: number;
  progress: number;
}

const PixelShuffleCanvas: React.FC<PixelShuffleCanvasProps> = ({
  sourceImageUrl,
  isAnimating,
  onAnimationComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const targetImageDataRef = useRef<ImageData | null>(null);

  // Create a procedurally generated Babar Azam target image
  function createBabarAzamImage(): ImageData {
    if (typeof document === 'undefined') {
      // Return empty ImageData for SSR
      return new ImageData(400, 400);
    }
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d')!;

    // Background - Pakistan flag inspired green
    ctx.fillStyle = '#01411C';
    ctx.fillRect(0, 0, 400, 400);

    // Draw a star pattern (Pakistan flag reference)
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const x = 350 + Math.cos(angle) * 30;
      const y = 50 + Math.sin(angle) * 30;
      if (i === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();

    // Draw crescent
    ctx.beginPath();
    ctx.arc(320, 50, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#01411C';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(328, 50, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Face (simplified portrait style)
    const gradient = ctx.createRadialGradient(200, 200, 50, 200, 200, 120);
    gradient.addColorStop(0, '#d4a574');
    gradient.addColorStop(1, '#8b6f47');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(200, 200, 80, 100, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(200, 150, 90, 50, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(180, 190, 12, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(220, 190, 12, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(180, 192, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(220, 192, 6, 0, Math.PI * 2);
    ctx.fill();

    // Nose
    ctx.strokeStyle = '#8b6f47';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(195, 215);
    ctx.stroke();

    // Mouth
    ctx.beginPath();
    ctx.arc(200, 225, 15, 0, Math.PI);
    ctx.stroke();

    // Cricket bat
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(80, 320, 30, 60);
    ctx.fillRect(85, 300, 20, 25);

    // Cricket ball
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(330, 350, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(315, 350);
    ctx.lineTo(345, 350);
    ctx.stroke();

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('BABAR AZAM', 200, 340);
    ctx.font = '16px Arial';
    ctx.fillText('Pakistan Cricket Captain', 200, 365);

    // Jersey number
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#01411C';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeText('56', 200, 280);
    ctx.fillText('56', 200, 280);

    return ctx.getImageData(0, 0, 400, 400);
  }

  useEffect(() => {
    if (!sourceImageUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize target image data if not already done
    if (!targetImageDataRef.current) {
      targetImageDataRef.current = createBabarAzamImage();
    }

    // Load source image
    const sourceImg = new Image();
    sourceImg.crossOrigin = 'anonymous';
    sourceImg.onload = () => {
      // Set canvas size
      canvas.width = 400;
      canvas.height = 400;

      // Draw source image
      ctx.drawImage(sourceImg, 0, 0, 400, 400);
      const sourceImageData = ctx.getImageData(0, 0, 400, 400);

      // Create pixel array
      const pixelArray: Pixel[] = [];
      const pixelSize = 4; // Sample every 4th pixel for performance
      
      for (let y = 0; y < 400; y += pixelSize) {
        for (let x = 0; x < 400; x += pixelSize) {
          const sourceIndex = (y * 400 + x) * 4;
          const targetIndex = (y * 400 + x) * 4;

          // Random initial position for shuffle effect
          const randomAngle = Math.random() * Math.PI * 2;
          const randomDistance = Math.random() * 200;
          const startX = x + Math.cos(randomAngle) * randomDistance;
          const startY = y + Math.sin(randomAngle) * randomDistance;

          pixelArray.push({
            x: startX,
            y: startY,
            targetX: x,
            targetY: y,
            r: sourceImageData.data[sourceIndex],
            g: sourceImageData.data[sourceIndex + 1],
            b: sourceImageData.data[sourceIndex + 2],
            a: sourceImageData.data[sourceIndex + 3],
            targetR: targetImageDataRef.current!.data[targetIndex],
            targetG: targetImageDataRef.current!.data[targetIndex + 1],
            targetB: targetImageDataRef.current!.data[targetIndex + 2],
            targetA: targetImageDataRef.current!.data[targetIndex + 3],
            velocityX: 0,
            velocityY: 0,
            progress: 0,
          });
        }
      }

      setPixels(pixelArray);
      setImagesLoaded(true);
    };

    sourceImg.src = sourceImageUrl;
  }, [sourceImageUrl]);

  useEffect(() => {
    if (!isAnimating || !imagesLoaded || pixels.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    startTimeRef.current = Date.now();
    const ANIMATION_DURATION = 5000; // 5 seconds

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Easing function for smooth animation
      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const easedProgress = easeInOutCubic(progress);

      // Draw pixels
      pixels.forEach((pixel) => {
        // Interpolate position
        const currentX = pixel.x + (pixel.targetX - pixel.x) * easedProgress;
        const currentY = pixel.y + (pixel.targetY - pixel.y) * easedProgress;

        // Interpolate color
        const currentR = Math.round(pixel.r + (pixel.targetR - pixel.r) * easedProgress);
        const currentG = Math.round(pixel.g + (pixel.targetG - pixel.g) * easedProgress);
        const currentB = Math.round(pixel.b + (pixel.targetB - pixel.b) * easedProgress);
        const currentA = pixel.a + (pixel.targetA - pixel.a) * easedProgress;

        // Draw pixel
        ctx.fillStyle = `rgba(${currentR}, ${currentG}, ${currentB}, ${currentA / 255})`;
        ctx.fillRect(currentX, currentY, 4, 4);
      });

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete, draw final target image
        if (targetImageDataRef.current) {
          ctx.putImageData(targetImageDataRef.current, 0, 0);
        }
        onAnimationComplete();
      }
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating, imagesLoaded, pixels, onAnimationComplete]);

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        className="pixel-canvas"
        width={400}
        height={400}
      />
      
      <style jsx>{`
        .canvas-container {
          position: relative;
          display: inline-block;
          border: 3px solid rgba(0, 255, 136, 0.5);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 255, 136, 0.3);
          background: #000000;
        }

        .pixel-canvas {
          display: block;
          max-width: 100%;
          height: auto;
          image-rendering: pixelated;
        }

        @media (max-width: 768px) {
          .canvas-container {
            max-width: 90vw;
          }
        }
      `}</style>
    </div>
  );
};

export default PixelShuffleCanvas;
