## Plan: Plan-Aware User Journey with Image Upload & Rebuilt Client Portal

This is a large system. We'll build it frontend-first with mock plan detection (localStorage), then swap in real backend later. The work breaks into 3 major areas.

---

### 1. Plan Context System (shared state)

**Create `src/contexts/PlanContext.tsx**` — a React context that stores the user's purchased plan and exposes plan-aware helpers.

- `currentPlan`: string (plan name) stored in localStorage
- `planFeatures`: derived object with booleans like `hasTemplates`, `hasShortFormVideo`, `hasUGC`, `hasManagedPosting`, `hasStrategySessions`, `imageCredits`, `templateCount`, etc.
- `setPlan(planName)`: called after checkout confirmation
- Wrap the app in this provider

**Plan feature matrix** (derived from existing tier data):


| Feature           | Entry | Starter | Viral | Brand Mgr | Done4You  | Master    |
| ----------------- | ----- | ------- | ----- | --------- | --------- | --------- |
| Image Upload      | yes   | yes     | yes   | yes       | yes       | yes       |
| Templates         | no    | 10      | 15    | 20        | 30        | 40        |
| Short Videos      | no    | no      | 1     | 2         | 2         | 3         |
| UGC Videos        | no    | no      | no    | no        | 1         | 2         |
| Managed Posting   | no    | no      | no    | yes       | yes       | yes       |
| Strategy Sessions | no    | no      | no    | no        | quarterly | quarterly |


---

### 2. Post-Payment Setup Wizard (`/setup`)

**Create `src/pages/PlanSetup.tsx**` — a multi-step wizard shown once after purchase. Steps shown/skipped based on plan:

1. **Welcome & Plan Summary** — confirms what they purchased, shows included services
2. **Image Upload** (ALL plans) — drag-and-drop upload area for product images (reuse the upload UI pattern from `ClientUploads.tsx`)
3. **Template Selection** (plans with templates) — show available templates filtered by plan allowance
4. **Short-Form Video Options** (Viral Growth+) — select video style/preferences
5. **Advanced Services Redirect** (Full Brand Manager+) — for managed posting, strategy sessions, UGC selection — shows a summary card and CTA to enter the client portal

Steps 3-5 are conditionally rendered based on `planFeatures`. Each step stores selections in localStorage for now.

**Route**: Add `/setup` to App.tsx, accessible after checkout.

**Wire checkout flow**: Update `CheckoutModal.tsx` confirmation screen's "Get Started" button to call `setPlan()` then navigate to `/setup` instead of `/onboarding`.

---

### 3. Rebuilt Client Portal

**Replace the current generic client portal** with a plan-aware, streamlined portal. Remove unused/generic pages; keep only what clients actually need.

**New sidebar structure** (`ClientSidebar.tsx` rewrite):

- **Dashboard** — plan status, usage summary, guided checklist
- **Upload Center** — universal image uploads (keep existing `ClientUploads.tsx`)
- **AI Factory** — image generation tools (keep existing, gate credits by plan)
- **Templates** — plan-filtered template library (conditionally shown)
- **My Videos** — short-form & UGC video management (shown for Viral Growth+)
- **Social Posting** — managed posting chat/dashboard (shown for Full Brand Manager+)
- **Strategy Sessions** — calendar booking widget (shown for Done For You+)
- **Deliverables** — download completed work (keep existing)
- **Status Tracker** — production progress (keep existing)
- **Settings** — account settings

Sidebar items are conditionally rendered using `usePlan()` context. Locked features show a subtle "upgrade" indicator.

**Dashboard rewrite** (`Dashboard.tsx`):

- Dynamic plan card showing current plan name, usage stats, renewal date
- **Guided checklist widget**: "Upload your images", "Select templates", "Choose video options" — checks off as user completes each step
- Quick-access cards only for services included in their plan

**New pages to create**:

- `src/pages/client/MyVideos.tsx` — view/manage short-form and UGC video orders
- `src/pages/client/SocialPosting.tsx` — managed posting dashboard with chat access
- `src/pages/client/StrategySessions.tsx` — calendar booking (Calendly-style embed placeholder)

**Pages to remove from client portal routes**:

- `/client/messages` (replaced by Social Posting chat for eligible plans)
- `/client/projects` (consolidated into Status Tracker + Deliverables)

---

### 4. App.tsx Route Updates

```text
/setup              → PlanSetup (post-payment wizard)
/dashboard          → Dashboard (plan-aware)
/client/uploads     → ClientUploads (universal)
/ai-factory         → AIFactory (plan-gated credits)
/templates          → Templates (plan-filtered)
/client/videos      → MyVideos (Viral Growth+)
/client/social      → SocialPosting (Full Brand Mgr+)
/client/strategy    → StrategySessions (Done For You+)
/client/deliverables→ ClientDeliverables
/status-tracker     → StatusTracker
/settings           → SettingsPage
```

---

### Files to Create

- `src/contexts/PlanContext.tsx`
- `src/pages/PlanSetup.tsx`
- `src/pages/client/MyVideos.tsx`
- `src/pages/client/SocialPosting.tsx`
- `src/pages/client/StrategySessions.tsx`

### Files to Modify

- `src/App.tsx` — add new routes, remove old ones
- `src/components/layout/ClientSidebar.tsx` — plan-aware conditional nav
- `src/pages/Dashboard.tsx` — plan-aware dashboard with checklist
- `src/components/CheckoutModal.tsx` — wire to PlanContext and navigate to `/setup`
- `src/main.tsx` — wrap with PlanProvider (or in App.tsx)

### Files to Remove (from routes, not delete)

- `/client/messages` route (replaced by `/client/social`)
- `/client/projects` route (consolidated)  
  
Also Implement responsive design for mobile users
  Add loading states for the wizard steps