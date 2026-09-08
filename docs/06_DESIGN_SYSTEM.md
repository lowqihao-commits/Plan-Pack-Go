# Plan Pack Go — Design System

All items below are **LOCKED / APPROVED for the prototype** unless marked otherwise.

## Brand identity

- **Name:** always `Plan Pack Go`; never `PPG` or `PP&G`.
- **Personality:** smart, calm, warm, practical, friendly, relaxed, organised, fresh, youthful and travel-oriented.
- **Avoid:** corporate stiffness, childish decoration and AI-tech-heavy control-centre visuals.
- **Slogan:** `Plan smart. Pack right. Go ready.`

## Colour tokens

| Token | Value | Intended use |
|---|---:|---|
| Primary Teal | `#61C0BF` | main brand, primary actions, Needed, active navigation |
| Mint | `#BBDED6` | supportive surfaces, Possibly Useful |
| Coral | `#FFB6B9` | Shared items, limited highlights and calm alerts |
| Cream | `#FAE3D9` | warm background accents and Splash |
| Primary Text | `#243B53` | headings and high-emphasis body text |
| Secondary Text | `#64748B` | metadata and supporting copy |
| Surface | `#FFFFFF` | cards, forms and primary content surfaces |

Do not introduce a new dominant brand colour. Teal + checkmark means Packed. Coral alerts must still use dark text/icon treatment with accessible contrast.

## Typography

- **UI font:** Inter.
- Screen/page titles and section headings: Semi Bold.
- Body: Regular.
- Buttons, tabs and labels: Medium or Semi Bold.
- Use a restrained mobile type scale with clear hierarchy; do not invent display fonts or a complex typographic system.

## Spacing and shape

- 8-point spacing system; use 4 px only for fine internal alignment where necessary.
- Minimum interactive target: 44 × 44 px.
- Cards and inputs are softly rounded and consistent, not pill-shaped everywhere.
- Use comfortable content padding, clear grouping and sufficient scroll spacing.
- Light, restrained shadows or borders may separate surfaces. No heavy shadows.

## Buttons

- **Primary:** Teal fill, accessible dark/light label selected by contrast, one dominant action per view.
- **Secondary:** white or Mint surface with Teal/dark text and border where needed.
- **Tertiary/text:** for Back, Skip, Review later and low-risk actions.
- **Destructive:** restrained Coral-tinted treatment plus explicit wording/confirmation.
- Disabled and loading states remain recognizable without relying on colour alone.

## Cards, forms and icons

- Cards: white or supportive Mint/Cream tint, consistent radius and concise content.
- Form fields: visible label, clear boundary, helper/error text and focus state.
- Icons: simple, consistent rounded line style; combine icon + label for non-obvious actions.
- Statuses use label/icon as well as colour.
- Avoid decorative blobs, neon, glassmorphism, interface gradients and bottom navigation.

## Logo

Approved concept and asset: a compact location pin containing a landscape, paired with a rolling suitcase, dotted route and checkmark, plus the full rounded `Plan Pack Go` wordmark. Preserve proportions and brand colours.

The supplied original PNG has an opaque Cream image background and surrounding shadow that are not part of the standalone logo mark. It is the authoritative visual reference; do not use failed halo-contaminated cutouts. See `09_ASSET_MANIFEST.md`.

## Mascot

Approved identity: a simple rounded teal owl with Cream face/belly, very large teal eyes, dark teal round glasses, Coral cheeks and scarf, orange beak/feet, dark teal backpack and Coral rolled sleeping mat.

Use the mascot only when meaning improves:

- Splash/loading: flying along a short dotted route.
- Itinerary/analysis: studying a folded map.
- Packing: packing a suitcase.
- Warning: holding a small warning sign; calm rather than alarming.
- Packing complete: sitting on a closed suitcase with a check.
- Trip ready: taking off with backpack.

Do not place the owl decoratively on Login, My Trips or every screen. Interface surfaces remain flat/clean; the mascot and logo may retain their existing soft internal shading.

- **Mascot name:** `TODO / Not yet decided`. Do not write `[Mascot name] suggests...` until a name is approved; use `Suggested for your trip` or equivalent neutral copy.

## Warnings, success and accessibility

- Warnings appear near the affected item and explain the consequence plus limited actions.
- Success uses Teal/checkmark and short copy; mascot only for milestone moments.
- Maintain accessible contrast for text, controls and focus states.
- Never communicate Needed/Possibly Useful/Shared/Packed using colour alone.
- Support readable text sizing, keyboard focus for the web prototype, semantic labels and reduced-motion behaviour for non-essential animation.

## Visual prohibitions

No gradients in interface chrome, glassmorphism, extra tabs, bottom navigation, noisy decoration, excessive mascot use, or new dominant colours. No visual pattern may imply an excluded feature such as currency conversion, budget enforcement, chat or booking.
