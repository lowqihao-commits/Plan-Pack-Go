# Plan Pack Go — Feature Specification

Unless otherwise labelled, requirements below are **LOCKED / APPROVED for the prototype**.

## A. Trip management and authentication

### Authentication

- Email and Password login.
- Continue with Google.
- Sign Up with Name, Email, Password and Confirm Password.
- Forgot Password uses email recovery.
- No unnecessary profile fields and no onboarding.

### My Trips

- Support multiple independent trips.
- Sort Ongoing first; Upcoming by nearest departure; Past by most recently completed.
- App bar: compact logo left, profile photo/icon right.
- Prominent `Add New Trip` above the existing trip area.
- Search and Filter apply only to existing trips.
- Cards remain concise: trip name, dates, type/status and Group member count when relevant.

### Create Trip

1. Trip Name only.
2. Choose Solo Travel or Group Travel.
3. Group only: Invite Members or Skip for now.
4. Start Date and End Date.
5. Calculate Days / Nights automatically.
6. Go directly to Places to Visit / Waiting List.

Do not request a destination first. Places may span multiple cities or regions.

## B. Places to Visit / Waiting List

`Places to Visit` is the user-facing feature term; `Waiting List` names the list section.

- Solo: user searches/adds places, manages a personal list, then proceeds to Final Review.
- Group: shared list; any joined member can add; show `Added by`; collaboration is asynchronous.
- Users may add, reorder, edit, remove or clear places.
- No map, ratings or AI ranking on the Waiting List itself.

## C. Group Preference Sync — Group only

- Public 0–10 member ratings, visible to the Group.
- Asynchronous updates with member completion/progress.
- Aggregate results shown as normalized percentages and ranked.
- Admin may add places and rate first. `Done for now` saves the current ratings and returns to the Group context without locking later changes. `Review Results` is the separate action that advances to the results screen. Do not show a second `Review later` action.
- Later additions create New/Unrated items.

Flow: Shared Waiting List → Group Preference Rating → Review Results → Final Review.

Review rules:

- High preference may be pre-included.
- Medium preference requires review.
- Low preference is normally excluded.
- A member may `Request to Include`; majority approval may include it.
- The requester has no extra vote weight.
- **TODO / Not yet decided:** exact High / Medium / Low thresholds.

Final action: `Confirm Final Places` → Itinerary Planning.

## D. Itinerary Planning

- Day-based planner with Day 1 / Day 2 switching.
- Each day that continues into another night contains ordered stops and an End-of-day / Overnight Stay anchor.
- The final departure day does not require accommodation or an Overnight Stay when the traveller returns home. End that day with a clear `Return home` / `Trip ends` endpoint instead.
- Departure options: Now, 30 minutes later or Custom.
- Recommend an order; user may drag/reorder, remove, move between days or add places.
- Editable estimated stay duration.
- Show arrival, leave, finish and back-at-stay estimates.
- Show contextual opening-hours and feasibility warnings.
- Actions: `Optimize Route`, `Save Day`.

Overnight types: Accommodation, Camping, Overnight Transport, Other and `Not decided yet`. The anchor is normally the final stop.

Route Preview shows numbered stops, route line, segment travel time and distance, and total travel time. Continuing days show the Overnight Stay endpoint and estimated return time; the final departure day shows the `Return home` / `Trip ends` endpoint instead.

Adding a place requires an impact preview first: extra travel time, extra distance when available, new finish time and meaningful opening-hours conflict; then Confirm or Cancel.

## E. Trip Dashboard

- Navigation hub, not a duplicate of full modules.
- Summary: name, dates, days/nights, Solo/Group, Group count when relevant and status (`Planning`, `Ready to Go`, `Ongoing`, `Completed`).
- Compact cards: Itinerary, Smart Packing, Budget, and Group for Group trips.
- Solo hides Group and reflows without an empty slot.
- Smart Packing receives moderate emphasis.
- Trip Updates include only meaningful weather, closing, delay, shared-item or Group updates.

## F. Itinerary Detail

- Day selector and read-only timeline after finalization.
- Timeline includes departure, stops, arrival, stay, leave, travel segment and finish. Continuing days end at Overnight Stay; the final departure day ends at `Return home` / `Trip ends` without accommodation.
- Contextual warnings sit near affected places.
- Actions: `View Route`, `Edit Day`, `Optimize Route`.
- Edit Day reuses the same information architecture with editing controls.

## G. Smart Packing — core differentiator

Runs after an itinerary exists and analyses actual itinerary activities, trip duration, weather, locations and Solo/Group context.

Suggestion categories:

- **Needed:** fixed travel essentials and strongly activity/environment-related items.
- **Possibly Useful:** relevant convenience or optional items.

Each suggestion may show `Why suggested?` tied to days or activities. Suggestions are not automatically inserted: the user chooses `Add` or `Skip`; custom items are allowed. Skipped items stay suppressed unless context materially changes.

When itinerary/weather changes, show only the delta. Preserve prior decisions, checklist content and packed states.

- Solo: Personal Packing only.
- Group: Personal Packing, Shared Packing and Group Progress.
- Personal item details are private. Others see only high-level progress such as `18 / 22 packed` and `82%`.

## H. AI Packing Suggestions

- Show Needed, Possibly Useful, Why suggested, Add and Skip.
- Group classification: Personal or Potentially Shared; user may override.
- Shared candidates show Suggested Quantity, editable before adding.
- Batch `Add Selected` is allowed.

## I. Packing Checklist

Contains only accepted AI suggestions and custom items; skipped items never appear.

Personal checklist:

- categories: Essentials, Clothing, Toiletries, Electronics, Activity Gear, Other;
- checkbox, quantity, edit/remove, add custom item and packed/unpacked progress;
- use `Unchecked`, not `Missing`.

Shared Packing state machine:

`Unassigned → Assigned / Claimed → Packed`

- Show Suggested Quantity, Covered Quantity, Claim, Admin Assign and packed status.
- If Suggested 3 / Covered 2, show one more recommended.
- If Suggested 1 / Covered 3, flag extras; never auto-delete them.

## J. OOTD / Outfit Planning — OPTIONAL

An optional Personal Packing subflow to reduce clothing mismatch, not a fashion product.

- By day/date with activity context.
- Add Outfit; Add/Skip suggestion; Take Photo/Upload Photo; short notes; Reuse clothing.
- Reuse consolidates final quantity.
- `Skip Outfit Planning` remains available.

## K. Packing Reminders

Milestone-based only:

- 3 days before: remaining Needed and unresolved shared items.
- 1 day before: main Needed and Shared reminder.
- Departure day: critical essentials only.
- Group: unresolved shared responsibility alerts.
- User controls can disable reminder groups.

No per-item, hourly or marketing notification spam.

## L. Budget / Trip Cost Tracker

Purpose: show approximate or recorded trip cost, not enforce a spending budget.

- Budget Overview label: `Estimated Trip Cost` or `Recorded Trip Cost`.
- Categories: Transportation, Accommodation, Tickets / Activities, Other / Custom.
- Add Expense.
- Solo fields: Expense Name, Amount, Category; an optional note may be shown in the prototype.
- Group adds Personal / Shared. Shared adds Paid by, participating members and equal split by default.

Explicitly excluded: spending limit, remaining budget, over-budget warning, custom percentages, unequal split, settlement optimizer, payment collection and currency conversion/setting. Food can be recorded under Other / Custom; it is not a dedicated forecast category.

## M. Group Module — Group only

- Overview: group/trip name, member count, Admin marker, member list/status, Invite Member and Manage Members.
- Summary links: Group Preferences, Shared Packing, Shared Expenses; do not duplicate full modules.
- Creator is Admin.
- Manage Members supports invite, resend/cancel pending invitation, remove, simple role/status management and viewing shared responsibilities.
- Statuses: Joining, Not Joining Today, Skip Activity, Left Trip. Pending invite status may also appear.
- Participation changes trigger only essential follow-up, especially uncovered shared items.

No chat and no complex cross-module impact-review system.

## N. Unexpected Plan Adjustment

Use lightweight modal/card flows.

1. **Place unavailable:** Go to next place or Find replacement → route impact → recalculate → return.
2. **Running late / traffic:** show delay and main impact; Continue, Shorten current stay or Skip next place → recalculate.
3. **Weather:** show only meaningful itinerary impact; Keep, Move to another time/day or Find indoor alternative → recalculate.
4. **Spontaneous:** add, remove or reorder. Adding requires impact preview before confirmation.

No separate complex disruption-management module.

## O. Profile / Settings

- Profile picture, Name, Email, Edit Profile.
- Notifications: Packing Reminders, Group Updates, Trip Alerts.
- App Settings: Language, Theme.
- Account: Log Out.
- Currency setting is intentionally absent.

## FUTURE / POST-MVP

No post-MVP item is approved for implementation. Real authentication, maps, weather, AI, realtime synchronization, notifications and payment/settlement backends remain outside this prototype; see `11_PROTOTYPE_SCOPE.md`.
