# Plan Pack Go — Bolt Visual-Polish Handoff

## A. Product summary

Plan Pack Go is a mobile-first React/Vite travel planner. Its core value proposition is:

> A Travel Planner that converts your actual itinerary into an actionable, coordinated packing plan.

The primary presentation viewport is approximately `390 × 844`.

## B. Core problem

Travel planners usually stop after arranging an itinerary. Travellers still need to translate activities, weather, timing and group responsibilities into a packing plan, which creates forgotten items, duplicated shared items and unclear ownership.

## C. Core differentiator

**Smart Packing & Luggage Coordination.** The itinerary drives explainable Needed/Possibly Useful recommendations, private Personal Packing, Shared Packing quantities and responsibility, optional Outfit Planning, milestone reminders and delta updates.

## D. Product principle

**AI recommends, user decides.** AI suggestions require explicit Add/Skip decisions. Route changes, packing changes and replacements require user confirmation.

## E. Current implementation status

**FUNCTIONALLY COMPLETE**  
**FINAL QA PASSED**  
**VISUAL POLISH ONLY**

The current implementation is the behavior baseline. Bolt must improve visual cohesion and fidelity without altering product behavior.

## F. Locked functionality

Bolt must not change:

- navigation or route destinations;
- Solo/Group branching or route guards;
- screen functionality or screen availability;
- Smart Packing logic, Add/Skip behavior, privacy or shared-item state transitions;
- Group Preference eligibility, scoring, participation or majority voting;
- itinerary generation, day behavior, Overnight Stay or final Return Home rules;
- Budget scope or equal-split behavior;
- Group Management, invitation, participation or reassignment logic;
- state persistence rules and in-session trip collection;
- form validation, keyboard behavior, dialog focus behavior or other accessibility behavior;
- approved copy meaning;
- approved logo and owl mascot assets.

Do not add onboarding, Forgot Password, chat, booking, payment settlement, a budget ceiling, remaining-budget forecasts, currency settings, production APIs or backend services.

## G. Major modules

- Auth: Splash, Login and Sign Up
- My Trips
- Trip Creation
- Invite Members
- Places to Visit / Waiting List
- Group Preference, Review Results and Group Final Review
- Solo Final Review
- Itinerary Planning and Itinerary Detail
- Route Preview
- Solo and Group Dashboard
- Smart Packing Home and AI Suggestions
- Personal Packing
- Shared Packing and Group Packing Progress
- Outfit Planning
- Packing Reminders
- Packing Delta Updates
- Budget / Trip Cost and Add Expense
- Group Overview, Manage Members, Participation and Reassignment
- Profile / Settings
- Lightweight Unexpected Plan Adjustment

## H. Solo vs Group boundary

Solo and Group are explicit branches, not one combined interface with disabled controls.

- Solo skips Invite Members and all Group Preference screens.
- Solo never sees Group Dashboard modules, Shared Packing, Group Packing Progress, Group Management or shared expense splitting.
- Group uses Invite Members, Shared Waiting List, current-roster preference rating, Shared Packing, Group Management and optional shared expense splitting.
- Personal Packing remains private in Group mode; only aggregate progress is visible to the group.

All Group-only routes remain guarded and hidden from Solo layouts.

## I. Final known prototype limitations

The following are intentionally local or simulated:

- invitation sharing and member joining;
- AI packing recommendations;
- route optimization and map visualization;
- weather and traffic/delay impact;
- realtime-style group collaboration;
- expenses and equal splits.

Seeded and newly created trips share an in-session collection. A full reload may reset newly created session data. These limitations must not be “fixed” with backend services or production APIs during visual polish.

## J. Visual-polish objective

Make the approved prototype more cohesive, polished, presentation-ready and high-fidelity while preserving every existing behavior. Use `DESIGN.md` as the visual authority and `BOLT_SCREEN_MAP.md` to locate implementation files. Smart Packing should feel like the core differentiator; supporting modules should remain calmer and lighter.

## Final implementation facts Bolt must preserve

- Auth flow: Splash → Login / Sign Up → My Trips. Forgot Password is intentionally absent.
- Group Invite: shareable link, Send, Copy, Joined/Pending members, Mark as Joined and permitted removal.
- Group Preference: the current eligible trip roster is authoritative. Pending and `Left Trip` members do not count.
- Itinerary: continuing days end with Overnight Stay; the final departure day ends with `Return home · Trip ends` and has no accommodation selector.
- Shared Packing: `Unassigned → Assigned/Claimed → Packed`.
- OOTD/Outfit Planning is optional.
- Reminders are milestone-based: 3 Days Before, 1 Day Before and Departure Day.
- Budget is recorded trip-cost tracking only. There is no budget ceiling, remaining budget, over-budget warning, settlement workflow or currency setting.
- Unexpected Plan Adjustments stay lightweight and attached to itinerary/member contexts.

## Approved asset locations

Runtime asset files in `prototype/public/assets/` are byte-for-byte copies of their approved sources:

- Logo: `plan-pack-go-logo.png`
- Base/loading owl: `mascot-master-transparent.png`
- Itinerary/AI analysis owl: `mascot-map-transparent.png`
- Warning owl: `mascot-warning-transparent.png`
- Packing-complete owl: `mascot-packing-complete-transparent.png`

Reference-only approved poses remain in `assets/mascot/`, including `packing.png` and `letsgo.png`. Do not redraw, vectorize or replace any approved asset.
