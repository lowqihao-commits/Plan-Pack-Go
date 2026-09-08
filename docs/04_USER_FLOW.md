# Plan Pack Go — User Flow

## Readable primary flow

### Entry

`01 Splash` → after approximately two seconds → `02 Log In`

- Log In → `04 My Trips`
- Sign Up link → `03 Sign Up` → `04 My Trips`
- Forgot Password → `37 Forgot Password` → `02 Log In`
- Profile icon from My Trips → `35 Profile Settings` → `36 Edit Profile`

### Create Trip

`04 My Trips` → `05 Trip Name` → `06 Solo or Group`

**Solo:** `08 Trip Dates` → `09 Solo Waiting List` → `13 Solo Final Review` → `15 Itinerary Planning` → `17 Solo Dashboard`

**Group:** `07 Group Invite` (or Skip for now) → `08 Trip Dates` → `10 Shared Waiting List` → `11 Group Preference` → `12 Review Results` → `14 Group Final Review` → `15 Itinerary Planning` → `18 Group Dashboard`

From `14 Group Final Review`, `Request to Include` opens `S07 Request to Include` and returns to `14` after the public vote/review. Confirming final places may show `S08 Confirmation Success` before continuing to `15 Itinerary Planning`.

Solo never enters Group-only screens. Group functions are not merely disabled for Solo; they are hidden and the layout reflows.

For every day that continues into another night, Itinerary Planning ends at an Overnight Stay anchor. The final departure day requires no accommodation when the traveller returns home; it ends at `Return home` / `Trip ends` instead.

### Dashboard modules

- Itinerary → `19 Itinerary Detail` → `16 Route Preview` or `20 Edit Day`.
- Smart Packing → `21 Smart Packing Solo` or `22 Smart Packing Group`.
- Budget → `28 Budget Overview` → `29 Add Expense Solo` or `30 Add Expense Group`.
- Group (Group only) → `31 Travel Group` → `32 Manage Members` → `33 Update Participation`; uncovered shared items may open `34 Reassign Shared Items`.

Meaningful saved actions may briefly use the reusable `S08 Confirmation Success` pattern, then return to their documented parent or next destination. S08 is feedback, not a standalone module.

Back returns to the immediate parent without discarding saved data. Cancel closes the current modal/edit state and restores the previous screen. Device/system back must match the visible Back/Cancel result.

## Smart Packing flows

**Solo:** Smart Packing Solo → AI Suggestions → Add/Skip → Personal Packing.

**Group:** Smart Packing Group → AI Suggestions → choose Personal/Potentially Shared → Add/Skip → Personal Packing or Shared Packing. Other members expose only count/percentage progress.

`Packing Reminders` is a secondary entry on both Smart Packing home screens (21 and 22), not an action inside Personal Packing.

**Shared state:** Suggestion → Shared → Suggested Quantity → Add → Unassigned → Claim/Admin Assign → Assigned/Claimed → Packed.

**Delta update:** Itinerary/weather change → `S06 Packing Delta` → user chooses Add/Keep/Remove/Skip → preserve earlier checklist and packed decisions.

## Unexpected change flow

Alert (`S01`, `S02` or `S03`) → limited user decision → replacement/impact preview when relevant (`S04` or `S05`) → recalculate affected route/times → return to `19 Itinerary Detail`.

The system explains important consequences but does not make the final choice.

## Mermaid flowchart

```mermaid
flowchart TD
    A[01 Splash] -->|After about 2 seconds| B[02 Log In]
    B --> C[04 My Trips]
    B --> D[03 Sign Up]
    D --> C
    B --> E[37 Forgot Password]
    E --> B
    C --> P[35 Profile Settings]
    P --> PE[36 Edit Profile]
    PE --> P

    C --> T1[05 Trip Name]
    T1 --> T2[06 Solo or Group]
    T2 -->|Solo| SD[08 Trip Dates]
    T2 -->|Group| GI[07 Group Invite]
    GI -->|Invite or Skip| GD[08 Trip Dates]

    SD --> SW[09 Solo Waiting List]
    SW --> SF[13 Solo Final Review]
    SF --> IP[15 Itinerary Planning]

    GD --> GW[10 Shared Waiting List]
    GW --> GR[11 Group Preference]
    GR --> RR[12 Review Results]
    RR --> GF[14 Group Final Review]
    GF -->|Request to Include| RQI[S07 Request to Include]
    RQI --> GF
    GF --> IP
    GF -.->|Confirmation feedback| CS[S08 Confirmation Success]
    CS -.-> IP

    IP --> RP[16 Route Preview]
    RP --> IP
    IP -->|Solo| DS[17 Solo Dashboard]
    IP -->|Group| DG[18 Group Dashboard]

    DS --> ID[19 Itinerary Detail]
    DG --> ID
    ID --> RP
    ID --> ED[20 Edit Day]
    ED --> ID

    DS --> SPS[21 Smart Packing Solo]
    DG --> SPG[22 Smart Packing Group]
    SPS --> AIS[23 AI Packing Suggestions]
    SPG --> AIS
    AIS -->|Add Personal| PP[24 Personal Packing]
    AIS -->|Add Shared, Group only| SH[25 Shared Packing]
    PP --> OP[26 Outfit Planning optional]
    SPS --> PR[27 Packing Reminders]
    SPG --> PR
    SPG --> SH

    DS --> BO[28 Budget Overview]
    DG --> BO
    BO -->|Solo| AES[29 Add Expense Solo]
    BO -->|Group| AEG[30 Add Expense Group]
    AES --> BO
    AEG --> BO

    DG --> TG[31 Travel Group]
    TG --> MM[32 Manage Members]
    MM --> UP[33 Update Participation]
    UP -->|Shared items uncovered| RI[34 Reassign Shared Items]
    RI --> TG
```

## Mermaid subflows

```mermaid
flowchart LR
    A[AI Suggestions] --> B{User decision}
    B -->|Add| C[Checklist]
    B -->|Skip| D[Suppress unless context changes]
    E[Shared suggestion] --> F[Set suggested quantity]
    F --> G[Add as Unassigned]
    G --> H[Claim or Admin Assign]
    H --> I[Assigned or Claimed]
    I --> J[Packed]
```

```mermaid
flowchart LR
    A[Alert] --> B[Explain important impact]
    B --> C{User decision}
    C --> D[Optional replacement or impact preview]
    D --> E[Recalculate affected segment]
    E --> F[Return to itinerary]
```

## Asynchronous Group rule

Members may add and rate at different times. New places can become Unrated after some members have already finished. `Done for now` is not a permanent lock; Review Results shows participation so the Admin can decide when to continue.
