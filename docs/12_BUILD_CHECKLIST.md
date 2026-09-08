# Plan Pack Go — Build Checklist

**Final status:** all stages below are complete and the frozen prototype passed final QA. No stage authorizes new product logic. Before changing implementation, follow `00_README_FOR_CODEX.md`.

## Stage 1 — Project setup

- [x] Initialize React + Vite in `prototype/` only after implementation approval.
- [x] Define simple navigation/state strategy and mock-data boundary.
- [x] Confirm 390 × 844 primary viewport and a centered wider-screen shell.
- [x] Add lint/build scripts without production infrastructure.

**Complete when:** the empty app builds, serves, has documented structure, and no feature has been invented.

## Stage 2 — Design tokens and global styles

- [x] Add approved palette, typography, 8-point spacing, radii, shadows/borders and 44 px targets.
- [x] Establish focus, disabled, error, warning and success styles.
- [x] Add reduced-motion handling and accessible contrast checks.

**Complete when:** tokens match `06_DESIGN_SYSTEM.md` and no new dominant colour/visual effect appears.

## Stage 3 — Shared components

- [x] Build app bar, buttons, fields, cards, badges, progress, avatars, tabs/day selector, checklist rows, sheet/modal and success/warning patterns.
- [x] Ensure components support Solo/Group visibility without empty placeholders.
- [x] Integrate approved assets according to the manifest.

**Complete when:** component examples cover all inventory needs and mascot use remains contextual.

## Stage 4 — Authentication and My Trips

- [x] Implement active entry screens 01–04 with simulated validation/authentication. Forgot Password is intentionally absent.
- [x] Splash auto-transitions after about two seconds with no button.
- [x] My Trips sorting, search/filter scope and profile link work.

**Complete when:** entry reaches populated My Trips, Sign Up returns logically, and no onboarding or disabled recovery control exists.

## Stage 5 — Trip creation

- [x] Implement 05–08.
- [x] Trip Name contains one field.
- [x] Solo goes directly to dates; Group goes through optional invite.
- [x] Date range calculates Days/Nights.

**Complete when:** both branches reach the correct Waiting List without any destination field.

## Stage 6 — Waiting List and Group Preference

- [x] Implement 09–14 and S07.
- [x] Solo bypasses Group ratings.
- [x] Group adding/rating appears asynchronous and public.
- [x] Results are normalized and show participation.
- [x] Final places require explicit confirmation.

**Complete when:** Solo and Group each reach Itinerary Planning with correct rules and configurable preference thresholds.

## Stage 7 — Itinerary and Route Preview

- [x] Implement 15, 16, 19, 20 and S05.
- [x] Day selector, times, reorder/move/remove/add, Overnight Stay on continuing days and `Return home` / `Trip ends` on the final departure day work.
- [x] Route preview shows pins, segments and totals.
- [x] Optimization is proposed before commit.

**Complete when:** a multi-day itinerary can be viewed/edited without losing Overnight anchors on continuing days, the final return-home day does not request accommodation, and Add Place confirms impact first.

## Stage 8 — Trip Dashboard

- [x] Implement 17 and 18.
- [x] Solo layout contains no Group card or empty slot.
- [x] Group has the approved 2×2 module set.
- [x] Trip Updates remain concise.

**Complete when:** every module card reaches the correct Solo/Group destination.

## Stage 9 — Smart Packing

- [x] Implement 21–27, 34 where shared responsibility is relevant, S06 and packing-related S08 variants.
- [x] Both Smart Packing home screens expose AI Suggestions and a secondary Packing Reminders entry; Personal Packing does not own the reminders link.
- [x] Suggestions are itinerary/weather/activity-derived and explainable.
- [x] Add/Skip, Personal/Shared override, quantity and custom items work.
- [x] Personal lists stay private; Group sees only progress.
- [x] Shared state machine and shortage/extra logic work.
- [x] Delta updates preserve earlier choices/packed states.
- [x] Outfit Planning remains optional; reminders are milestone-only.

**Complete when:** the differentiator is clearly demonstrable and no AI decision is silently committed.

## Stage 10 — Budget

- [x] Implement 28–30 and expense-saved confirmation.
- [x] Totals/category subtotals update from mock expenses.
- [x] Group Shared shows Paid by, included members and equal split.

**Complete when:** expenses save correctly and no limit, remaining forecast, unequal split, settlement or currency setting exists.

## Stage 11 — Group

- [x] Implement 31–34.
- [x] Admin/member/pending states and approved actions are represented.
- [x] Participation change shows only necessary shared-responsibility follow-up.

**Complete when:** member changes can resolve or defer uncovered shared items without a complex impact system.

## Stage 12 — Profile / Settings

- [x] Implement 35–36.
- [x] Profile fields and approved notification/app settings work in mock state.

**Complete when:** Currency is absent and Edit Profile contains only photo, Name and Email.

## Stage 13 — Unexpected plan-change states

- [x] Implement S01–S05 with a shared sheet/modal pattern.
- [x] Each explains only material impact and offers approved choices.
- [x] Recalculation returns to the itinerary.

**Complete when:** closure, delay, weather and spontaneous addition work without creating a disruption module.

## Stage 14 — Responsive and visual QA

- [x] Inspect every required state at 390 × 844.
- [x] Verify vertical scrolling, clipping, safe areas and fixed actions.
- [x] Check Inter hierarchy, palette semantics, contrast, focus and 44 px targets.
- [x] Check logo/mascot use against `09_ASSET_MANIFEST.md`.
- [x] Check narrow/wider viewport behaviour without desktop redesign.

**Complete when:** no overlap, cutoff, unreadable contrast, unintended horizontal scroll or excessive mascot use remains.

## Stage 15 — Prototype navigation QA

- [x] Run complete Solo journey.
- [x] Run complete Group journey including async rating and Shared Packing.
- [x] Test Back/Cancel and saved-state preservation.
- [x] Test direct access guards for Group-only routes.
- [x] Test confirmation before meaningful AI/system change.
- [x] Verify all exclusions with a text/UI search.

**Complete when:** all required routes/states are reachable, no dead ends exist, Solo never sees Group-only controls, and the final validation below passes.

## Final product validation

- [x] Smart Packing remains the core differentiator.
- [x] Budget remains lightweight recorded/estimated cost tracking.
- [x] No overall budget limit or remaining-budget forecast.
- [x] No currency setting in Profile.
- [x] No onboarding.
- [x] No destination required before Waiting List.
- [x] Multi-day itinerary supports Overnight Stay on continuing days and omits accommodation on the final return-home day.
- [x] Personal Packing details remain private in Group mode.
- [x] Shared Packing follows `Unassigned → Assigned/Claimed → Packed`.
- [x] `AI recommends, user decides.` is respected.
- [x] No new feature has been invented.
