# Plan Pack Go — Complete Stitch Prompt Pack

Use one prompt at a time. Each prompt intentionally creates no more than three new screens because larger Stitch generations were less reliable.

## Before every prompt

1. Click an empty area of the Stitch canvas so no existing screen is selected.
2. Paste exactly one prompt below.
3. Confirm that Stitch created separate, independently selectable screens rather than one presentation board.
4. Select only the newly generated screens.
5. Choose **Export → Figma → Convert → Copy**, then paste into the existing `Plan Pack Go — Mobile UI` Figma file.
6. Do not resize or rearrange the imported frames manually. The Figma converter may import each screen as `1280 × 844`; Codex will check and normalize it to `390 × 844` with `80 px` gaps.

The production numbering below follows the order already used in the Stitch and Figma files. Solo/Group variants are separate prototype frames even when they reuse the same layout.

---

## Prompt 01 — Entry and authentication

```text
Create exactly THREE NEW separate standalone low-fidelity mobile screens for “Plan Pack Go”, a cross-platform travel planning and packing app. Do not create a presentation board, device mockup, design-system sheet, explanation, or extra screen. Each screen should visually target 390 × 844 px, use grayscale only, a clean sans-serif typeface, 8-point spacing, consistent components, and tap targets of at least 44 px. Keep all copy in English. Do not add onboarding.

Name the screens exactly:
01 Splash
02 Log In
03 Sign Up

01 Splash: centered placeholder for the compact Plan Pack Go logo; app name; slogan “Plan smart. Pack right. Go ready.”; primary “Get Started” button. No long marketing paragraph.

02 Log In: logo placeholder; “Welcome back”; Email and Password fields; Show password; “Forgot password?”; primary “Log In”; secondary “Continue with Google”; link “Don’t have an account? Sign Up”. Do not add other social providers.

03 Sign Up: Name, Email, Password and Confirm Password fields; primary “Create Account”; link “Already have an account? Log In”. Do not add profile setup or onboarding.

Create three independently selectable screen nodes laid out left to right in numeric order.
```

## Prompt 02 — My Trips and trip type

```text
Create exactly THREE NEW separate standalone low-fidelity mobile screens for Plan Pack Go. Do not modify existing screens. Same grayscale wireframe style, concise English, 390 × 844 target, 8-point spacing and 44 px tap targets. No outer presentation/specification board and no extra screens.

Name exactly:
04 My Trips
05 Trip Name
06 Solo or Group

04 My Trips: compact logo and profile image in the app bar; prominent “+ Add New Trip” card or button; “My Trips” heading; Search and Filter controls that apply only to existing trips; trip cards ordered as Ongoing first, nearest Upcoming next, then recent Past. Each card shows trip name, dates, Solo or Group, and member count only for Group. Do not show packing progress, budget totals, bottom navigation, or archived chips.

05 Trip Name: “Create a Trip”; progress 1 of 3; one field labelled “Trip name” with example “Penang Weekend”; Back and Continue. Do not ask for destination.

06 Solo or Group: “Create a Trip”; progress 2 of 3; two large selectable cards, “Solo Travel” and “Group Travel”, with one short explanation each; clear selected/unselected state; Back and Continue.

Create independent screen nodes left to right in numeric order.
```

## Prompt 03 — Branch setup and Solo waiting list

```text
Create exactly THREE NEW separate standalone low-fidelity mobile screens for Plan Pack Go. Do not modify existing screens. Same grayscale style, concise English, 390 × 844 target, 8-point spacing and 44 px tap targets. No presentation/specification board and no extra screens.

Name exactly:
07 Group Invite
08 Trip Dates
09 Solo Waiting List

07 Group Invite: conditional Group Trip screen after the Solo/Group choice; “Invite members” heading; Group Trip label; invite-link field with “Copy link”; primary “Share invite”; invited member rows showing avatar placeholder, name and You / Joined / Pending status; “Skip for now”; Back and Continue. The creator is shown as Admin. Do not request contacts or email addresses on this first version.

08 Trip Dates: “Create a Trip”; progress 3 of 3; Start Date and End Date fields; compact date-range calendar; automatically show days and nights; Back and “Create Trip”. This screen is shared by Solo and Group paths. Do not add destination, traveller count, accommodation, or transport fields.

09 Solo Waiting List: “Places to Visit”; Solo badge and trip name; Search or enter a place; Add button; Clear list; reorderable multi-city place cards showing place name and city/location with drag, edit and remove controls; primary “Review Trip”. No ratings, member avatars, AI ranking, map, or itinerary generation.

Create independent screen nodes left to right in numeric order.
```

## Prompt 04 — Shared places and group ratings

```text
Create exactly THREE NEW separate standalone low-fidelity mobile screens for Plan Pack Go. Do not modify existing screens. Same grayscale wireframe style, concise English, 390 × 844 target, 8-point spacing and 44 px tap targets. No presentation board and no extra screens.

Name exactly:
10 Shared Waiting List
11 Group Preference
12 Review Results

10 Shared Waiting List: “Shared Places to Visit”; Group badge, trip name and compact member-avatar row; any joined member can Search or enter and Add a place; Clear list; place cards show place name, city/location and “Added by [member]”; drag, edit and remove controls; subtle “Saved” or real-time update indicator; primary “Rate Places”. No chat, private list, or admin-only add control.

11 Group Preference: “Rate the Places”; state “Rate each place from 0 to 10. Ratings are visible to everyone.”; 3–4 place cards with city, a clear 0–10 rating control, current user value, visible member avatar/value ratings, New or Unrated state, and progress such as “3 of 4 places rated”; Back; secondary “Done for now”; primary “Review Results”. Ratings are asynchronous and update in real time.

12 Review Results: “Group Results”; ranked place cards showing normalized group percentage, number of members rated, and High / Medium / Low preference grouping. Show one unrated or incomplete result state. Primary “Continue to Final Review”. Do not add opaque AI scores, private votes, itinerary generation, or a redundant confirmation for every high-ranked place.

Create independent screen nodes left to right in numeric order.
```

## Prompt 05 — Final places and itinerary planning

```text
Create exactly THREE NEW separate standalone low-fidelity mobile screens for Plan Pack Go. Do not modify existing screens. Same grayscale wireframe style, concise English, 390 × 844 target, 8-point spacing and 44 px tap targets. No presentation board and no extra screens.

Name exactly:
13 Solo Final Review
14 Group Final Review
15 Itinerary Planning

13 Solo Final Review: trip summary; final place checklist grouped by city; all places directly selectable by the Solo traveller; selected count; Back; primary “Confirm Final Places”. No group scores or voting.

14 Group Final Review: trip summary; High-ranked places preselected; Medium places clearly flagged for review; Low places normally excluded; one low place has “Request to Include” and compact majority status such as “2 of 4 agree”; member rating summary remains visible; Back; primary “Confirm Final Places”. High-ranked places must not require repetitive confirmation.

15 Itinerary Planning: day selector; departure options Now / 30 minutes later / Custom; recommended place order; each stop supports drag, remove, move day and editable estimated stay; Add Place; Overnight Stay field allowing accommodation, camping, overnight transport, user-defined stay, or “Not decided yet”; show arrival, leave, finish and back-at-stay times; contextual opening-hour or feasibility warning beside the affected stop; “Optimize Route” and “Save Day”. No booking or payment.

Create independent screen nodes left to right in numeric order.
```

## Prompt 06 — Route and dashboards

```text
Create exactly THREE NEW separate standalone low-fidelity mobile screens for Plan Pack Go. Do not modify existing screens. Same grayscale style, concise English, 390 × 844 target, 8-point spacing and 44 px tap targets. No presentation board and no extra screens.

Name exactly:
16 Route Preview
17 Solo Dashboard
18 Group Dashboard

16 Route Preview: day selector; map placeholder with numbered pins, route line and overnight endpoint; compact segment cards with travel time and distance; total travel time and estimated return; “Optimize Route”; “Reorder Stops”; open stop details; return to itinerary list. No live navigation or booking.

17 Solo Dashboard: trip name, dates and status; 2×2-style module area containing Itinerary, Smart Packing and Budget only, reflowed so there is no empty Group slot; give Smart Packing moderate visual emphasis; Trip Updates below. No currency selector or social feed.

18 Group Dashboard: same structure and hierarchy as Solo Dashboard, with a complete 2×2 module grid for Itinerary, Smart Packing, Budget and Group; Smart Packing receives moderate emphasis; Trip Updates below with only meaningful changes.

Create independent screen nodes left to right in numeric order.
```

## Prompt 07 — Itinerary detail and Smart Packing entry

```text
Create exactly THREE NEW separate standalone low-fidelity mobile screens for Plan Pack Go. Do not modify existing screens. Same grayscale style, concise English, 390 × 844 target, 8-point spacing and 44 px tap targets. No presentation board and no extra screens.

Name exactly:
19 Itinerary Detail
20 Edit Day
21 Smart Packing Solo

19 Itinerary Detail: day selector and chronological read-only timeline showing departure, arrival, stay duration, leave time, travel segments, finish time and Overnight Stay; warnings appear directly beside the affected stop; “View Route”, “Edit Day” and “Optimize Route”. A finalized itinerary opens in view mode.

20 Edit Day: editing state of the same itinerary layout; drag to reorder; change stay duration; move a place to another day; remove place; Add Place; Save Changes and Cancel. Do not duplicate unrelated trip information.

21 Smart Packing Solo: trip duration; short analysis basis referencing actual itinerary activities, weather, locations and trip duration; overall personal packing progress; freshness/status of packing plan; two primary modules, “AI Suggestions” and “Packing Checklist”; compact “Review Updates” only when context changed. No shared packing or visibility into other travellers.

Create independent screen nodes left to right in numeric order.
```

## Prompt 08 — Smart Packing core

```text
Create exactly THREE NEW separate standalone low-fidelity mobile screens for Plan Pack Go. Do not modify existing screens. Same grayscale style, concise English, 390 × 844 target, 8-point spacing and 44 px tap targets. No presentation board and no extra screens.

Name exactly:
22 Smart Packing Group
23 AI Packing Suggestions
24 Personal Packing

22 Smart Packing Group: trip duration and analysis basis; overall progress; packing-plan freshness; module cards for Personal Packing, Shared Packing, Group Progress and Review Updates. Other members expose only packing percentage/count, never their personal item details.

23 AI Packing Suggestions: sections “Needed” and “Possibly Useful”; each suggestion has item, quantity and a short reason tied to a day, activity or weather; Add or Skip; batch “Add Selected”. Include a Group-mode classification control Personal / Potentially Shared and allow override of classification and quantity. Do not repeatedly resurface skipped items unless context materially changes.

24 Personal Packing: progress; categories Essentials, Clothing, Toiletries, Electronics, Activity Gear and Other; item rows with Unchecked / Packed state, quantity, remove and edit; “Add custom item”; link to optional Outfit Planning. Personal details remain private. Use “Unchecked”, not “Missing”.

Create independent screen nodes left to right in numeric order.
```

## Prompt 09 — Shared packing, outfits and reminders

```text
Create exactly THREE NEW separate standalone low-fidelity mobile screens for Plan Pack Go. Do not modify existing screens. Same grayscale style, concise English, 390 × 844 target, 8-point spacing and 44 px tap targets. No presentation board and no extra screens.

Name exactly:
25 Shared Packing
26 Outfit Planning
27 Packing Reminders

25 Shared Packing: Group-only list; each item shows suggested quantity, assigned count and packed count; states Unassigned → Assigned or Claimed → Packed; “Claim” and Admin “Assign”; show shortage or extra quantity without forcing removal; compact member avatars; Add shared item. No personal item details.

26 Outfit Planning: optional personal subflow by day; day and activity context; AI outfit suggestion; Add or Skip; image placeholder for camera/upload; notes; “Reuse item” control; explain reused clothing contributes once to final quantity; “Skip Outfit Planning” remains visible.

27 Packing Reminders: compact settings screen with toggles for 3 days before, 1 day before, departure day and Group shared alerts; “Turn all off”; Save. Do not add hourly reminders, per-item alerts, marketing notifications, or currency settings.

Create independent screen nodes left to right in numeric order.
```

## Prompt 10 — Lightweight budget

```text
Create exactly THREE NEW separate standalone low-fidelity mobile screens for Plan Pack Go. Do not modify existing screens. Same grayscale style, concise English, 390 × 844 target, 8-point spacing and 44 px tap targets. No presentation board and no extra screens.

Name exactly:
28 Budget Overview
29 Add Expense Solo
30 Add Expense Group

28 Budget Overview: heading “Trip Cost”; total labelled Estimated or Recorded Trip Cost; category cards Transportation, Accommodation, Tickets / Activities and Other; recent expense list; “Add Expense”; in Group mode include a compact All Expenses / Shared Expenses switch. No budget limit, remaining-budget forecast, settlement optimizer, charts, currency selector, or default Food category.

29 Add Expense Solo: Expense name, Amount and Category fields; category choices Transportation, Accommodation, Tickets / Activities and Other; optional note; Cancel and Save Expense. No split controls.

30 Add Expense Group: same fields plus Personal / Shared choice; when Shared is selected show Paid by, included members and Equal split summary; Cancel and Save Expense. Do not add unequal split, custom percentages, settlement, currency conversion or payment collection.

Create independent screen nodes left to right in numeric order.
```

## Prompt 11 — Group management

```text
Create exactly THREE NEW separate standalone low-fidelity mobile screens for Plan Pack Go. Do not modify existing screens. Same grayscale style, concise English, 390 × 844 target, 8-point spacing and 44 px tap targets. No presentation board and no extra screens.

Name exactly:
31 Travel Group
32 Manage Members
33 Update Participation

31 Travel Group: group or trip name, member count and Admin label; member rows with picture placeholder, name, role and status; “Invite Member”; “Manage Members”; summary links for preference progress, Shared Packing and Shared Expenses. No chat feed.

32 Manage Members: Admin controls; member picture, name, role and status; actions Make Admin, Remove and View Shared Responsibilities; mark Joining or Not Joining Today; pending invites may be Resent or Cancelled. Keep actions compact and use a confirmation sheet only for consequential actions.

33 Update Participation: lightweight choices Joining, Not Joining Today, Skip Activity and Left Trip; show only a necessary warning when shared responsibilities may be uncovered; Cancel and Update. Do not show unrelated itinerary, packing or budget details.

Create independent screen nodes left to right in numeric order.
```

## Prompt 12 — Reassignment and account

```text
Create exactly THREE NEW separate standalone low-fidelity mobile screens for Plan Pack Go. Do not modify existing screens. Same grayscale style, concise English, 390 × 844 target, 8-point spacing and 44 px tap targets. No presentation board and no extra screens.

Name exactly:
34 Reassign Shared Items
35 Profile Settings
36 Edit Profile

34 Reassign Shared Items: reusable sheet or focused screen shown only when a participation change leaves shared items uncovered; list affected item, quantity and previous assignee; choose a new member for each item; “Reassign” and “Later”. No full member-management controls.

35 Profile Settings: profile picture, name and email; “Edit Profile”; notification toggles Packing Reminders, Group Updates and Trip Alerts; App Settings for Language and Theme; Account section with Log Out. Currency is intentionally excluded.

36 Edit Profile: edit profile photo, Name and Email only; Cancel and Save Changes. Do not include password, payment, currency, notification or privacy settings.

Create independent screen nodes left to right in numeric order.
```

## Prompt 13 — Forgot Password

```text
Create exactly ONE NEW separate standalone low-fidelity mobile screen for Plan Pack Go. Do not modify existing screens. Use the same grayscale style, concise English, 390 × 844 target, 8-point spacing and 44 px tap targets. Do not create a presentation board or extra screen.

Name it exactly:
37 Forgot Password

37 Forgot Password: compact logo placeholder; “Forgot password?” heading; one short recovery explanation; Email field; primary “Send Recovery Link”; secondary link “Back to Log In”. Do not add security questions, phone recovery, OTP entry, new-password form, or account creation.
```

## Prompt 14 — Adjustment overlays A

```text
Create exactly THREE NEW separate low-fidelity mobile overlay-state frames for Plan Pack Go. Each frame should show the same simplified Itinerary Detail background with one focused bottom sheet or modal. Target 390 × 844, grayscale, concise English, 8-point spacing and 44 px tap targets. Do not modify existing screens or create a presentation board.

Name exactly:
S01 Place Unavailable
S02 Running Late
S03 Weather Impact

S01 Place Unavailable: identify the affected place; choices “Go to next place” and “Find replacement”; Cancel. State that the affected route segment will recalculate after selection.

S02 Running Late: show the current delay and only important downstream consequences; choices Continue, Shorten current stay and Skip next place; Cancel. Traffic delay uses this same pattern.

S03 Weather Impact: identify affected outdoor activities; choices Keep, Move to another time or day, and Find indoor alternative; Cancel. Do not claim to solve emergencies.

Create three independent overlay-state frames left to right.
```

## Prompt 15 — Adjustment overlays B

```text
Create exactly THREE NEW separate low-fidelity mobile overlay-state frames for Plan Pack Go. Target 390 × 844, grayscale, concise English, 8-point spacing and 44 px tap targets. Do not modify existing screens or create a presentation board.

Name exactly:
S04 Replacement Suggestions
S05 Add Place Impact
S06 Packing Delta

S04 Replacement Suggestions: sheet over itinerary context; 3 nearby or similar viable place options; each shows short fit reason, travel-time impact and opening feasibility; select one; Preview Route Impact; Confirm Replacement; Cancel.

S05 Add Place Impact: show added travel time, new finish time and only meaningful conflicts; if harmless, show “Fits your itinerary”; actions Add Place and Cancel. Do not show a long analysis report.

S06 Packing Delta: show only New Suggestions and No Longer Needed items after an itinerary or weather change; each item has short reason and Add / Keep / Remove / Skip choice; preserve existing packed states and earlier decisions.

Create three independent overlay-state frames left to right.
```

## Prompt 16 — Group request and success states

```text
Create exactly TWO NEW separate low-fidelity mobile overlay-state frames for Plan Pack Go. Target 390 × 844, grayscale, concise English, 8-point spacing and 44 px tap targets. Do not modify existing screens or create a presentation board.

Name exactly:
S07 Request to Include
S08 Confirmation Success

S07 Request to Include: Group-only sheet for a low-ranked place; requester name and short strong-preference reason; normalized result context; public Approve / Reject vote; majority progress such as “2 of 4 approve”; Close. The requester receives no extra vote weight.

S08 Confirmation Success: reusable success pattern with checkmark placeholder, short title and one-sentence result; include compact variants or examples for Final places confirmed, Day saved, Participation updated, Expense saved, Packing completed and Trip ready; one primary Continue or Done action. Keep the visual structure consistent and do not create six separate success screens.

Create two independent overlay-state frames left to right.
```

---

## Reusable High-Fidelity Conversion Prompt

Select only one to three approved Low-Fi screens at a time before using this prompt.

```text
Convert the selected Plan Pack Go low-fidelity screens into a cohesive high-fidelity mobile UI without changing their information architecture, copy meaning, feature scope, navigation, field count, or Solo/Group logic. Do not add screens or features.

Brand system:
- Primary Teal #61C0BF
- Mint #BBDED6
- Coral #FFB6B9
- Cream #FAE3D9
- Primary text #243B53
- Secondary text #64748B
- Surface #FFFFFF

Use Teal for primary actions and Needed items; Mint for Possibly Useful items; Coral for Shared items and carefully limited alerts; Cream for warm background accents; Packed uses Teal plus a checkmark. Maintain accessible contrast, 8-point spacing, rounded but not childish cards, consistent icons, and clear hierarchy on 390 × 844 mobile frames.

Use the full name “Plan Pack Go”; never abbreviate it as PPG or PP&G. The logo is a compact location-pin + suitcase + route/checkmark symbol. The mascot is a simple cute rounded owl wearing glasses and a travel backpack. Use the owl only where it improves meaning: Splash, empty states, packing guidance, warnings and success states. Do not place the mascot decoratively on every screen.

Preserve all approved Low-Fi layout relationships. Replace placeholders with polished components, but do not introduce gradients, glassmorphism, extra tabs, bottom navigation, chat, currency settings, budget limits, unequal expense splitting, private group ratings, or new onboarding.
```

## High-Fidelity mascot state addendum

Append only the relevant line when converting a screen that needs the mascot:

- Splash: `Show the owl flying along a short dotted route toward the compact logo.`
- Itinerary / analysis: `Show the owl studying a folded map, used as a small contextual illustration.`
- Packing: `Show the owl packing a suitcase; keep it secondary to the checklist.`
- Warning: `Show the owl holding a small warning sign; keep the warning calm, not alarming.`
- Packing complete: `Show the owl sitting on a closed suitcase with a completed checkmark.`
- Trip ready: `Show the owl taking off with its backpack along a dotted route.`

## Final verification checklist

- Every imported base screen is an editable frame.
- Frame size is `390 × 844` after Figma normalization.
- Frames use `80 px` horizontal gaps.
- Screen names and numeric order match this pack.
- Solo path has no Group module or group controls.
- Group ratings are public, 0–10, asynchronous and normalized in results.
- Currency, budget limits, unequal split, chat and onboarding remain absent.
- Final places are confirmed before itinerary optimization.
- Packing changes use delta updates and preserve earlier user decisions.

