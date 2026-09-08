# Plan Pack Go — Bolt Screen Map

Visual priority: **CORE** = differentiator, **HIGH** = main product journey, **NORMAL** = important supporting flow, **SUPPORTING** = utility/settings surface.

| Screen/module | Source file | Purpose | Mode | Visual priority |
|---|---|---|---|---|
| Splash / Login / Sign Up | `prototype/src/screens/AuthScreens.tsx` | Brand entry and simulated authentication | Both | NORMAL |
| My Trips | `prototype/src/screens/TripScreens.tsx` | Search/filter trips, open a trip, start a new trip, access Profile | Both | HIGH |
| Trip Name / Solo or Group | `prototype/src/screens/TripScreens.tsx` | Start trip creation and select the explicit branch | Both | HIGH |
| Group Invite | `prototype/src/screens/TripScreens.tsx` | Share invite link and manage Joined/Pending invite state | Group | NORMAL |
| Trip Dates | `prototype/src/screens/TripScreens.tsx` | Select date range and show calculated duration | Both | NORMAL |
| Places to Visit / Waiting List | `prototype/src/screens/WaitingListScreen.tsx` | Add, edit, reorder and remove candidate places | Solo and Group variants | HIGH |
| Group Preference Rating | `prototype/src/screens/PreferenceScreens.tsx` | Public 0–10 ratings using the current eligible roster | Group | HIGH |
| Review Results | `prototype/src/screens/PreferenceScreens.tsx` | Rank preferences and show participation plus High/Medium/Low | Group | HIGH |
| Group Final Review / Request to Include / confirmation | `prototype/src/screens/PreferenceScreens.tsx` | Negotiate and confirm final Group places | Group | HIGH |
| Solo Final Review | `prototype/src/screens/SoloFinalReviewScreen.tsx` | Include/exclude and confirm Solo places without voting | Solo | HIGH |
| Itinerary Planning / Edit Day / Add Place Impact | `prototype/src/screens/ItineraryPlanningScreen.tsx` | Plan days, timing, stops, stays, return-home endpoint and route impact | Both | HIGH |
| Route Preview | `prototype/src/screens/RoutePreviewScreen.tsx` | Show the map-like route, segments, totals and optimization proposal | Both | HIGH |
| Solo / Group Dashboard | `prototype/src/screens/DashboardScreens.tsx` | Lightweight trip hub for Itinerary, Smart Packing, Budget and Group | Solo and Group variants | HIGH |
| Itinerary Detail | `prototype/src/screens/ItineraryDetailScreen.tsx` | Review finalized day timelines and open route/edit/adjustment actions | Both | HIGH |
| Smart Packing Home / Group Packing Progress | `prototype/src/screens/SmartPackingHomeScreen.tsx` | Present itinerary-driven packing progress and module entry points | Solo and Group variants | CORE |
| AI Packing Suggestions | `prototype/src/screens/PackingSuggestionsScreen.tsx` | Review Needed/Possibly Useful reasons and choose Add/Skip | Both | CORE |
| Personal Packing | `prototype/src/screens/PersonalPackingScreen.tsx` | Manage the private categorized checklist and quantities | Both; private in Group | CORE |
| Shared Packing | `prototype/src/screens/SharedPackingScreen.tsx` | Coordinate quantities, claims, assignments and Packed status | Group | CORE |
| Outfit Planning / OOTD | `prototype/src/screens/OutfitPlanningScreen.tsx` | Optional activity-aware outfit and reuse helper | Both | NORMAL |
| Packing Reminders | `prototype/src/screens/PackingRemindersScreen.tsx` | Configure approved packing milestones | Both; Group toggle conditional | SUPPORTING |
| Packing Delta Updates | `prototype/src/screens/PackingDeltaScreen.tsx` | Review packing changes caused by itinerary/context updates | Both | CORE |
| Budget Overview / Add Expense | `prototype/src/screens/BudgetScreens.tsx` | Record trip costs and optional Group equal split | Solo and Group variants | SUPPORTING |
| Group Overview / Manage Members / Participation / Reassignment | `prototype/src/screens/GroupScreens.tsx` | Manage lightweight collaboration and affected shared assignments | Group | NORMAL |
| Profile / Settings / Edit Profile | `prototype/src/screens/ProfileScreens.tsx` | Basic identity, notifications, language, theme preference and logout | Both | SUPPORTING |
| Unexpected Plan Adjustment | `prototype/src/screens/UnexpectedAdjustmentSheet.tsx` | Lightweight unavailable, late/traffic, weather and replacement decisions | Both | NORMAL |

## Shared implementation files

| File | Role |
|---|---|
| `prototype/src/App.tsx` | Route map, Solo/Group guards, state orchestration and screen wiring |
| `prototype/src/components/ui.tsx` | App shell, accessible modal, app bar, buttons, fields, avatars, toast and progress |
| `prototype/src/styles.css` | Complete visual implementation and responsive behavior |
| `prototype/src/types.ts` | Shared screen and state types |
| `prototype/src/data/mockData.ts` | Seeded trips, members, places and preference examples |
| `prototype/src/data/packingData.ts` | Packing suggestions, personal/shared lists and outfit data |
| `prototype/src/data/supportingData.ts` | Eligible-member logic, expenses, profile and settings data |
| `prototype/src/lib/itinerary.ts` | Recommended itinerary and timing behavior |
| `prototype/src/lib/preferences.ts` | Current-roster ratings, summaries and majority behavior |

Do not create screens that are absent from this map. Visual-polish changes should primarily stay within existing JSX structure and `styles.css`; any structural edit must preserve behavior and accessibility semantics.
