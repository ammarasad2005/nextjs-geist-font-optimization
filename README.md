# Pixel Shuffle Transformer - Babar Azam

This is an interactive web application that transforms any uploaded image into an image of Babar Azam (Pakistan Cricket Captain) through an amazing pixel shuffling animation.

## Features

### 🎨 Pixel Shuffle Animation
- Upload any image (JPG, PNG, GIF, etc.)
- Watch as pixels shuffle and rearrange themselves
- Smooth transformation over 5 seconds
- Color interpolation for seamless transition

### 🏏 Babar Azam Target Image
The target image is procedurally generated and includes:
- Pakistan flag colors (green background)
- Pakistani flag symbols (star and crescent)
- Cricket themed elements (bat and ball)
- Jersey number 56 (Babar Azam's ODI jersey number)
- Portrait representation

## How to Use

1. **Navigate to the app**: Open the application in your browser
2. **Go to Pixel Shuffle**: Click on "Pixel Shuffle Magic" card from the home page
3. **Upload an image**: Click "Select Image" and choose any image from your device
4. **Start transformation**: Click "Start Transformation" to begin the animation
5. **Watch the magic**: See your image pixels shuffle and transform into Babar Azam!
6. **Try again**: Click "Upload New Image" to try with a different image

## Technical Details

### Algorithm
1. **Source Image Loading**: The uploaded image is loaded and resized to 400x400 pixels
2. **Pixel Extraction**: Every 4th pixel is sampled for performance (creating a 100x100 grid)
3. **Random Initial Positions**: Pixels start at random positions around the canvas
4. **Animation Loop**: 
   - Each pixel moves from its random position to its target position
   - Color values interpolate from source to target
   - Easing function (cubic ease-in-out) for smooth motion
5. **Completion**: After 5 seconds, the final target image is rendered

### Components

#### `/src/app/pixel-shuffle/page.tsx`
Main page component that handles:
- File upload UI
- Animation controls
- Layout and styling

#### `/src/components/PixelShuffleCanvas.tsx`
Canvas component that handles:
- Image loading and processing
- Pixel data management
- Animation loop
- Canvas rendering

### Performance Optimizations
- **Pixel Sampling**: Only every 4th pixel is animated (10,000 pixels instead of 160,000)
- **RequestAnimationFrame**: Efficient rendering using browser's animation API
- **Canvas API**: Hardware-accelerated 2D rendering
- **Cleanup**: Proper cleanup of animation frames on unmount

## Browser Compatibility

Works in all modern browsers that support:
- HTML5 Canvas
- FileReader API
- ES6+ JavaScript
- CSS Grid and Flexbox

## Accessibility

- Keyboard navigation support
- Focus indicators for interactive elements
- Reduced motion support (respects `prefers-reduced-motion`)
- High contrast mode support
- Semantic HTML structure

## Responsive Design

- Desktop: Full-size canvas and controls
- Tablet: Adapted layout
- Mobile: Responsive canvas sizing and touch-friendly controls

## Credits

Built with:
- Next.js 13+ (App Router)
- React 18+
- TypeScript
- HTML5 Canvas API

Inspired by pixel morphing effects and dedicated to cricket fans! 🏏

---

**Note**: This is a front-end only implementation. No server-side processing is required. All image processing happens in the browser using the Canvas API.
