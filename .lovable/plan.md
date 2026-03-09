

## Plan: Fix Post-Payment Navigation & Console Warnings

### Problem Identified

The "404" you saw after completing Viral Growth checkout is actually the **"No Active Session" lock screen** on `/generate`. This happens because the checkout modal passes `{ state: { sessionActive: true } }` via React Router navigation — but this state is fragile and gets lost on page refresh or certain navigation patterns.

The route `/generate` exists and the plan name "Viral Growth" is valid, so there's no actual 404. The lock screen with "No Active Session" and "Purchase a plan to start generating" just looks like an error page.

### Fix 1: Remove `sessionActive` state dependency

In `src/pages/GenerateSession.tsx`, change the guard on line 51 from:

```
if (!sessionActive || !currentPlan)
```

to just:

```
if (!currentPlan)
```

Since `setPlan()` is called in `handleGetStarted` before navigation, `currentPlan` is already set in the PlanContext (persisted in localStorage). The `sessionActive` location state check is redundant and fragile. Remove the `sessionActive` variable and the `location` import if no longer needed.

### Fix 2: Fix `forwardRef` console warnings

Three components are triggering "Function components cannot be given refs" warnings:

- **`FaqItem`** in `src/pages/Index.tsx` — wrapped in `AnimatePresence` which tries to pass a ref
- **`CheckoutModal`** in `src/components/CheckoutModal.tsx` — used as a child of `Index` where a ref is attempted
- **`EntryLevelPaymentModal`** in `src/components/EntryLevelPaymentModal.tsx` — same issue

Wrap these components with `React.forwardRef` where they're being passed refs, or adjust the parent to not pass refs to function components.

### Fix 3: Mobile responsiveness check

Ensure the `/generate` page layout (upload area, prompt bar, generated images grid) uses responsive classes (`grid-cols-1 sm:grid-cols-2`, proper padding on mobile).

### Files to Modify

- `src/pages/GenerateSession.tsx` — remove `sessionActive` guard, rely on `currentPlan` only
- `src/pages/Index.tsx` — fix `FaqItem` forwardRef warning
- `src/components/CheckoutModal.tsx` — add forwardRef if needed
- `src/components/EntryLevelPaymentModal.tsx` — add forwardRef if needed

