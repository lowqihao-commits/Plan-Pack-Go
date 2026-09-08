# Plan Pack Go — README for Codex

## Project status

- **Project:** CodeNection 2026
- **Product:** Plan Pack Go
- **Phase:** functionally complete; final QA passed; preparing a visual-polish-only Bolt handoff
- **Prototype objective:** a polished, mobile-first interactive web prototype that demonstrates the approved Solo and Group travel flows, itinerary planning, and the itinerary-driven Smart Packing differentiator
- **Primary viewport:** approximately `390 × 844`
- **Technology direction:** React + Vite unless explicitly changed later
- **Delivery path:** frozen local prototype → Bolt visual polish on a dedicated branch → later design handoff only when explicitly authorized

This package consolidates decisions. It does not authorize new features or a production backend.

## Source of truth and mandatory reading order

Read every file before implementation, in this order:

1. `00_README_FOR_CODEX.md` — operating rules.
2. `01_PRODUCT_BRIEF.md` — problem, value and audience.
3. `02_FEATURE_SPEC.md` — approved product behaviour.
4. `03_SCREEN_INVENTORY.md` — exact prototype frames and priorities.
5. `04_USER_FLOW.md` — branching and navigation.
6. `05_UI_SPEC.md` — screen-level content and exclusions.
7. `06_DESIGN_SYSTEM.md` — visual identity and tokens.
8. `07_INTERACTION_SPEC.md` — interaction rules.
9. `08_MOCK_DATA_SPEC.md` — coherent fake data.
10. `09_ASSET_MANIFEST.md` — approved local assets.
11. `10_DECISION_LOG.md` — decisions, alternatives and rejected ideas.
12. `11_PROTOTYPE_SCOPE.md` — what to build and simulate.
13. `12_BUILD_CHECKLIST.md` — staged delivery and QA.

Supporting references are in `../assets/references/`. The final implementation inventory is 36 active base frames plus eight reusable states (`S01–S08`) = 44 total. Forgot Password was removed during final QA and is not an active screen. If a copied older reference conflicts with these numbered docs, the numbered docs in `docs/` take precedence.

## Rules for Codex

1. Do not change approved product logic, terminology, feature scope, Solo/Group branching or screen numbering without approval.
2. Do not add features because they appear useful. Record suggestions separately and wait for approval.
3. Do not reintroduce onboarding, chat, currency settings, budget limits, remaining-budget forecasts, unequal expense splitting, private group ratings or booking/payment flows.
4. Build a mobile-first web prototype, not a native production app and not a production mobile backend.
5. Follow `03_SCREEN_INVENTORY.md` for the screen set and `04_USER_FLOW.md` for navigation.
6. Follow `06_DESIGN_SYSTEM.md` for visuals and `07_INTERACTION_SPEC.md` for behaviour.
7. Use the supplied assets; do not regenerate or silently alter the logo or mascot.
8. Preserve the principle: **AI recommends, user decides.** Meaningful changes require user confirmation.
9. Use mock/simulated services within the scope in `11_PROTOTYPE_SCOPE.md`.
10. Treat every item marked `TODO / Not yet decided` as unresolved; do not guess a final product rule.

## Before changing implementation

Codex must:

1. Read all documents in `docs/`.
2. Inspect all available assets and their intended roles.
3. Summarize its understanding of the product, branches, exclusions and prototype scope.
4. Identify contradictions and all `TODO / Not yet decided` items.
5. Confirm that the requested change is authorized. Do not fill gaps with new product ideas.

## Status vocabulary

- **LOCKED / APPROVED:** implement as written.
- **OPTIONAL:** may be demonstrated only when explicitly included in the selected prototype journey.
- **FUTURE / POST-MVP:** document only; do not implement now.
- **TODO / Not yet decided:** stop and request direction if implementation depends on it.
