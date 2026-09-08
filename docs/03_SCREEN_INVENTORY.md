# Plan Pack Go — Screen Inventory

## Production rule

The final prototype inventory contains **36 active base frames and 8 reusable state/overlay frames = 44 total**. Forgot Password was removed during final QA. All target `390 × 844`; long content may vertically scroll inside the viewport.

Priority meanings: **Core** demonstrates the main product story; **Supporting** completes navigation/management; **Optional** is skippable without breaking the main story.

## Base frames

| ID | Screen | Mode | Purpose | Main components | Main CTA → destination | Priority / state |
|---|---|---|---|---|---|---|
| 01 | Splash | Both | Brand entry | Logo, full name, slogan, flying owl/route | Automatic after ~2s → 02 | Core; timed |
| 02 | Log In | Both | Authenticate | Email, password, Google, Sign Up link | Log In → 04 | Core; validation |
| 03 | Sign Up | Both | Create account | Name, email, password, confirm password | Create Account → 04 | Supporting; validation |
| 04 | My Trips | Both | Select/manage trips | App bar, Add New Trip, search/filter, sorted trip cards | Add New Trip → 05; card → 17/18 | Core; populated/empty |
| 05 | Trip Name | Both | Start trip creation | One Trip name field, progress | Continue → 06 | Core; validation |
| 06 | Solo or Group | Both | Select branch | Solo Travel and Group Travel cards | Continue → 08 Solo / 07 Group | Core; selected state |
| 07 | Group Invite | Group | Invite collaborators | Invite link, Share/Copy, members, Skip | Continue/Skip → 08 | Core; joined/pending |
| 08 | Trip Dates | Both | Set date range | Start/End, calendar, Days/Nights | Create Trip → 09 Solo / 10 Group | Core; calculated state |
| 09 | Solo Waiting List | Solo | Collect desired places | Search/add, Waiting List, reorder/edit/remove | Review Trip → 13 | Core; empty/populated |
| 10 | Shared Waiting List | Group | Collect shared places | Search/add, Added by, members, sync status | Rate Places → 11 | Core; async updates |
| 11 | Group Preference | Group | Public place ratings | Place cards, 0–10, visible ratings, progress | Review Results → 12 | Core; New/Unrated/partial |
| 12 | Review Results | Group | Rank preferences | Percentage rank, participation, High/Medium/Low | Continue → 14 | Core; incomplete result |
| 13 | Solo Final Review | Solo | Confirm final places | City groups, selectable places, count | Confirm Final Places → 15 | Core; selected state |
| 14 | Group Final Review | Group | Confirm negotiated places | Pre-included High, Medium review, Low request/vote | Confirm Final Places → 15 | Core; request state links S07 |
| 15 | Itinerary Planning | Both | Build days | Day selector, stops, times, Overnight Stay for continuing days or Return home / Trip ends for final departure, warnings | Save Day → 17/18; Route → 16 | Core; edit/analysis |
| 16 | Route Preview | Both | Review route | Map, numbered pins, route, segments, totals, Overnight Stay or final trip endpoint | Return → 15/19 | Core; route state |
| 17 | Solo Dashboard | Solo | Trip hub | Summary, Itinerary/Smart Packing/Budget, updates | Module card → relevant module | Core; no Group slot |
| 18 | Group Dashboard | Group | Trip hub | Summary, 2×2 modules, updates | Module card → relevant module | Core |
| 19 | Itinerary Detail | Both | View finalized itinerary | Day selector, timeline, Overnight Stay or final trip endpoint, warnings, route/edit actions | View Route → 16; Edit Day → 20 | Core; read-only |
| 20 | Edit Day | Both | Modify a day | Reorder, duration, move/remove/add | Save Changes → 19 | Supporting; editing |
| 21 | Smart Packing Solo | Solo | Enter personal packing | Analysis basis, progress, AI Suggestions, checklist, updates, Packing Reminders entry | Suggestions → 23; Checklist → 24; Reminders → 27 | Core; fresh/delta |
| 22 | Smart Packing Group | Group | Packing hub | AI Suggestions, Personal, Shared, Group Progress, updates, Packing Reminders entry | Suggestions → 23; Personal → 24; Shared → 25; Reminders → 27 | Core; privacy summary |
| 23 | AI Packing Suggestions | Both | Review explainable suggestions | Needed, Possibly Useful, reason, quantity, Add/Skip | Add Selected → 24/25 | Core; Solo/Group classification |
| 24 | Personal Packing | Both | Manage private checklist | Categories, quantity, checkbox, custom item, progress | Update checklist / Outfit → 26 | Core; Unchecked/Packed |
| 25 | Shared Packing | Group | Coordinate shared luggage | Quantity coverage, assignees, Claim/Assign/Packed | State update stays on 25 | Core; state machine |
| 26 | Outfit Planning | Both | Optional outfit assistance | Day/activity, suggestion, image, notes, reuse | Save Outfit → 24 | Optional; may skip |
| 27 | Packing Reminders | Both | Configure milestones | 3-day, 1-day, departure, Group shared toggle | Save → 21/22 | Supporting; Group control conditional |
| 28 | Budget Overview | Both | Track trip cost | Recorded/estimated total, categories, expenses, filter | Add Expense → 29 Solo / 30 Group | Supporting; not a limit |
| 29 | Add Expense Solo | Solo | Record personal expense | Name, amount, category, optional note | Save Expense → 28 | Supporting; validation |
| 30 | Add Expense Group | Group | Record personal/shared expense | Base fields, type, Paid by, members, equal split | Save Expense → 28 | Supporting; Shared conditional |
| 31 | Travel Group | Group | Group overview | Members/statuses, Admin, invite/manage, summaries | Manage Members → 32 | Supporting |
| 32 | Manage Members | Group | Admin member controls | Roles, statuses, pending actions, responsibility link | Update Participation → 33 | Supporting; admin actions |
| 33 | Update Participation | Group | Change participation | Joining/Not Joining Today/Skip Activity/Left | Update → 31 or S08 | Supporting; warning may lead 34 |
| 34 | Reassign Shared Items | Group | Cover affected items | Affected item/quantity/old assignee/new member | Reassign → 31/25 | Supporting; `Later` allowed |
| 35 | Profile Settings | Both | Profile/preferences | Profile, notifications, Language, Theme, Log Out | Edit Profile → 36 | Supporting |
| 36 | Edit Profile | Both | Edit basic identity | Photo, Name, Email | Save Changes → 35 | Supporting; validation |

## Reusable state and overlay frames

These are focused states over an existing itinerary, packing or confirmation context—not new modules.

| ID | State | Mode | Purpose | Main components | Main CTA → destination | Priority / state |
|---|---|---|---|---|---|---|
| S01 | Place Unavailable | Both | Respond to closure | Affected place, next/replacement choices | Choice → recalculation → 19 | Core overlay |
| S02 | Running Late | Both | Respond to delay | Delay impact, continue/shorten/skip | Choice → recalculation → 19 | Core overlay |
| S03 | Weather Impact | Both | Respond to meaningful weather | Affected activities, keep/move/indoor | Choice → recalculation → 19 | Core overlay |
| S04 | Replacement Suggestions | Both | Choose viable replacement | Options, fit, travel impact, opening feasibility | Confirm → recalculation → 19 | Supporting overlay |
| S05 | Add Place Impact | Both | Confirm spontaneous addition | Travel/distance impact, finish time, conflict | Add Place → recalculation → 19/20 | Core overlay |
| S06 | Packing Delta | Both | Review context-driven changes | New/No Longer Needed, reason, Add/Keep/Remove/Skip | Apply choices → 21/22 | Core overlay |
| S07 | Request to Include | Group | Public low-rank appeal | Requester/reason, score, Approve/Reject, majority | Close → 14 | Supporting overlay |
| S08 | Confirmation Success | Both | Reusable completion feedback | Checkmark/approved mascot state, result, Continue/Done | Return to relevant parent | Supporting state variants |

S08 may represent Final places confirmed, Day saved, Participation updated, Expense saved, Packing completed or Trip ready without creating six separate screens.
