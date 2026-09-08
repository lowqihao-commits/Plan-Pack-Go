# Plan Pack Go — Mock Data Specification

All data is fictional and must stay consistent across screens. Dates are prototype data, not live service output.

## Signed-in profile

- Name: Alex Tan
- Email: alex.tan@example.com
- Profile image: neutral generated/avatar placeholder; not a real person

## My Trips

| Status/order | Trip | Dates | Type | Detail |
|---|---|---|---|---|
| Ongoing | Penang Discovery | 6–9 Sep 2026 | Group | 4 days / 3 nights; 5 members |
| Upcoming | Cameron Highlands Reset | 18–20 Oct 2026 | Solo | 3 days / 2 nights |
| Past | Melaka Heritage Weekend | 14–16 Aug 2026 | Group | 3 days / 2 nights; completed |

The core Group prototype story uses **Penang Discovery**. The Solo branch may use **Cameron Highlands Reset**.

## Penang Discovery members

| Member | Role | Status | Rating completion | Packing summary |
|---|---|---|---:|---:|
| Alex Tan | Admin | Joining | 5/5 | 18/22 (82%) |
| Aisha Rahman | Member | Joining | 5/5 | 16/20 (80%) |
| Daniel Lee | Member | Joining | 4/5 | 14/19 (74%) |
| Mei Wong | Member | Joining | 5/5 | 21/23 (91%) |
| Ravi Kumar | Member | Joining | 3/5 | 12/18 (67%) |

Use simple fictional avatars/initials. Personal item details for Aisha, Daniel, Mei and Ravi are never exposed.

## Shared Waiting List and ratings

Ratings are public integers out of 10. Percentage is the mean divided by 10, displayed as a percent among submitted ratings.

| Place | Location | Added by | Alex | Aisha | Daniel | Mei | Ravi | Result example |
|---|---|---|---:|---:|---:|---:|---:|---|
| Penang Hill | Air Itam | Alex | 9 | 10 | 8 | 9 | 8 | 88%, High |
| Kek Lok Si Temple | Air Itam | Mei | 9 | 9 | 8 | 10 | 7 | 86%, High |
| Chew Jetty | George Town | Daniel | 8 | 8 | 7 | 9 | 8 | 80%, Medium example |
| Entopia Butterfly Farm | Teluk Bahang | Aisha | 7 | 8 | 6 | 8 | — | 73%, 4/5 rated, Medium example |
| Batu Ferringhi Beach | Batu Ferringhi | Ravi | 4 | 5 | — | 6 | — | 50%, 3/5 rated, Low example |

This five-member Penang table is seeded demonstration data, not a fixed voter roster. Runtime ratings, participation and majority voting must use the current trip's eligible members; Pending and `Left Trip` members do not count.

The category labels are illustrative mock states only. Do not infer production thresholds from them; thresholds remain undecided.

Example Request to Include: Ravi requests Batu Ferringhi Beach because it is his strongest personal preference; vote currently `2 of 5 approve`.

## Confirmed final places

Preselected/included: Penang Hill, Kek Lok Si Temple, Chew Jetty and Entopia Butterfly Farm. Batu Ferringhi Beach begins excluded and may be demonstrated through S07. User confirmation is required before itinerary generation.

## Example itinerary

### Day 1 — George Town arrival

- 09:00 Depart accommodation.
- 09:20 Arrive Chew Jetty.
- 09:20–10:20 Visit.
- 10:20 Leave; 15 min / 4 km segment.
- 10:35 return toward the Overnight Stay; remaining time is unstructured personal time, not a new itinerary stop.
- 11:00 estimated planned-route finish.
- Overnight Stay: Harbour View Hotel, George Town.

### Day 2 — Air Itam

- 08:00 Depart Harbour View Hotel.
- 08:30–10:30 Kek Lok Si Temple.
- 10:30–10:45 transfer, 3 km.
- 10:45–14:00 Penang Hill including funicular and walking.
- 14:35 return estimate.
- Overnight Stay: Harbour View Hotel.

### Day 3 — Teluk Bahang

- 09:00 depart.
- 09:45–12:15 Entopia Butterfly Farm.
- Weather impact example: heavy rain may affect the planned outdoor garden segment.
- 14:00 return route.
- Overnight Stay: Harbour View Hotel.

### Day 4 — departure

- Short checkout/departure day.
- End state: `Return home` / `Trip ends`.
- Accommodation and Overnight Stay are not required after final departure; the multi-day Overnight Stay rule applies only to days that continue into another night.

Route warning example: Penang Hill last funicular timing may conflict if Kek Lok Si stay extends by 60 minutes. Running-late example: 35-minute delay shifts Penang Hill arrival and finish.

## Smart Packing examples

### Needed suggestions

| Item | Qty | Reason | Default type |
|---|---:|---|---|
| Lightweight rain jacket | 1 | Rain may affect Day 3 outdoor activities | Personal |
| Comfortable walking shoes | 1 pair | Long walks on Days 1 and 2 | Personal |
| Refillable water bottle | 1 | Hill and temple walking | Personal |
| Personal medication | as needed | Essential trip item | Personal |
| Compact umbrellas | 3 | Rain forecast; coverage for five travellers | Potentially Shared |

### Possibly Useful suggestions

| Item | Qty | Reason | Default type |
|---|---:|---|---|
| Portable fan | 1 | Warm outdoor queues | Personal |
| Small daypack | 1 | Day 2 hill itinerary | Personal |
| Insect repellent | 2 | Outdoor garden on Day 3 | Potentially Shared |

Example skipped item: travel pillow. It must not return unless itinerary context materially changes.

### Personal checklist example

- Essentials: ID, phone, charger, medication.
- Clothing: 4 tops, 2 bottoms, sleepwear, rain jacket.
- Toiletries: toothbrush, travel toiletries.
- Electronics: phone charger, power bank.
- Activity Gear: walking shoes, daypack.
- Other: reusable bottle.
- Alex progress: `18 / 22 packed (82%)`; four items remain `Unchecked`.

### Shared packing example

| Item | Suggested | Covered | Packed | State/assignment |
|---|---:|---:|---:|---|
| Compact umbrellas | 3 | 2 | 1 | 1 Alex packed; 1 Mei claimed; 1 more recommended |
| Insect repellent | 2 | 2 | 2 | Daniel and Aisha packed |
| Portable first-aid kit | 1 | 1 | 0 | Ravi assigned |
| Extension adapter | 1 | 2 | 1 | Extra detected; do not delete |

Packing delta example after rain warning: add waterproof phone pouch (Possibly Useful); keep umbrella quantity; no existing packed state resets.

## Outfit example — OPTIONAL

Day 2 suggestion: breathable top, lightweight trousers, walking shoes and rain jacket. Alex reuses the same walking shoes on Days 1–3; final checklist quantity remains one pair.

## Recorded trip costs

Display amounts in `RM` for this fixed mock trip. This does not create a currency setting.

| Expense | Category | Amount | Type / payer |
|---|---|---:|---|
| Intercity transport | Transportation | RM 240 | Shared; Alex; equal among 5 |
| Harbour View Hotel | Accommodation | RM 900 | Shared; Mei; equal among 5 |
| Penang Hill tickets | Tickets / Activities | RM 150 | Shared; Daniel; equal among 5 |
| Entopia tickets | Tickets / Activities | RM 325 | Shared; Alex; equal among 5 |
| Parking and tolls | Other | RM 80 | Shared; Ravi; equal among 5 |

Recorded total example: RM 1,695. No limit, remaining amount or over-budget state.

## Alerts and success examples

- Weather: `Rain may affect 2 outdoor activities today.`
- Closing conflict: `A longer temple visit may make you miss the final Penang Hill funicular.`
- Running late: `You are 35 minutes behind. Penang Hill finish moves to 14:35.`
- Shared item: `1 more compact umbrella is recommended.`
- Success: `Final places confirmed`, `Day 2 saved`, `Expense saved`, `Packing completed`, `Your trip is ready`.
