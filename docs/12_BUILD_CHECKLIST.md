# Plan Pack Go — Build Checklist

No stage authorizes new product logic. Before Stage 1, complete the `Before writing any code` process in `00_README_FOR_CODEX.md`.

## Stage 1 — Project setup

- [ ] Initialize React + Vite in `prototype/` only after implementation approval.
- [ ] Define simple navigation/state strategy and mock-data boundary.
- [ ] Confirm 390 × 844 primary viewport and a centered wider-screen shell.
- [ ] Add lint/build scripts without production infrastructure.

**Complete when:** the empty app builds, serves, has documented structure, and no feature has been invented.

## Stage 2 — Design tokens and global styles

- [ ] Add approved palette, typography, 8-point spacing, radii, shadows/borders and 44 px targets.
- [ ] Establish focus, disabled, error, warning and success styles.
- [ ] Add reduced-motion handling and accessible contrast checks.

**Complete when:** tokens match `06_DESIGN_SYSTEM.md` and no new dominant colour/visual effect appears.

## Stage 3 — Shared components

- [ ] Build app bar, buttons, fields, cards, badges, progress, avatars, tabs/day selector, checklist rows, sheet/modal and success/warning patterns.
- [ ] Ensure components support Solo/Group visibility without empty placeholders.
- [ ] Integrate approved assets according to the manifest.

**Complete when:** component examples cover all inventory needs and mascot use remains contextual.

## Stage 4 — Authentication and My Trips

- [ ] Implement 01–04 and 37 with simulated validation/authentication.
- [ ] Splash auto-transitions after about two seconds with no button.
- [ ] My Trips sorting, search/filter scope and profile link work.

**Complete when:** entry reaches populated My Trips, recovery/sign-up return logically, and no onboarding exists.

## Stage 5 — Trip creation

- [ ] Implement 05–08.
- [ ] Trip Name contains one field.
- [ ] Solo goes directly to dates; Group goes through optional invite.
- [ ] Date range calculates Days/Nights.

**Complete when:** both branches reach the correct Waiting List without any destination field.

## Stage 6 — Waiting List and Group Preference

- [ ] Implement 09–14 and S07.
- [ ] Solo bypasses Group ratings.
- [ ] Group adding/rating appears asynchronous and public.
- [ ] Results are normalized and show participation.
- [ ] Final places require explicit confirmation.

**Complete when:** Solo and Group each reach Itinerary Planning with correct rules and configurable preference thresholds.

## Stage 7 — Itinerary and Route Preview

- [ ] Implement 15, 16, 19, 20 and S05.
- [ ] Day selector, times, reorder/move/remove/add, Overnight Stay on continuing days and `Return home` / `Trip ends` on the final departure day work.
- [ ] Route preview shows pins, segments and totals.
- [ ] Optimization is proposed before commit.

**Complete when:** a multi-day itinerary can be viewed/edited without losing Overnight anchors on continuing days, the final return-home day does not request accommodation, and Add Place confirms impact first.

## Stage 8 — Trip Dashboard

- [ ] Implement 17 and 18.
- [ ] Solo layout contains no Group card or empty slot.
- [ ] Group has the approved 2×2 module set.
- [ ] Trip Updates remain concise.

**Complete when:** every module card reaches the correct Solo/Group destination.

## Stage 9 — Smart Packing

- [ ] Implement 21–27, 34 where shared responsibility is relevant, S06 and packing-related S08 variants.
- [ ] Both Smart Packing home screens expose AI Suggestions and a secondary Packing Reminders entry; Personal Packing does not own the reminders link.
- [ ] Suggestions are itinerary/weather/activity-derived and explainable.
- [ ] Add/Skip, Personal/Shared override, quantity and custom items work.
- [ ] Personal lists stay private; Group sees only progress.
- [ ] Shared state machine and shortage/extra logic work.
- [ ] Delta updates preserve earlier choices/packed states.
- [ ] Outfit Planning remains optional; reminders are milestone-only.

**Complete when:** the differentiator is clearly demonstrable and no AI decision is silently committed.

## Stage 10 — Budget

- [ ] Implement 28–30 and expense-saved confirmation.
- [ ] Totals/category subtotals update from mock expenses.
- [ ] Group Shared shows Paid by, included members and equal split.

**Complete when:** expenses save correctly and no limit, remaining forecast, unequal split, settlement or currency setting exists.

## Stage 11 — Group

- [ ] Implement 31–34.
- [ ] Admin/member/pending states and approved actions are represented.
- [ ] Participation change shows only necessary shared-responsibility follow-up.

**Complete when:** member changes can resolve or defer uncovered shared items without a complex impact system.

## Stage 12 — Profile / Settings

- [ ] Implement 35–36.
- [ ] Profile fields and approved notification/app settings work in mock state.

**Complete when:** Currency is absent and Edit Profile contains only photo, Name and Email.

## Stage 13 — Unexpected plan-change states

- [ ] Implement S01–S05 with a shared sheet/modal pattern.
- [ ] Each explains only material impact and offers approved choices.
- [ ] Recalculation returns to the itinerary.

**Complete when:** closure, delay, weather and spontaneous addition work without creating a disruption module.

## Stage 14 — Responsive and visual QA

- [ ] Inspect every required state at 390 × 844.
- [ ] Verify vertical scrolling, clipping, safe areas and fixed actions.
- [ ] Check Inter hierarchy, palette semantics, contrast, focus and 44 px targets.
- [ ] Check logo/mascot use against `09_ASSET_MANIFEST.md`.
- [ ] Check narrow/wider viewport behaviour without desktop redesign.

**Complete when:** no overlap, cutoff, unreadable contrast, unintended horizontal scroll or excessive mascot use remains.

## Stage 15 — Prototype navigation QA

- [ ] Run complete Solo journey.
- [ ] Run complete Group journey including async rating and Shared Packing.
- [ ] Test Back/Cancel and saved-state preservation.
- [ ] Test direct access guards for Group-only routes.
- [ ] Test confirmation before meaningful AI/system change.
- [ ] Verify all exclusions with a text/UI search.

**Complete when:** all required routes/states are reachable, no dead ends exist, Solo never sees Group-only controls, and the final validation below passes.

## Final product validation

- [ ] Smart Packing remains the core differentiator.
- [ ] Budget remains lightweight recorded/estimated cost tracking.
- [ ] No overall budget limit or remaining-budget forecast.
- [ ] No currency setting in Profile.
- [ ] No onboarding.
- [ ] No destination required before Waiting List.
- [ ] Multi-day itinerary supports Overnight Stay on continuing days and omits accommodation on the final return-home day.
- [ ] Personal Packing details remain private in Group mode.
- [ ] Shared Packing follows `Unassigned → Assigned/Claimed → Packed`.
- [ ] `AI recommends, user decides.` is respected.
- [ ] No new feature has been invented.
