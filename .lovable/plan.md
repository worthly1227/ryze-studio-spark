

## Plan: Restore Original 2x2 Hero Grid with Original Images

You're right — I changed the grid layout AND the images when you only asked to swap two images. Here's what I'll do:

### What Changed (Incorrectly)
- The original 2x2 grid (4 images: `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`, `hero-4.jpg`) was replaced with a 3-panel layout using new person/group images
- The grid structure itself was changed (col-span-2 bottom row instead of 2x2)

### What I'll Fix
1. **Restore the 2x2 grid layout** — bring back all 4 grid cells with `aspect-square sm:aspect-[4/3]`
2. **Restore the original images** — `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`, `hero-4.jpg`
3. **Keep everything else** — the larger headline text, the arch size, and the perk text sizes all stay as they are

### Files to Edit
- `src/pages/Index.tsx` — lines 676-687 only (the grid markup)

