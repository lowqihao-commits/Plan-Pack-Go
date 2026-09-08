# Plan Pack Go — Screen Inventory v1

## Product and brand baseline

- Platform: mobile-first cross-platform app for iOS and Android.
- Primary promise: turn the actual itinerary into an actionable, coordinated packing plan.
- App name: Plan Pack Go. Do not abbreviate it to PP&G or PPG.
- Slogan: `Plan smart. Pack right. Go ready.`
- Logo concept: one compact symbol combining a location pin, suitcase, and route/checkmark.
- Mascot: a simple, cute, rounded owl wearing glasses and a travel backpack.
- Mascot moments: studying a map, packing a suitcase, flying along a dotted route, raising a warning sign, sitting on a closed suitcase, and taking off with a backpack.
- Brand colors: Teal `#61C0BF`, Mint `#BBDED6`, Coral `#FFB6B9`, Cream `#FAE3D9`.
- Readability neutrals: primary text `#243B53`, secondary text `#64748B`, surface `#FFFFFF`.
- Semantic use: Needed = Teal; Possibly Useful = Mint; Shared = Coral; Packed = Teal plus checkmark.
- Low-fidelity phase: grayscale only. Brand assets, exact colors, effects, and motion are applied during high-fidelity work.
- Reference mobile frame: 390 × 844.

## A. Entry and account

| ID | Screen | Core content and navigation |
|---|---|---|
| 01 | Splash | Cream background; dotted teal route; owl flies in; logo, app name, and slogan; about two seconds; then authentication. |
| 02 | Login | Logo, welcome copy, email, password, forgot password, login, optional Google sign-in, link to Sign Up. |
| 03 | Sign Up | Name, email, password, confirm password, create account, link to Login. |
| 04 | Forgot Password | Email recovery form and return to Login. This is a supporting auth screen. |
| 05 | My Trips | Logo and profile image in app bar; prominent Add New Trip card; search and filter apply only to existing trips; cards ordered Ongoing, nearest Upcoming, then recent Past. |
| 06 | Profile / Settings | Profile photo, name, email, Edit Profile; notification toggles for Packing Reminders, Group Updates, Trip Alerts; Language; Theme; Log Out. Currency is intentionally excluded. |
| 07 | Edit Profile | Edit photo, name, and email; save/cancel. |

Onboarding is intentionally excluded. First use goes from Splash to Login / Sign Up.

## B. Create a trip and decide places

| ID | Screen | Solo / Group behavior |
|---|---|---|
| 08 | Trip Name | Minimal screen: trip name only, with Continue. |
| 09 | Choose Trip Type | Two large choices: Solo Travel and Group Travel. This decision controls all later branching. |
| 10 | Invite Travel Group | Group only. Invite by link and, later, email/username; invited member list; Invite Member; Skip for now. Trip creator is Admin. |
| 11 | Trip Dates | Start Date and End Date only; automatically show days and nights; Continue. No destination field. |
| 12 | Places to Visit / Waiting List | Search or enter places; add, remove, and clear; place cards. Solo has one owner. Group is shared, shows Added by, and every joined member may add places. |
| 13 | Group Preferences | Group only. Rate every place from 0–10; show each member's ratings in real time, aggregate percentage, rating progress, New and unrated states; Done for now / Review later. Collaboration is asynchronous. |
| 14 | Review Results | Group only. Rank places by group percentage; show rated-member progress and High / Medium / Low preference groups. Exact thresholds remain configurable. |
| 15 | Final Review | Solo: select the final places directly. Group: system preselects high-ranked places, flags medium places for review, normally excludes low-ranked places, and supports Request to Include plus majority vote. Confirm Final Places. |

Important rules:

- Solo goes from Waiting List directly to Final Review.
- Group goes from Shared Waiting List to Group Preferences, Review Results, and Final Review.
- Adding a place does not give its author extra weight.
- Group results are displayed as a normalized percentage; the raw score may be retained in the background.
- High-ranked places do not require redundant confirmation.
- Final places are confirmed before itinerary planning and route optimization.

## C. Itinerary planning and trip hub

| ID | Screen | Core content and navigation |
|---|---|---|
| 16 | Itinerary Planning | Day selector; departure choice (now, 30 minutes later, or custom); recommended place order; drag, remove, move day, add place; editable estimated stay; overnight stay; arrival, leave, finish, and back-at-stay times; contextual feasibility and opening-hours warnings; Optimize Route and Save Day. |
| 17 | Route Preview | Numbered map pins, route line, overnight endpoint, segment time and distance, total travel time, estimated return; Optimize Route; Reorder Stops; open stop details; return to list. |
| 18 | Trip Dashboard | Trip summary and status; 2×2 module grid for Itinerary, Smart Packing, Budget, Group; Solo hides Group without leaving an empty slot; Smart Packing gets moderate visual emphasis; Trip Updates below. |
| 19 | Itinerary Detail | Day selector and chronological timeline: departure, arrival, stay, leave, travel segments, overnight stay; warnings appear beside the affected stop; View Route, Edit Day, Optimize Route. Finalized itinerary opens in view mode. |
| 20 | Edit Day | Editing mode of Itinerary Detail: reorder, change stay duration, move day, remove place, add place. It is a state, not a duplicate information architecture. |

Multi-day rule: each day ends at an Overnight Stay. It may be accommodation, camping, overnight transport, or another user-defined stay. `Not decided yet` is allowed during planning.

## D. Smart Packing

| ID | Screen | Solo / Group behavior |
|---|---|---|
| 21 | Smart Packing Home | Trip duration, analysis basis, overall progress, packing-plan freshness. Solo: AI Suggestions and Packing Checklist. Group: Personal Packing, Shared Packing, Group Progress, and Review Updates. |
| 22 | AI Packing Suggestions | Needed and Possibly Useful sections; short reason tied to day/activity/weather; Add or Skip; batch Add Selected. In Group, classify as Personal or Potentially Shared and allow the user to override AI classification and quantity. |
| 23 | Personal Packing Checklist | Progress; Essentials, Clothing, Toiletries, Electronics, Activity Gear, Other; tick/untick, quantity, remove, add custom item. Use Unchecked rather than Missing. Personal item details stay private. |
| 24 | Shared Packing | Group only. Shared item, suggested quantity, assigned count, packed count; Unassigned → Assigned/Claimed → Packed; Claim and Admin Assign; show shortage or extra without forcing removal. |
| 25 | Outfit Planning | Optional Personal Packing subflow by day; activity context, AI outfit suggestion, Add / Skip, camera/upload, notes, Reuse; reused clothing merges into final quantity; Skip Outfit Planning remains available. |
| 26 | Packing Reminders | Compact settings screen/section: 3 days before, 1 day before, departure day, shared alerts, or all off. No per-item or hourly spam. |

Smart Packing logic:

- Analyze actual itinerary activities, weather, trip duration, and locations; then merge and deduplicate requirements.
- Needed helps prevent underpacking; Possibly Useful helps avoid overpacking.
- A skipped item is not repeatedly suggested unless trip context changes materially.
- Itinerary or weather changes trigger a delta update only. Existing packing decisions and packed states remain intact.
- Other members may see only another person's packing percentage/count, never their personal items.

## E. Budget

| ID | Screen | Core content and navigation |
|---|---|---|
| 27 | Budget Overview | Estimated or Recorded Trip Cost; major categories: Transportation, Accommodation, Tickets / Activities, Other; Add Expense; Group may switch All Expenses / Shared Expenses. No overall budget limit or remaining-budget forecast. |
| 28 | Add Expense | Expense name, amount, category. Solo saves. Group additionally selects Personal / Shared; if Shared: Paid by, included members, equal split. |

Budget remains a lightweight cost tracker. No complex forecasting, custom percentages, unequal split, settlement optimizer, or default food budget. Food, tax, and small costs may be entered under Other / Custom with their details and total amount.

## F. Group management

| ID | Screen | Core content and navigation |
|---|---|---|
| 29 | Travel Group | Group name / trip name, member count, Admin label, members and statuses; Invite Member; Manage Members; summary links for preference progress, shared packing, and shared expenses. |
| 30 | Manage Members | Admin controls; member picture, name, role, status; Make Admin, Remove, mark Joining / Not Joining Today, and View Shared Responsibilities; pending invites can be resent or cancelled. |
| 31 | Update Participation | Joining, Not Joining Today, Skip Activity, Left Trip. Keep the flow lightweight; show only the necessary shared-item warning or confirmation. |
| 32 | Reassign Shared Items | Reusable sheet/modal shown only when a participation change leaves shared items uncovered; Reassign or Later. |

## G. Adjustments and reusable states

These are reusable states or sheets within Itinerary Detail and Trip Updates, not six separate modules.

| ID | State / overlay | Choices and result |
|---|---|---|
| S01 | Place Unavailable | Go to next place or Find replacement; then recalculate. |
| S02 | Running Late / Traffic Delay | Show delay and important downstream impact; Continue, Shorten current stay, or Skip next place; then recalculate. Traffic and time delay share the same logic. |
| S03 | Weather Impact | Identify affected activities; Keep, Move to another time/day, or Find indoor alternative; then recalculate. |
| S04 | Replacement Suggestions | Nearby or similar viable places; select one; preview route impact; confirm. |
| S05 | Add Place Impact Preview | Show added travel time, new finish time, and only meaningful conflicts; Add Place or Cancel. If harmless, show Fits your itinerary. |
| S06 | Packing Delta Update | Show only new or no-longer-needed suggestions after itinerary or weather changes; Add / Keep / Remove / Skip. |
| S07 | Request to Include | Group-only low-ranked-place request showing requester's strong preference and majority Approve / Reject vote. |
| S08 | Confirmation / Success | Final places confirmed, day saved, participation updated, expense saved, packing completed, or trip ready. Reuse a consistent pattern. |

System principle: detect or report a change, explain only important consequences, offer limited choices, let the user decide, and then recalculate the affected segment. The prototype does not attempt to solve serious medical emergencies, booking disputes, or complex budget shocks.

## Frame count for design production

- 32 base screens.
- 8 reusable states/overlays.
- Solo and Group variants reuse shared layouts wherever possible.
- The first clickable prototype should prioritize the core Group journey because it demonstrates the product's strongest differentiation, while also preserving a complete Solo path.
