## Plan: Extend Brand Intro to 4s with Dynamic Hooks & Logo Re-trigger

### Changes — `src/pages/Index.tsx`

**1. Add hooks array + cycling state (outside component)**

```ts
const HOOKS = [
  "Tired of overpriced, underperforming agencies?",
  "Results matter. Pretty portfolios don't pay the bills.",
  "Stop overpaying for average creative.",
  "Your brand is burning money on slow, bloated agencies.",
  "Your brand deserves better than standard.",
  "If it doesn't scale, it isn't worth your time.",
  "Creative that scales, not just spends.",
  "Sick of paying for senior talent that doesn't deliver?",
  "Build your brand at the speed of thought.",
  "Traditional agencies aren't dying, they are already dead.",
];
```

Use a `hookIndex` ref that increments (mod 10) each trigger so hooks cycle randomly without repeats.

**2. Update `BrandIntro` timings to 4 seconds**


| Phase | Time     | Duration | Content                                                |
| ----- | -------- | -------- | ------------------------------------------------------ |
| 0     | 0.0–1.5s | 1.5s     | Hook text (from array), smooth fade-in over ~0.4s      |
| 1     | 1.5–3.0s | 1.5s     | "Meet Ryze Studios." + logo centered, smooth crossfade |
| 2     | 3.0–3.3s | 0.3s     | "Meet" fades out, logo + "Ryze Studios" remain         |
| 3     | 3.3–4.0s | 0.7s     | Snap to nav position                                   |


&nbsp;

## Plan: Extend Brand Intro to 4s with Dynamic Hooks & Logo Re-trigger

### Changes — `src/pages/Index.tsx` only

**1. Hooks array (module-level constant)**

10 hook strings. A `useRef` counter cycles through them (random initial pick, then sequential) so each trigger shows a different hook.

**2. Updated `BrandIntro` timings — 4 seconds total**


| Phase | Window    | What happens                                                                                   |
| ----- | --------- | ---------------------------------------------------------------------------------------------- |
| 0     | 0.0s–1.5s | Hook text fades in (0.4s ease), holds, fades out (0.3s)                                        |
| 1     | 1.5s–3.0s | Logo + "Meet Ryze Studios." crossfades in (~0.4s), holds                                       |
| 2     | 3.0s–3.3s | "Meet" fades out smoothly (~0.3s)                                                              |
| 3     | 3.3s–4.0s | Logo+"Ryze Studios" snaps to nav position (0.7s ease-in-out), overlay fades out simultaneously |


Key change: longer `transition.duration` values on each motion element to prevent flicker — phase 0 exit gets 0.3s, phase 1 entrance gets 0.4s, snap gets 0.7s.

**3. Logo click re-triggers the animation**

- Change the nav logo `<button>` `onClick` from `scrollToTop` to a `handleLogoClick` function that:
  - Sets `showIntro = true`, `introComplete = false`
  - Increments the hook counter ref
  - Scrolls to top
- This replays the full 4s sequence with a new hook
- `sessionStorage` is still set on completion but is only checked on initial mount — logo clicks bypass it

**4. Remove session gate for logo-triggered replays**

The `showIntro` initial state still checks `sessionStorage` for first-load behavior. But `handleLogoClick` forces `showIntro = true` regardless, so the animation replays on logo click even within the same session.

**5. Pass current hook text to `BrandIntro**`

Add a `hookText` prop to `BrandIntro` so the parent controls which hook is displayed. The component itself just renders it.  
  
​6. Dynamic Target Calibration:

"Inside the handleLogoClick or the BrandIntro entrance, ensure getBoundingClientRect() is called immediately before the 3.3s–4.0s 'Snap' phase starts. This ensures that even if the user resized their browser window during the first 3 seconds of the animation, the logo snaps to the current, correct coordinates of the header logo.  
  
7. Ensure it is responsive on all devices