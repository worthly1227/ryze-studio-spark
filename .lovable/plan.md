## Plan: Brand Entrance Animation for Hero Section

### What it does

A 1.5-second cinematic intro sequence that plays once per session (tracked via `sessionStorage`). It overlays the entire page with a white screen, cycles through two text phases, then "snaps" the logo+brand into the navbar position before revealing the hero content.

### Animation Sequence

```text
Time    Visual
─────   ──────────────────────────────────────────
0.0s    White fullscreen. Centered bold text: "Tired of overpriced, underperforming agencies?"
0.5s    Text swaps to: [logo] "Meet Ryze Studios." (black logo + text, centered)
1.0s    "Meet" fades out → just [logo] + "Ryze Studios" remains centered
1.3s    Logo+text animate (ease-in-out) from center to top-left nav position, scaling down
1.5s    White overlay fades out, hero grid + $10 CTA fade in. Done.
```

### Changes — `src/pages/Index.tsx`

1. **Add intro state**: `const [showIntro, setShowIntro]` — check `sessionStorage.getItem('ryze_intro_shown')` on mount. If already shown, skip entirely.
2. **Intro overlay component** (inline in Index): A `fixed inset-0 z-[100] bg-white` div with `AnimatePresence`. Uses a `phase` state (0→1→2→3→done) driven by `setTimeout` calls at 500ms, 1000ms, 1300ms, 1500ms intervals.
  - **Phase 0 (0–0.5s)**: Centered text "Tired of overpriced, underperforming agencies?" — `font-heading font-bold text-black`, fade-in.
  - **Phase 1 (0.5–1.0s)**: Swap to `<img ryze-logo> Meet Ryze Studios.` — centered, black, `font-heading font-bold`. Previous text fades out, new fades in.
  - **Phase 2 (1.0–1.3s)**: "Meet" fades out, leaving just logo + "Ryze Studios" centered.
  - **Phase 3 (1.3–1.5s)**: Use framer-motion `animate` to move the logo+text from center to the nav's top-left position. Use a ref on the actual nav logo element to get its `getBoundingClientRect()` for pixel-perfect landing. Scale down to match nav logo size. Ease-in-out.
  - **Phase done (1.5s)**: Set `sessionStorage.setItem('ryze_intro_shown', 'true')`, remove overlay, fade in hero content.
3. **Hero content**: Wrap the hero section + CTA in a motion.div that starts with `opacity: 0` when intro is active and animates to `opacity: 1` at phase done.
4. **Nav visibility**: Hide the nav logo/text during the intro (conditional className or opacity:0) so there's no duplicate when the animated logo snaps into place.
5. **No new files or dependencies** — uses existing framer-motion + sessionStorage.

### Technical details

- The nav logo element gets a `ref` to measure its exact screen position via `getBoundingClientRect()` for the snap target.
- All text uses `font-heading` (Sora) for consistency with existing header styling.
- The overlay uses `z-[100]` to sit above the nav (`z-50`).
- `pointer-events-none` after animation completes to prevent interaction blocking.
- Responsive: text uses standard responsive classes (`text-2xl sm:text-4xl md:text-5xl`), no hardcoded pixel sizes.  
  
**Ensure the header logo is rendered in the DOM with a stable ref from the start, so the getBoundingClientRect() calculation has a valid target even before the intro animation completes.**  
  
**Ensure everything is tablet and mobile responsive as well**