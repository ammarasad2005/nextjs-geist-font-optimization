# Developer Implementation Guide

## Architecture Overview

### Component Hierarchy
```
src/
├── app/
│   ├── page.tsx                    (Home page with navigation)
│   ├── layout.tsx                  (Root layout)
│   ├── globals.css                 (Global styles)
│   ├── game/                       (Existing game feature)
│   └── pixel-shuffle/
│       └── page.tsx                (Pixel shuffle main page)
└── components/
    ├── PixelShuffleCanvas.tsx      (Canvas component with animation logic)
    └── [other components...]
```

---

## Core Components

### 1. `/app/pixel-shuffle/page.tsx`

**Purpose**: Main page component for the pixel shuffle feature

**State Management**:
```typescript
const [sourceImage, setSourceImage] = useState<string | null>(null);
const [isAnimating, setIsAnimating] = useState(false);
const [error, setError] = useState<string | null>(null);
const fileInputRef = useRef<HTMLInputElement>(null);
```

**Key Functions**:

#### `handleFileSelect(e: React.ChangeEvent<HTMLInputElement>)`
- Validates file type (JPEG, PNG, GIF, WebP)
- Validates file size (max 10MB)
- Converts file to data URL using FileReader
- Sets error state if validation fails
- Updates sourceImage state on success

#### `handleStartAnimation()`
- Triggers animation by setting `isAnimating` to true
- Only works if sourceImage is loaded

#### `handleReset()`
- Resets all state to initial values
- Clears file input
- Returns to upload screen

**Styling**: Uses scoped CSS with `<style jsx>`

---

### 2. `/components/PixelShuffleCanvas.tsx`

**Purpose**: Core animation component that renders the pixel shuffle effect

**Constants**:
```typescript
const PIXEL_SAMPLE_SIZE = 4;        // Sample every 4th pixel
const ANIMATION_DURATION = 5000;    // 5 seconds
const CANVAS_SIZE = 400;            // 400x400 pixels
const MAX_FILE_SIZE = 10485760;     // 10MB
```

**Props Interface**:
```typescript
interface PixelShuffleCanvasProps {
  sourceImageUrl: string;           // Data URL of source image
  isAnimating: boolean;             // Animation trigger
  onAnimationComplete: () => void;  // Callback when done
}
```

**Pixel Data Structure**:
```typescript
interface Pixel {
  x: number;              // Current X position
  y: number;              // Current Y position
  targetX: number;        // Target X position
  targetY: number;        // Target Y position
  r: number;              // Current red value
  g: number;              // Current green value
  b: number;              // Current blue value
  a: number;              // Current alpha value
  targetR: number;        // Target red value
  targetG: number;        // Target green value
  targetB: number;        // Target blue value
  targetA: number;        // Target alpha value
  velocityX: number;      // Velocity X (unused in current impl)
  velocityY: number;      // Velocity Y (unused in current impl)
  progress: number;       // Animation progress (unused)
}
```

---

## Key Algorithms

### 1. Target Image Generation

```javascript
function createBabarAzamImage(): ImageData
```

**Steps**:
1. Check if running on server (SSR) or client
2. If SSR: Return fallback ImageData with Pakistan flag green
3. If client:
   - Create temporary canvas (400x400)
   - Draw background (Pakistan flag green)
   - Draw star and crescent (Pakistani flag symbols)
   - Draw portrait (face, eyes, nose, mouth)
   - Draw hair
   - Draw jersey number "56"
   - Draw cricket equipment (bat and ball)
   - Add text labels
   - Extract and return ImageData

**Why Procedural?**
- No external image dependencies
- Consistent across all deployments
- Customizable and modifiable
- No copyright concerns

---

### 2. Pixel Extraction

**Process**:
```
Source Image (any size)
    ↓
Resize to 400x400 (via drawImage)
    ↓
Extract ImageData (160,000 pixels)
    ↓
Sample every 4th pixel (10,000 pixels)
    ↓
Store in Pixel array with:
  - Random start position
  - Source color
  - Target position
  - Target color
```

**Sampling Strategy**:
- Original: 400 × 400 = 160,000 pixels
- Sampled: 100 × 100 = 10,000 pixels (every 4th)
- Reason: Performance optimization
- Trade-off: Slight pixelation acceptable

---

### 3. Animation Loop

**Frame Structure**:
```typescript
const animate = () => {
  // 1. Calculate progress (0.0 to 1.0)
  const elapsed = Date.now() - startTimeRef.current;
  const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

  // 2. Apply easing function
  const easedProgress = easeInOutCubic(progress);

  // 3. Clear canvas
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // 4. For each pixel:
  pixels.forEach((pixel) => {
    // a. Interpolate position
    const currentX = pixel.x + (pixel.targetX - pixel.x) * easedProgress;
    const currentY = pixel.y + (pixel.targetY - pixel.y) * easedProgress;

    // b. Interpolate color
    const currentR = pixel.r + (pixel.targetR - pixel.r) * easedProgress;
    // ... (same for G, B, A)

    // c. Draw pixel block
    ctx.fillRect(currentX, currentY, PIXEL_SAMPLE_SIZE, PIXEL_SAMPLE_SIZE);
  });

  // 5. Continue or complete
  if (progress < 1) {
    requestAnimationFrame(animate);
  } else {
    drawFinalImage();
  }
};
```

**Easing Function**:
```typescript
const easeInOutCubic = (t: number): number => {
  return t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};
```

- **Purpose**: Smooth acceleration and deceleration
- **Effect**: Natural, organic movement
- **Alternatives**: linear, easeIn, easeOut, elastic, bounce

---

## Performance Optimizations

### 1. Pixel Sampling
- **Before**: 160,000 pixels per frame
- **After**: 10,000 pixels per frame
- **Improvement**: 16x faster rendering

### 2. RequestAnimationFrame
- **Why**: Browser-optimized timing
- **Benefits**: 
  - Pauses when tab inactive
  - Syncs with display refresh
  - Automatic throttling

### 3. Canvas API
- **Direct pixel manipulation**
- **Hardware acceleration**
- **No DOM manipulation overhead**

### 4. State Management
- **useRef for animation frame**: Avoids re-renders
- **Minimal useState**: Only for UI state
- **Memoization**: Implicit through refs

---

## Browser Compatibility

### Required APIs:
- ✅ Canvas API (2D context)
- ✅ FileReader API
- ✅ RequestAnimationFrame
- ✅ ES6+ (arrow functions, const/let, template literals)
- ✅ React 18+ (hooks)
- ✅ Next.js 13+ (app router)

### Polyfills NOT needed for:
- Modern browsers (2020+)
- Mobile browsers (iOS 14+, Android Chrome 90+)

---

## Memory Management

### Lifecycle:
1. **Mount**: Create refs, initialize state
2. **Image Load**: Store ImageData in memory (~640KB)
3. **Animation**: Update positions/colors (no new allocations)
4. **Unmount**: Cleanup animation frames
5. **Reset**: Clear states, ready for next image

### Memory Footprint:
- Source ImageData: ~640KB (400×400×4 bytes)
- Target ImageData: ~640KB
- Pixel Array: ~1.6MB (10,000 × ~160 bytes)
- **Total**: ~3MB per animation session

---

## SSR Considerations

### Challenge:
- Canvas API only available in browser
- `document` not available during SSR

### Solution:
```typescript
if (typeof document === 'undefined') {
  // Return fallback for SSR
  return createFallbackImageData();
}
```

### Where Applied:
- `createBabarAzamImage()` function
- All canvas operations wrapped in useEffect (client-only)

---

## Testing Strategy

### Unit Tests (Future):
```typescript
// Test file validation
test('rejects non-image files', () => {
  const file = new File([''], 'test.pdf', { type: 'application/pdf' });
  expect(validateFile(file)).toBe(false);
});

// Test animation completion
test('calls onComplete after duration', async () => {
  const onComplete = jest.fn();
  render(<PixelShuffleCanvas {...props} onAnimationComplete={onComplete} />);
  await waitFor(() => expect(onComplete).toHaveBeenCalled(), { 
    timeout: 6000 
  });
});
```

### E2E Tests (Future):
```typescript
// Playwright/Cypress
test('complete user flow', async ({ page }) => {
  await page.goto('/pixel-shuffle');
  await page.setInputFiles('input[type="file"]', 'test-image.jpg');
  await page.click('text=Start Transformation');
  await page.waitForSelector('canvas', { timeout: 6000 });
  // Assert final image
});
```

---

## Future Enhancements

### Potential Features:
1. **Adjustable Speed**: Allow users to control animation duration
2. **Custom Targets**: Upload target image instead of fixed Babar Azam
3. **Different Effects**: Spiral, wave, explode patterns
4. **Save/Share**: Download result, share on social media
5. **More Pixels**: Toggle between quality levels
6. **Color Themes**: Different color schemes
7. **Sound Effects**: Audio feedback during animation
8. **Multiple Images**: Batch processing

### Technical Improvements:
1. **Web Workers**: Offload pixel calculations
2. **WebGL**: Use GPU for rendering
3. **Progressive Loading**: Show preview while processing
4. **Caching**: Store processed images
5. **Compression**: Reduce memory usage
6. **A11y**: Better screen reader support
7. **i18n**: Internationalization
8. **Analytics**: Track usage patterns

---

## Code Style Guidelines

### Naming Conventions:
- Components: PascalCase (`PixelShuffleCanvas`)
- Functions: camelCase (`handleFileSelect`)
- Constants: UPPER_SNAKE_CASE (`PIXEL_SAMPLE_SIZE`)
- Props: camelCase (`isAnimating`)

### TypeScript:
- Always define interfaces for props
- Use explicit types for state
- Avoid `any` type
- Use strict mode

### React:
- Use functional components
- Use hooks (useState, useEffect, useRef)
- Cleanup effects properly
- Memoize expensive calculations

### Styling:
- Scoped CSS with `<style jsx>`
- Mobile-first responsive design
- Accessibility-first approach
- Consistent spacing/colors

---

## Deployment Checklist

Before deploying:
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Verify accessibility
- [ ] Check performance metrics
- [ ] Review security considerations
- [ ] Update documentation
- [ ] Tag version
- [ ] Create release notes

---

## Support & Maintenance

### Bug Reports Should Include:
1. Browser/OS version
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshot/video if applicable
5. Console errors
6. Image file used (if applicable)

### Common Issues:
1. **Slow animation**: Reduce pixel count or increase duration
2. **Memory issues**: Check for memory leaks in cleanup
3. **SSR errors**: Ensure proper browser checks
4. **File upload fails**: Check CORS and file validation

---

## Contributing

### To Add New Features:
1. Create feature branch
2. Update TypeScript interfaces
3. Add tests
4. Update documentation
5. Submit PR with clear description

### Code Review Focus:
- Performance impact
- Browser compatibility
- Accessibility
- Security implications
- Code maintainability

---

## License & Credits

- Built with Next.js and React
- Canvas API for rendering
- Inspired by pixel morphing effects
- Dedicated to cricket fans worldwide 🏏
