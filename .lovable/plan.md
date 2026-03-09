

## Plan: Fix Logo Not Showing / Showing Late in Brand Intro

### Root Cause

The logo (`ryze-logo.jpeg`) is loaded via an `<img>` tag inside the `BrandIntro` component. It only starts loading when Phase 1 renders (at 1.5s). If the image isn't cached, it may not appear until after the phase has already passed — or flicker in late.

### Fix — `src/pages/Index.tsx`

1. **Preload the logo image before starting the animation**: Add a `useEffect` in `BrandIntro` that creates an `Image()` object to preload `ryzeLogo` before the animation begins. Gate the phase timers behind the image being loaded.

2. **Alternatively (simpler, more robust)**: Render the logo `<img>` from Phase 0 but keep it hidden (`opacity: 0, position: absolute`), so the browser starts fetching it immediately. This ensures the image is in the browser cache by the time Phase 1 needs it.

3. **Also fix the console warnings**: The `AnimatePresence` inside the `<span>` is passing a `ref` to a function component (`motion.span`). Wrap the inner `AnimatePresence` content properly to avoid the React ref warning.

### Implementation Detail

**Preload approach** (in `BrandIntro`):
```tsx
const [logoLoaded, setLogoLoaded] = useState(false);

useEffect(() => {
  const img = new Image();
  img.src = ryzeLogo;
  img.onload = () => setLogoLoaded(true);
  if (img.complete) setLogoLoaded(true);
}, []);
```

Then gate the timer setup: only start the phase timers once `logoLoaded` is true. This ensures the logo is ready before any animation begins — no flicker, no late appearance.

**Console warning fix**: The nested `AnimatePresence` around the "Meet" `motion.span` triggers a ref warning because framer-motion's `PopChild` tries to pass a ref to `AnimatePresence` (a function component). Wrapping it in a `<span>` container eliminates this.

### Files Changed
- `src/pages/Index.tsx` — `BrandIntro` component only

