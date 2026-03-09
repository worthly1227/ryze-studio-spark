

## Problem

The share button never shows the modal because `navigator.share` is available on modern desktop Chrome too. So the code always takes the `navigator.share` path (which silently fails or gets cancelled in the iframe), and `setShowShareModal(true)` is never reached.

Additionally, the Dialog modal structure bypasses `DialogContent` and uses a raw `div` inside `DialogPortal`, which may cause z-index/interaction issues.

## Fix — `src/pages/Index.tsx`

1. **Fix mobile detection**: Replace `if (navigator.share)` with a proper mobile check using touch/screen-width detection (e.g. `'ontouchstart' in window && window.innerWidth < 768`). Only use `navigator.share` on actual mobile devices.

2. **Fix Dialog structure**: Replace the custom `DialogPortal > DialogOverlay > div > motion.div` structure with proper `DialogContent` from the existing Dialog component. Add the `backdrop-blur-sm` via the overlay className override. This ensures proper focus trapping, dismissal on overlay click, and correct z-indexing.

The share options, grid layout, icons, and share text all stay the same.

