

## Plan: Premium Share Modal for ProofCard

### What changes

**`src/pages/Index.tsx`** — Modify the `ProofCard` component:

1. **Add `showShareModal` state** alongside existing `showComments` state.

2. **Replace `handleShare`**:
   - Mobile: Keep `navigator.share` (native sheet).
   - Desktop: Set `showShareModal = true` to open the custom modal.
   - Detection via a simple `navigator.share` check (available = mobile behavior).

3. **Add a Share Modal** using the existing `Dialog` component from `@/components/ui/dialog`:
   - `DialogOverlay` with added `backdrop-blur-sm` class for frosted glass effect.
   - `DialogContent` centered, rounded corners, subtle border — matching Ryze aesthetic.
   - **Header**: "Share this post" title + close X (built into DialogContent).
   - **Body**: Clean grid (3 or 5 columns) with these options:
     - **Copy Link** — clipboard copy with toast confirmation
     - **WhatsApp** — `https://wa.me/?text=...`
     - **iMessage** — `sms:&body=...`
     - **Facebook** — `https://www.facebook.com/sharer/sharer.php?u=...&quote=...`
     - **Email** — `mailto:?subject=...&body=...`
   - Each icon: monochrome Lucide icon (`Copy`, `MessageSquare`, `Facebook`, `Mail` + a WhatsApp SVG inline) inside a circular `bg-muted/50 backdrop-blur` container.
   - Click handler opens the respective URL in a new tab (or copies to clipboard for Copy Link).
   - **Dismissal**: Clicking overlay or X closes modal (built-in Dialog behavior).

4. **Share text** stays the same: AI prompt + CTA + ryzestudios.com link.

### Technical notes
- Use `Dialog` + `DialogContent` from existing UI components — no new dependencies.
- Override `DialogOverlay` className to add `backdrop-blur-sm` for the frosted glass effect.
- WhatsApp icon: use a simple inline SVG since Lucide doesn't have a WhatsApp icon, or use the `Phone` icon as a stand-in. Will use a small custom SVG for authenticity.
- Grid layout: `grid grid-cols-5 gap-4` for the 5 share options, each as a flex-col with icon + label.

