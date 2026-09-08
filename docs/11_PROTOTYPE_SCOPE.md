# Plan Pack Go — Prototype Scope

## Goal

Build a polished mobile-first interactive frontend that demonstrates the approved Plan Pack Go experience at approximately `390 × 844`.

The strongest demo story is:

1. create a Group trip;
2. collect and rate places asynchronously;
3. confirm final places;
4. build/adjust a day-based itinerary;
5. convert itinerary context into explainable Smart Packing suggestions;
6. coordinate Shared Packing; and
7. respond to one lightweight itinerary or packing change.

A complete Solo branch must also remain navigable and must hide all Group-only functionality.

## Technology direction

- React + Vite unless explicitly changed.
- Mobile-first responsive CSS and reusable components.
- Simple local state/mock service layer.
- Approximately 390 × 844 is the primary review viewport; wider screens may center the mobile shell without becoming a desktop redesign.
- Architecture should be understandable and easy to change; do not over-engineer.

## Must demonstrate

- Splash, Login/Sign Up and My Trips navigation.
- Linear trip creation with Solo/Group branching.
- Solo Waiting List → Final Review path.
- Group Shared Waiting List → public 0–10 Rating → Review Results → Final Review path.
- Final places confirmed before itinerary planning.
- Day itinerary, Overnight Stay on days that continue into another night, `Return home` / `Trip ends` on the final departure day, and Route Preview.
- Solo and Group dashboards.
- Itinerary-derived Smart Packing with Needed/Possibly Useful and Why suggested, including an explicit AI Suggestions entry on both Smart Packing home variants.
- Explicit Add/Skip and delta update preserving decisions.
- Private Personal Packing and Group high-level progress.
- Shared Packing state/quantity coordination.
- Lightweight recorded trip costs and equal shared split.
- Group management/participation and shared-item reassignment warning.
- Representative place unavailable, delay, weather and add-place impact flows.
- Approved brand system, logo reference and limited mascot states.

## May simulate

- authentication and Google sign-in;
- AI packing generation and explanations;
- route optimization, travel time and distance;
- maps and numbered route pins;
- weather and opening-hours alerts;
- asynchronous Group ratings and collaboration;
- invitations and member status;
- reminder delivery;
- image upload for optional Outfit Planning; and
- success/error states.

## Explicitly not a production system

- No production backend or database requirement.
- No real authentication/security system.
- No production Google Maps/live navigation integration.
- No payment collection or settlement system.
- No production weather/opening-hours engine.
- No real realtime Group backend.
- No complete AI backend/model integration.
- No native app packaging unless separately requested.

## Product exclusions

Do not implement onboarding, chat, currency settings/conversion, budget limits, remaining-budget forecast, over-budget warnings, unequal/custom expense split, settlement optimizer, private Group ratings, booking/payment, decorative bottom navigation or new product modules.

## Data and state

Use the coherent fake story in `08_MOCK_DATA_SPEC.md`. State may be in-memory or locally mocked. Refresh persistence is optional unless later requested; do not introduce accounts or cloud infrastructure to obtain it.

## Reuse expectations

Create reusable primitives for app bars, buttons, form fields, cards, badges, progress, member avatars, checklist rows, bottom sheets/modals, warning/success states and day selectors. Solo/Group variants should share components while enforcing branch visibility.

## Prototype routes versus frames

The final inventory contains 36 active base frames plus eight reusable states = 44 total. Implementation does not need 44 unrelated page components: Edit Day may reuse Itinerary Detail; Add Expense variants may reuse one form; overlays and S08 must reuse patterns. Forgot Password was removed during final QA. Route names/structure are implementation details as long as user-visible navigation matches `04_USER_FLOW.md`.

## Completion boundary

The prototype is complete only after the main Group story and complete Solo branch work with mock data, prohibited features are absent, primary screens pass visual QA at 390 × 844, and interactions follow the user-confirmation principle.
