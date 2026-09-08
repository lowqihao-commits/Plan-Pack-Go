# Plan Pack Go — Screen-by-Screen UI Specification

## Global mobile rules

- Primary frame: `390 × 844`; content exceeding the frame scrolls vertically inside a clipped viewport.
- Standard app bars use Back on the left when needed and a concise title; avoid bottom navigation and extra tabs.
- Fixed primary actions may sit above the safe area when useful. Minimum tap target: 44 px.
- Preserve entered/saved data on Back. Cancel discards only unsaved changes on the current screen/state.
- Empty states may use short guidance and the mascot only when it improves meaning.

## Entry and trip creation

### 01 Splash

- **Title/app bar:** none.
- **Visible:** Cream background, centered compact logo, full `Plan Pack Go`, slogan, small flying mascot following a short dotted route.
- **Action/status:** no button; timed transition after about two seconds.
- **Do not show:** onboarding copy, Get Started, navigation or decorative controls.
- **Next/back:** automatic → 02; no Back.

### 02 Log In

- **App bar/title:** compact logo; `Welcome back`.
- **Inputs:** Email, Password, Show password.
- **Buttons/links:** primary `Log In`; secondary `Continue with Google`; `Forgot password?`; `Sign Up`.
- **States:** empty, invalid email, missing password, submitting.
- **Do not show:** mascot, other social providers, onboarding, profile fields.
- **Next/back:** login → 04; Sign Up → 03; recovery → 37.

### 03 Sign Up

- **Title:** `Create your account`; simple Back.
- **Inputs:** Name, Email, Password, Confirm Password.
- **Buttons/links:** `Create Account`; `Already have an account? Log In`.
- **States:** field validation and password mismatch.
- **Do not show:** profile setup, travel preferences or onboarding.
- **Next/back:** success → 04; Back/Login → 02.

### 04 My Trips

- **App bar:** compact logo top left; profile photo/icon top right.
- **Sections:** prominent `+ Add New Trip`; `My Trips`; search/filter belonging only to the existing-trip section; concise cards ordered Ongoing, Upcoming, Past.
- **Cards/labels:** name, dates, Solo/Group, status; member count only for Group.
- **States:** populated; empty existing-trip section with short guidance.
- **Do not show:** bottom navigation, budget totals, packing progress, archive chips or mascot decoration.
- **Next/back:** Add → 05; Solo card → 17; Group card → 18; profile → 35.

### 05 Trip Name

- **App bar/title:** Back; `Create a Trip`; `1 of 3`.
- **Input:** Trip name only, e.g. `Penang Weekend`.
- **Button:** `Continue` disabled until valid.
- **Do not show:** destination, description, dates, travellers, transport or image.
- **Next/back:** Continue → 06; Back → 04.

### 06 Solo or Group

- **App bar/title:** Back; `Create a Trip`; `2 of 3`.
- **Cards:** selectable `Solo Travel` and `Group Travel`, each with one short explanation and clear selected/unselected state.
- **Button:** `Continue`.
- **Do not show:** member fields or feature comparisons.
- **Next/back:** Solo → 08; Group → 07; Back → 05.

### 07 Group Invite

- **App bar/title:** Back; `Invite members`; Group Trip label.
- **Sections:** invite link with Copy; Share Invite; member list with avatar, name, You/Admin, Joined/Pending.
- **Buttons:** `Invite Member`/`Share invite`, `Skip for now`, `Continue`.
- **States:** no invitees, joined and pending.
- **Do not show:** contact-book request, chat or required email entry.
- **Next/back:** Continue/Skip → 08; Back → 06.

### 08 Trip Dates

- **App bar/title:** Back; `Create a Trip`; `3 of 3`.
- **Inputs:** Start Date, End Date and compact range calendar.
- **Status:** calculated `Days / Nights`; validation for invalid range.
- **Button:** `Create Trip`.
- **Do not show:** destination, member count, accommodation or transport.
- **Next/back:** Solo → 09; Group → 10; Back → previous branch screen.

## Places, preferences and final review

### 09 Solo Waiting List

- **App bar/title:** Back; `Places to Visit`; Solo badge and trip name.
- **Inputs/sections:** Search or enter a place; Add; Waiting List; Clear list.
- **Cards:** place and city/location; drag, edit, remove.
- **States:** empty guidance; populated/reordered.
- **Do not show:** ratings, avatars, AI rank, map or itinerary generation.
- **Next/back:** `Review Trip` → 13; Back → 08.

### 10 Shared Waiting List

- **App bar/title:** Back; `Shared Places to Visit`; Group badge/name and compact member avatars.
- **Sections:** Search/add; shared Waiting List; subtle saved/live-update status.
- **Cards:** place, location, `Added by`, drag/edit/remove.
- **Do not show:** chat, private list or Admin-only adding.
- **Next/back:** `Rate Places` → 11; Back → 08.

### 11 Group Preference

- **App bar/title:** Back; `Rate the Places`.
- **Cards:** place/location, `Added by`, 0–10 input, current user value, public member avatar/value ratings, Group score.
- **Status:** `New`, `Unrated`, and progress such as `3 of 4 places rated`.
- **Buttons:** secondary `Done for now` saves current ratings and returns to Group context; primary `Review Results` advances to 12. Do not add a separate `Review later` action.
- **Do not show:** private scores, hidden weighting or final itinerary.
- **Next/back:** Review Results → 12; Done returns to Group context; Back → 10.

### 12 Review Results

- **App bar/title:** Back; `Group Results`.
- **Sections/cards:** ranked places; normalized percentage; members rated; participation; High/Medium/Low category.
- **States:** incomplete participation and newly unrated place.
- **Button:** `Continue to Final Review`.
- **Do not show:** opaque AI score, private votes or repeated confirmation per High place.
- **Next/back:** Continue → 14; Back → 11.

### 13 Solo Final Review

- **App bar/title:** Back; `Final Review`.
- **Sections:** trip summary; places grouped by city; selectable checkboxes; selected count.
- **Button:** `Confirm Final Places`.
- **Do not show:** Group score, member progress, request or vote.
- **Next/back:** Confirm → S08 then 15; Back → 09.

### 14 Group Final Review

- **App bar/title:** Back; `Final Review`.
- **Cards/status:** High pre-included; Medium flagged for review; Low normally excluded; rating/participation context; Request to Include and majority progress when relevant.
- **Button:** `Confirm Final Places`.
- **Do not show:** private rating, author weighting or repetitive High-place confirmations.
- **Next/back:** request → S07; Confirm → S08 then 15; Back → 12.

## Itinerary and dashboards

### 15 Itinerary Planning

- **App bar/title:** Back; `Plan Itinerary`.
- **Tabs/control:** Day 1/Day 2 selector; departure Now/30 minutes later/Custom.
- **Stop cards:** order/drag, place, arrival, estimated stay, leave, move day, remove; `Add Place`.
- **End section:** continuing days show Overnight Stay type/location plus finish and back-at-stay estimate. The final departure day shows `Return home` / `Trip ends` and does not request accommodation or Overnight Stay.
- **Warnings:** opening hours/feasibility immediately beside affected stop.
- **Buttons:** `Optimize Route`, `Save Day`, Route Preview.
- **Do not show:** booking, payment or a final AI decision.
- **Next/back:** Route → 16; Save all required days → 17/18; Back → 13/14.

### 16 Route Preview

- **App bar/title:** Back; selected day.
- **Visible:** map region, numbered pins and route line; continuing days show an Overnight endpoint and estimated return, while the final departure day shows a `Return home` / `Trip ends` endpoint; segment cards show time/distance and total travel time.
- **Buttons:** `Optimize Route`, `Reorder Stops`, stop details.
- **Do not show:** live turn-by-turn navigation or booking.
- **Next/back:** Back/return → 15 or 19.

### 17 Solo Dashboard

- **App bar/title:** trip name; profile/back as context requires.
- **Summary:** dates, days/nights, Solo, status.
- **Cards:** Itinerary, emphasized Smart Packing, Budget; reflow without empty Group space.
- **Section:** concise Trip Updates.
- **Do not show:** Group module/controls, currency or social feed.
- **Next/back:** modules → 19/21/28; Back → 04.

### 18 Group Dashboard

- **Summary:** trip name, dates, days/nights, Group, member count, status.
- **Cards:** complete 2×2 Itinerary, emphasized Smart Packing, Budget, Group.
- **Section:** concise meaningful Trip Updates.
- **Do not show:** full module details, chat or currency.
- **Next/back:** modules → 19/22/28/31; Back → 04.

### 19 Itinerary Detail

- **App bar/title:** Back; `Itinerary`; day selector.
- **Timeline:** departure, arrival, stop, stay, leave, travel time/distance and finish; continuing days end at Overnight Stay, while the final departure day ends at `Return home` / `Trip ends` without accommodation.
- **Warnings:** contextual beside affected stop.
- **Buttons:** `View Route`, `Edit Day`, `Optimize Route`.
- **Do not show:** editing controls by default.
- **Next/back:** Route → 16; Edit → 20; alerts → S01–S05; Back → 17/18.

### 20 Edit Day

- **App bar/title:** Cancel; `Edit Day`.
- **Controls:** same timeline content plus drag, stay-duration edit, move day, remove, Add Place.
- **Buttons:** `Save Changes`, `Cancel`.
- **Do not show:** unrelated trip summary/modules.
- **Next/back:** Add Place may open S05; Save → 19; Cancel → 19 unchanged.

## Smart Packing

### 21 Smart Packing Solo

- **App bar/title:** Back; `Smart Packing`.
- **Sections/cards:** trip duration; itinerary/weather/activity analysis basis; personal progress; plan freshness; AI Suggestions; Packing Checklist; conditional Review Updates; a secondary `Packing Reminders` settings row below the packing modules.
- **Do not show:** Shared Packing, Group Progress or other traveller data.
- **Next/back:** Suggestions → 23; checklist → 24; reminders → 27; Back → 17.

### 22 Smart Packing Group

- **App bar/title:** Back; `Smart Packing`.
- **Sections/cards:** analysis basis, overall personal progress and freshness; an explicit `AI Suggestions` card; Personal Packing; Shared Packing; Group Progress; conditional Review Updates; a secondary `Packing Reminders` settings row below the packing modules.
- **Privacy:** member rows show only packed count/percentage.
- **Do not show:** another member's item list.
- **Next/back:** suggestions → 23; Personal → 24; Shared → 25; reminders → 27; Back → 18.

### 23 AI Packing Suggestions

- **App bar/title:** Back; `AI Packing Suggestions`.
- **Sections:** Needed and Possibly Useful.
- **Cards:** item, quantity, reason/`Why suggested?`, Add, Skip, selected state.
- **Group variation:** Personal/Potentially Shared classification and editable shared quantity.
- **Button:** `Add Selected`.
- **Empty/status:** analyzing state may use map/packing mascot; all-reviewed state.
- **Do not show:** auto-added items or repeated skipped suggestions without context change.
- **Next/back:** added Personal → 24; added Shared → 25; Back → 21/22.

### 24 Personal Packing

- **App bar/title:** Back; `Personal Packing`.
- **Status:** packed count and percentage.
- **Sections:** Essentials, Clothing, Toiletries, Electronics, Activity Gear, Other.
- **Rows/actions:** Unchecked/Packed checkbox, quantity, edit/remove; `Add custom item`; optional Outfit Planning link.
- **Do not show:** `Missing` label or Group-visible detail.
- **Next/back:** Outfit → 26; Back → 21/22.

### 25 Shared Packing

- **App bar/title:** Back; `Shared Packing`; Group context.
- **Rows:** item; Suggested/Covered/Packed quantities; compact assignees; state.
- **Actions:** Claim; Admin Assign; mark Packed; add shared item.
- **Warnings:** shortage, extras or unassigned responsibility; warning mascot only when helpful.
- **Do not show:** private personal items or automatic deletion of extras.
- **Next/back:** state updates remain here; Back → 22; affected reassignment may open 34.

### 26 Outfit Planning

- **Status:** **OPTIONAL** Personal Packing subflow.
- **App bar/title:** Back; `Outfit Planning`; day/date selector.
- **Card/inputs:** activity context, outfit suggestion, Add/Skip, photo/upload placeholder, notes, Reuse item.
- **Status:** indicate reused clothing counts once in final quantity.
- **Button:** Save; `Skip Outfit Planning` remains visible.
- **Do not show:** shopping, social/fashion feed or required completion.
- **Next/back:** Save/Skip/Back → 24.

### 27 Packing Reminders

- **App bar/title:** Back; `Packing Reminders`.
- **Controls:** toggles for 3 days before, 1 day before, departure day; Group shared alerts only in Group mode; Turn all off.
- **Button:** `Save reminders`.
- **Do not show:** custom clock times, hourly/per-item/marketing alerts or currency.
- **Next/back:** Save/Back → 21/22.

## Budget and Group

### 28 Budget Overview

- **App bar/title:** Back; user-facing title `Trip Cost`.
- **Summary/cards:** `Recorded Trip Cost` or `Estimated Trip Cost`; Transportation, Accommodation, Tickets / Activities, Other; recent expenses.
- **Group control:** All Expenses / Shared Expenses switch only.
- **Button:** `Add Expense`.
- **Do not show:** budget limit, remaining amount, forecast, charts, settlement, currency or default Food category.
- **Next/back:** Add → 29/30; Back → 17/18.

### 29 Add Expense Solo

- **App bar/title:** Cancel; `Add Expense`.
- **Inputs:** Expense Name, Amount, Category; optional Note.
- **Button:** `Save Expense`.
- **Do not show:** personal/shared switch or split controls.
- **Next/back:** Save → S08 then 28; Cancel/Back → 28.

### 30 Add Expense Group

- **Inputs:** same base fields plus Personal/Shared.
- **Shared conditional:** Paid by, participating members, Equal split summary.
- **Button:** `Save Expense`.
- **Do not show:** custom percentages, unequal split, settlement, conversion or collection.
- **Next/back:** Save → S08 then 28; Cancel → 28.

### 31 Travel Group

- **App bar/title:** Back; group/trip name.
- **Summary:** member count, Admin label, member list with role/status.
- **Buttons/cards:** Invite Member, Manage Members; compact links to Group Preferences, Shared Packing, Shared Expenses.
- **Do not show:** chat or duplicated full module content.
- **Next/back:** Manage → 32; module links → 11/25/28; Back → 18.

### 32 Manage Members

- **App bar/title:** Back; `Manage Members`.
- **Rows:** picture, name, Admin/Member, Joined/Pending/current participation.
- **Actions:** Make Admin, Remove, view shared responsibilities; resend/cancel pending invitation; mark participation.
- **Do not show:** complex impact dashboard.
- **Next/back:** participation → 33; Back → 31; consequential actions use confirmation.

### 33 Update Participation

- **Title:** `Update Participation` focused sheet/screen.
- **Choices:** Joining, Not Joining Today, Skip Activity, Left Trip.
- **Warning:** only when responsibilities may become uncovered.
- **Buttons:** `Update`, `Cancel`.
- **Do not show:** unrelated itinerary, packing or budget content.
- **Next/back:** Update → 31/S08; uncovered items → 34; Cancel → 32.

### 34 Reassign Shared Items

- **Title:** `Reassign Shared Items`.
- **Rows:** affected item, quantity, previous assignee and new-member selector.
- **Buttons:** `Reassign`, `Later`.
- **Do not show:** full member management or forced resolution.
- **Next/back:** Reassign → 25/31; Later/Back → 31.

## Account

### 35 Profile Settings

- **App bar/title:** Back; `Profile / Settings`.
- **Sections:** profile picture/name/email and Edit Profile; Notifications (Packing Reminders, Group Updates, Trip Alerts); App Settings (Language, Theme); Account (Log Out).
- **Do not show:** currency, payment, packing details or new preference categories.
- **Next/back:** Edit → 36; Back → 04.

### 36 Edit Profile

- **App bar/title:** Cancel; `Edit Profile`.
- **Inputs:** photo, Name, Email only.
- **Button:** `Save Changes`.
- **Do not show:** password, currency, payment, notification or privacy settings.
- **Next/back:** Save/Cancel → 35.

### 37 Forgot Password

- **App bar/title:** Back; compact logo; `Forgot password?`.
- **Input:** Email and short recovery explanation.
- **Button/link:** `Send Recovery Link`; `Back to Log In`.
- **States:** validation, submitting and compact sent confirmation.
- **Do not show:** phone recovery, security questions, OTP or new-password form.
- **Next/back:** sent/back → 02.

## Reusable overlays and states

### S01 Place Unavailable

Itinerary background plus focused sheet naming the place. Actions: `Go to next place`, `Find replacement`, Cancel. State route segment will recalculate. Replacement → S04; decision → 19. No emergency claims.

### S02 Running Late

Show current delay and only material downstream impact. Actions: Continue, Shorten current stay, Skip next place, Cancel. Traffic uses the same state. Recalculate → 19.

### S03 Weather Impact

Show affected outdoor activities. Actions: Keep, Move to another time/day, Find indoor alternative, Cancel. Calm warning treatment; no broad forecast dashboard. Recalculate → 19; alternative may use S04.

### S04 Replacement Suggestions

Sheet with nearby/similar viable choices, each with fit reason, travel-time impact and opening feasibility. Select, Preview Route Impact, Confirm Replacement or Cancel. Confirm → 19.

### S05 Add Place Impact

Show extra travel time/distance when available, new finish time and only meaningful conflict; harmless case says `Fits your itinerary`. Actions Add Place/Cancel. Confirm → 19/20.

### S06 Packing Delta

Show only `New Suggestions` and `No Longer Needed`, each with reason and Add/Keep/Remove/Skip. Preserve all other items and packed states. Apply → 21/22.

### S07 Request to Include

Group-only sheet with place, requester, short reason, normalized result, public Approve/Reject and majority progress. No private vote or extra requester weight. Close → 14.

### S08 Confirmation Success

Consistent checkmark/approved mascot treatment, one short result and Continue/Done. Variants: Final places confirmed, Day saved, Participation updated, Expense saved, Packing completed, Trip ready. This is one reusable pattern, not six new screens.
