# Plan Pack Go — Visual Design Source of Truth

## Status and authority

This file defines the final approved visual foundation for Bolt visual polish. It is based on `docs/06_DESIGN_SYSTEM.md` and the current React/Vite implementation.

The application is functionally complete and has passed final QA. Visual polish must preserve navigation, screen structure, Solo/Group branching, feature logic, state behavior, accessibility behavior, copy meaning, and approved assets.

## Brand personality

Plan Pack Go is friendly, organised, relaxed, youthful, travel-oriented, fresh, modern, trustworthy and approachable. It should feel like a calm travel companion, not a business control centre.

- Product name: always `Plan Pack Go`; never abbreviate it.
- Slogan: `Plan smart. Pack right. Go ready.`
- Core value: turn an actual itinerary into an actionable, coordinated packing plan.
- Product principle: **AI recommends, user decides.**

Avoid corporate SaaS styling, finance-app styling, generic purple AI aesthetics, futuristic control-centre visuals, childish cartoon UI, heavy glassmorphism and excessive gradients.

## Colour system

| Token | Value | Use |
|---|---:|---|
| Primary Teal | `#61C0BF` | Primary CTAs, active states, Needed items, Smart Packing emphasis |
| Secondary Mint | `#BBDED6` | Supportive cards, Possibly Useful items, calm progress surfaces |
| Accent Coral | `#FFB6B9` | Shared/group states, selective highlights and calm warnings |
| Warm Cream | `#FAE3D9` | Splash, warm brand surfaces, empty/loading moments |
| Primary Text | `#243B53` | Headings and high-emphasis text |
| Secondary Text | `#64748B` | Supporting copy and metadata |
| Surface | `#FFFFFF` | Cards, forms and primary content surfaces |

Do not introduce a new dominant brand colour. Derivative tints may support hierarchy but must remain visibly rooted in the approved palette. Coral warnings require dark text/icons and must not become alarm-heavy. Teal plus a checkmark communicates Packed or successful completion.

## Typography

- Current UI font: Inter with system sans-serif fallback.
- Keep the existing font unless a later approved visual-polish decision provides a clear reason to change it.
- Large page title: approximately 24–28 px, Semi Bold.
- Section title: approximately 18–22 px, Semi Bold.
- Card title: approximately 15–17 px, Semi Bold.
- Body: approximately 14–16 px, Regular.
- Supporting text: approximately 12–14 px, Regular or Medium.
- Buttons, tabs and labels: Medium or Semi Bold.

Use sentence case, readable line-height and a restrained hierarchy. Avoid essential text below 12 px and do not introduce decorative display fonts.

## Mobile layout and spacing

- Primary presentation viewport: approximately `390 × 844`.
- Use a mobile-first single-column structure and efficient vertical scrolling.
- Follow the existing 8-point spacing rhythm; 4 px is acceptable for fine internal alignment.
- Maintain comfortable gutters and clear grouping.
- Minimum practical touch target: `44 × 44 px`.
- Respect safe areas and keep sticky actions reachable.
- Wider views may center the mobile shell; do not redesign it into a desktop dashboard.

Rounded corners should feel soft and modern, not pill-shaped everywhere. Shadows and borders remain restrained. Avoid excessive nested cards.

## Component consistency

### Buttons

- Primary: Teal fill and one dominant action per view.
- Secondary: white or Mint surface with clear border and dark/Teal text.
- Tertiary: Back, Skip, `Done for now` and low-risk actions.
- Destructive: restrained Coral tint with explicit wording and confirmation.
- Preserve clear hover, active, focus, disabled and loading states.

### Cards and list rows

- Use white, Mint or Cream surfaces according to meaning.
- Keep padding, radius, border weight and title hierarchy consistent within each component family.
- Prefer simple separated list rows for dense information; do not wrap every line in another card.

### Inputs

- Keep visible labels, comfortable padding, clear boundaries, focus states and nearby helper/error text.
- Preserve the existing validation and form behavior.

### Status chips

- Keep labels concise and use text/icon plus colour.
- Do not overuse chips or make every piece of metadata a pill.

### Progress

- Use calm Teal progress treatment with a readable numeric or text label.
- Never rely on colour alone.

### Dialogs and sheets

- Preserve the current accessible modal behavior: focus entry, focus containment, Escape dismissal, focus return and background isolation.
- Use lightweight bottom sheets/cards for itinerary adjustments.

### App bars, tabs and navigation

- Keep concise sticky app bars with a clear Back action.
- Preserve existing tab count, day-selector behavior and keyboard semantics.
- Do not introduce bottom navigation or extra tabs.

### Icons

- Continue the existing rounded outline icon style and consistent stroke weight.
- Pair unfamiliar actions with text labels.

## Module hierarchy

### Smart Packing — core differentiator

Smart Packing must receive slightly stronger visual hierarchy than supporting modules through composition, progress, grouping and selective mascot use—not simply more colour.

- Needed: stronger Primary Teal emphasis.
- Possibly Useful: softer Mint treatment.
- Shared: selective Coral accent.
- Packed: calm Teal/checkmark success state.
- Unassigned: clearly needs attention without red-heavy alarm styling.
- Keep `Why suggested`, Add/Skip decisions, Personal/Shared distinction, suggested quantities and responsibility states easy to scan.
- Personal Packing remains private in Group mode.
- Shared Packing remains `Unassigned → Assigned/Claimed → Packed`.

### Dashboard

Keep it a lightweight travel hub. Itinerary, Smart Packing, Budget and Group (Group only) must be immediately understandable. Smart Packing may receive the strongest module emphasis; Trip Updates stay lightweight.

### My Trips

Keep the logo/profile area welcoming, `Add New Trip` prominent and trip cards concise. Search/filter must not dominate.

### Itinerary and route

Prioritize day switching, time hierarchy, stop order, travel segments, warnings and the Overnight Stay/final Return Home distinction. Avoid tiny route or timing text.

### Group Preference

Make place, Added by, personal rating, group score and participation progress easy to compare. High/Medium/Low must remain readable without relying on colour alone.

### Budget, Group and Profile

These are supporting tools. Budget must not look like banking software; Group Management stays friendly and lightweight; Profile/Settings stays simple.

## Approved logo and mascot assets

Do not redraw, regenerate, reinterpret, vectorize, replace or recolour the approved raster assets.

| Role | Approved source | Runtime file/status |
|---|---|---|
| Plan Pack Go logo | `assets/logo/plan-pack-go-logo-original.png` | `prototype/public/assets/plan-pack-go-logo.png` |
| Base/loading owl | `assets/mascot/mascot-master-transparent.png` | `prototype/public/assets/mascot-master-transparent.png` |
| Itinerary/AI analysis owl | `assets/mascot/mascot-map-transparent.png` | `prototype/public/assets/mascot-map-transparent.png` |
| Shared-warning owl | `assets/mascot/mascot-warning-transparent.png` | `prototype/public/assets/mascot-warning-transparent.png` |
| Packing-complete owl | `assets/mascot/mascot-packing-complete-transparent.png` | `prototype/public/assets/mascot-packing-complete-transparent.png` |
| Packing pose reference | `assets/mascot/packing.png` | Approved opaque reference; not loaded at runtime |
| Loading/trip-ready flight reference | `assets/mascot/letsgo.png` | Approved opaque reference; not loaded at runtime |

Use the owl selectively for AI analysis, packing generation, loading, meaningful empty states, shared-item warning, packing completion and trip readiness. Do not place it on every screen. The mascot name remains undecided; use neutral copy such as `Suggested for your trip`.

## Accessibility and motion

- Preserve accessible contrast, semantic labels, visible keyboard focus and readable supporting text.
- Preserve current dialog and tab accessibility behavior.
- Communicate states with labels/icons as well as colour.
- Use subtle, purposeful motion and respect `prefers-reduced-motion`.
- Do not add decorative animation that competes with task completion.

## Visual prohibitions

No interface gradients, glassmorphism-heavy treatment, noisy decoration, excessive mascot use, bottom navigation, extra screens/tabs, new dominant colours, corporate dashboard styling, finance-app styling or generic AI-purple treatment. Visual polish must not imply excluded functions such as chat, booking, payment settlement, currency conversion or budget enforcement.
