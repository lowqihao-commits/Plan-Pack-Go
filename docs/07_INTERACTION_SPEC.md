# Plan Pack Go — Interaction Specification

## Governing principle

**AI recommends, user decides.** Suggestions, ranking, optimization, warnings and generated data remain proposals until the user confirms a meaningful change. Never silently include a place, reorder a saved day, add/remove a packing item, alter quantities or reassign a shared item.

## Navigation and persistence

- Use explicit Back, Cancel and primary actions consistently.
- Back preserves previously saved data. Cancel discards only unsaved changes in the active form/modal.
- Solo routes never expose Group destinations; direct navigation to Group-only routes should safely return to the Solo Dashboard/My Trips.
- Long screens scroll vertically within `390 × 844`; primary actions remain discoverable without covering content.
- Loading, empty, error and success states should not shift the overall information architecture.

## Splash

- Duration: approximately two seconds.
- Motion sequence: short dotted route reveals → owl/brand motion → logo/name/slogan settle → dissolve/slide to Log In.
- No Get Started button.
- Respect reduced-motion preferences by showing the final composition briefly, then transitioning.

## Login and Sign Up

- Validate required fields on blur and submit; keep error text close to the field.
- Email uses basic format validation. Confirm Password must match Password.
- Submit shows a short busy state and disables duplicate submission.
- Prototype outcomes are simulated; no real authentication.

## My Trips

- Search/filter applies only to existing trip cards, never to Add New Trip.
- Search updates visible cards; Clear restores default ordering.
- Filter supports the existing states needed by mock data without inventing new trip attributes.
- Card selection opens the matching Solo or Group Dashboard.

## Trip creation

- Linear, resumable flow: name → type → invite if Group → dates → Waiting List.
- Continue is disabled until the current required choice is valid.
- Changing Group back to Solo removes the Group-only step from navigation; no Group data is displayed in Solo.
- Days/Nights updates when either date changes; invalid/end-before-start ranges show inline feedback.

## Shared Waiting List and asynchronous Group work

- Any joined member can add a place; show who added it and a subtle saved/synced state.
- Reorder/edit/remove requires clear visible feedback.
- Group members may participate at different times; `Done for now` is the single deferral action. It saves current ratings and returns to Group context without locking future rating. `Review Results` advances to results; there is no separate `Review later` action.
- A newly added place appears as New/Unrated for members who have not rated it.

## Ratings and final places

- Rating control accepts integers from 0 through 10, is keyboard/touch accessible and immediately displays the chosen value.
- Ratings are public and aggregate to a normalized percentage.
- Review Results shows rating completion so incomplete data is not mistaken for consensus.
- Exact High/Medium/Low thresholds are `TODO / Not yet decided`; keep them configurable in mock logic.
- Request to Include uses public Approve/Reject and majority progress; author/requester has one normal vote.
- `Confirm Final Places` is required before itinerary planning.

## Itinerary planning

- Drag/reorder updates the proposed order and estimated times. Provide accessible move up/down alternatives in the web prototype.
- Moving a stop between days updates both day lists and estimates.
- Editing estimated stay recalculates later arrival/leave/finish times.
- `Optimize Route` previews/recommends an order; it does not commit until confirmed.
- `Save Day` persists the current day and shows short confirmation.
- Each day that continues into another night retains an Overnight Stay anchor, including `Not decided yet` while planning. The final departure day omits accommodation/Overnight Stay when the traveller returns home and ends at `Return home` / `Trip ends`.
- Warnings are contextual and actionable; they do not block harmless saves unless required data is missing.

## Add Place and route impact

- Adding a spontaneous place opens S05 before mutation.
- Preview shows added time/distance when available, new finish time and material conflicts.
- Confirm applies the change and recalculates affected segments; Cancel restores the prior itinerary exactly.
- Replacement selection follows S04, then the same confirm/recalculate pattern.

## Smart Packing

- Simulated analysis may show a short loading state with contextual mascot.
- Each suggestion has Add/Skip; batch Add applies only selected items.
- Group users can override Personal/Potentially Shared and edit Suggested Quantity before Add.
- Add places the item in the correct checklist; Skip records suppression.
- Check/uncheck updates count and percentage immediately.
- Quantity adjustment never silently changes Suggested Quantity history.
- Custom item add/edit/remove requires user action.
- A materially changed itinerary/weather opens S06 with delta items only. Unmentioned items and all packed states remain untouched.

## Shared Packing

- `Claim` assigns the current member and advances Unassigned → Claimed.
- Admin `Assign` chooses a member and advances Unassigned → Assigned.
- Packed may be set only after an item is assigned/claimed.
- Quantity coverage updates after claims/assignments and may show shortage/extras.
- Participation change may offer Reassign or Later; it never silently reassigns.

## Outfit Planning — OPTIONAL

- Add/Skip applies per suggestion/day.
- Take Photo/Upload Photo uses a simulated image chooser in the prototype.
- Notes save with the outfit.
- Reuse selects an existing clothing item and consolidates final required quantity.
- Skip Outfit Planning exits to Personal Packing without penalty.

## Packing reminders

- Open screen 27 from the secondary `Packing Reminders` settings row on either Smart Packing home screen (21 or 22), not from Personal Packing.
- Toggles control milestone groups: 3 days, 1 day, departure day and Group shared alert when applicable.
- `Turn all off` disables all shown controls; `Save reminders` persists the configuration.
- Prototype may simulate reminder cards; it does not schedule operating-system notifications.

## Budget / trip cost

- Add Expense validates Name, positive Amount and Category.
- Group `Shared` reveals Paid by, included members and an equal-split preview.
- Equal split recalculates when included members change.
- Save updates recorded totals/category subtotal and shows confirmation.
- No budget threshold, remaining forecast, unequal split, settlement or currency-setting interaction.

## Group management

- Admin-only actions are visually labelled and require a focused confirmation for consequential changes.
- Pending invitations may be resent/cancelled in simulated state.
- Participation update uses the four approved choices only.
- If a member change uncovers shared items, show 34; Reassign applies selected assignees, Later leaves a visible unresolved warning.

## Unexpected changes

- Use focused sheet/modal states over itinerary context.
- Place unavailable: next place or replacement.
- Delay: continue, shorten current stay or skip next place.
- Weather: keep, move time/day or indoor alternative.
- Each selection shows a brief recalculation state, then returns to the updated itinerary.
- Do not create a standalone disruption dashboard or claim to handle emergencies.

## Confirmation and failure handling

- S08 uses one concise result and one Continue/Done action.
- If a simulated operation fails, keep user input, explain the failure plainly and allow retry/cancel.
- Do not use success copy until the associated mock state has been updated.
