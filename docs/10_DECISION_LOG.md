# Plan Pack Go — Decision Log

This log preserves iteration evidence. Sequence is thematic/relative because exact meeting dates were not recorded in the handoff source.

| Sequence | Decision | Alternatives considered | Reason | Trade-off | Final status |
|---:|---|---|---|---|---|
| 01 | Pursue a Travel Planner concept | Stress & Workload Manager | Travel context offered a clearer end-to-end journey and space for a distinctive packing problem | Broader travel domain requires careful scope control | **LOCKED / APPROVED** |
| 02 | Smart Packing & Luggage Coordination is the core differentiator | Generic trip planner; generic AI packing list | Connects itinerary decisions to an unresolved traveller task and supports Group coordination | Requires explainable, context-aware mock logic | **LOCKED / APPROVED** |
| 03 | Generic AI packing list rejected as insufficiently novel | Standalone packing generator | A generic list ignores actual itinerary events, quantities and responsibility | More dependency on itinerary data | **REJECTED** |
| 04 | Adopt itinerary/activity-level packing reasoning | Broad destination-only recommendations | Provides clear `Why suggested?` and supports meaningful delta changes | Prototype data must remain coherent across modules | **LOCKED / APPROVED** |
| 05 | Mobile-first experience | Desktop/web-first | In-trip navigation, quick changes, notifications, packing and Group coordination occur on mobile | Prototype uses mobile-sized web UI rather than native production build | **LOCKED / APPROVED** |
| 06 | Choose the name `Plan Pack Go` | Other working names | Communicates the three-part product journey directly | Full name must remain legible; no abbreviations | **LOCKED / APPROVED** |
| 07 | Use current pastel palette | Earlier teal/blue/orange direction | Teal/Mint/Coral/Cream feels warm, youthful and travel-friendly without looking AI-tech-heavy | Coral must be limited and accessible | **LOCKED / APPROVED** |
| 08 | Choose a glasses-wearing owl mascot | Purely abstract AI graphic; mascot on every screen | Owl communicates smart/helpful character and supports meaningful states | Risk of childishness/visual noise, so usage is limited | **LOCKED / APPROVED with usage constraints** |
| 09 | Skip onboarding | Multi-page onboarding | Main value can be shown through the product flow; onboarding adds screens and friction | New users receive less upfront explanation | **LOCKED / APPROVED for current prototype** |
| 10 | Use simple authentication | Extensive profile/preferences setup | Keeps entry concise and avoids irrelevant data collection | Real auth/security is not demonstrated | **LOCKED / APPROVED** |
| 11 | Simplify trip setup | Full wizard for destination, transport, accommodation and preferences | Fast path to the differentiating planning work | Some context is collected later rather than upfront | **LOCKED / APPROVED** |
| 12 | Remove destination from setup | Required city/destination field | Waiting List places may span cities/regions; destination-first would constrain the trip | Search results must display location clearly | **LOCKED / APPROVED** |
| 13 | Collect places through Places to Visit / Waiting List | Generate itinerary immediately; map-first selection | Supports gradual Solo or shared idea collection before commitment | Adds a review step | **LOCKED / APPROVED** |
| 14 | Branch explicitly into Solo and Group | One combined flow with disabled Group controls | Prevents irrelevant controls and makes behaviour predictable | Some variant frames are needed | **LOCKED / APPROVED** |
| 15 | Use asynchronous, public 0–10 Group ratings | Synchronous meeting; private ratings; binary votes only | Members can contribute at different times and understand the basis of results | Social pressure is possible; privacy is intentionally limited for place preferences | **LOCKED / APPROVED** |
| 16 | Normalize Group result as percentage | Raw totals only; opaque AI rank | Easier to compare when participation varies; public and explainable | Must show participation to avoid false confidence | **LOCKED / APPROVED** |
| 17 | Confirm Final Places before itinerary optimization | Auto-generate directly from ratings | Keeps users in control and prevents optimizing unwanted places | One extra confirmation stage | **LOCKED / APPROVED** |
| 18 | Day-based itinerary with Overnight Stay anchor on continuing days | Single continuous route; accommodation setup before place selection | Makes multi-day timing/packing context explicit while keeping setup flexible | Users may leave stay as `Not decided yet`; the final departure day uses `Return home` / `Trip ends` and needs no accommodation | **LOCKED / APPROVED** |
| 19 | Budget is lightweight cost tracking | Budget-limit planner, remaining budget and forecast | Records trip cost without distracting from the core differentiator | No spending-goal coaching | **LOCKED / APPROVED** |
| 20 | No overall budget limit | Spending cap / over-budget warning | Avoids an unapproved financial-planning system | Cannot demonstrate limit alerts | **REJECTED from MVP** |
| 21 | No dedicated food forecasting/category | Meal budget prediction | Food can be recorded as Other/Custom; avoids false precision | Less category detail | **LOCKED / APPROVED simplification** |
| 22 | Equal split only for Group shared expenses | Custom percentage/unequal split/settlement optimizer | Sufficient to demonstrate shared cost recording | Real groups may need more flexible settlement | **LOCKED / APPROVED for MVP** |
| 23 | Keep member participation handling simple | Cross-module impact-review engine | Essential warning/reassignment covers the main risk without adding a control centre | Some downstream effects are simulated rather than exhaustively resolved | **LOCKED / APPROVED** |
| 24 | Use lightweight unexpected-change flows | Dedicated disruption-management module | Quick decisions and recalculation fit in-trip use | Does not handle emergencies or complex disruptions | **LOCKED / APPROVED** |
| 25 | Personal packing details remain private | Entire Group can inspect every member's checklist | Progress is useful, but item-level content is personal | Group cannot diagnose another member's exact omissions | **LOCKED / APPROVED** |
| 26 | Shared Packing uses `Unassigned → Assigned/Claimed → Packed` | Simple checkbox; auto-assignment | Makes responsibility and coverage visible | Adds a small state machine | **LOCKED / APPROVED** |
| 27 | AI suggestions require Add/Skip | Automatically insert all AI suggestions | Protects user agency and reduces checklist noise | More review interaction | **LOCKED / APPROVED** |
| 28 | Packing changes use delta updates | Regenerate/reset the whole list | Preserves trust, manual decisions and packed states | Requires comparison state in prototype | **LOCKED / APPROVED** |
| 29 | OOTD is optional | Required outfit wizard; standalone fashion feature | Can reduce clothing mismatch without changing product identity | May be omitted from the shortest demo path | **OPTIONAL** |
| 30 | Use milestone packing reminders | Item-by-item/hourly notifications | Timely and actionable without spam | Less granular control | **LOCKED / APPROVED** |
| 31 | Exclude chat | In-app Group chat | Preference, packing and expense states already express collaboration; chat would inflate scope | Users rely on external communication | **REJECTED from MVP** |
| 32 | Exclude currency settings | Default currency profile option | Not required for the fixed mock cost story and adds settings complexity | Prototype uses a fixed display denomination in mock data | **LOCKED / APPROVED exclusion** |
| 33 | Splash automatically continues to Log In | Get Started button | Short brand moment with lower entry friction | User cannot pause on Splash | **LOCKED / APPROVED** |
| 34 | Use Stitch → Figma workflow after local prototype | Design only in one tool | Stitch accelerates screen iteration; Figma supports normalization, review and prototype links | Requires disciplined naming and conversion checks | **LOCKED / APPROVED workflow** |
| 35 | Final departure day has no Overnight Stay when returning home | Require accommodation on every itinerary day | Avoids asking for an irrelevant stay after the trip has ended | Final-day route/timeline needs a distinct `Return home` / `Trip ends` endpoint | **LOCKED / APPROVED** |
| 36 | Show AI Suggestions explicitly on the Group Smart Packing hub | Hide entry inside another packing module | Keeps the core differentiator discoverable and matches the approved Group flow | Adds one more hub card/action while preserving the same module scope | **LOCKED / APPROVED** |
| 37 | Open Packing Reminders from both Smart Packing home screens | Link from Personal Packing or leave placement unspecified | Keeps reminder settings centralized and equally discoverable in Solo and Group | Uses a secondary settings row rather than another primary module | **LOCKED / APPROVED** |
| 38 | Use `Done for now` as the only rating-deferral action | Separate `Done for now` and `Review later` actions | Both actions represented the same intent and would create unnecessary ambiguity | `Review Results` remains the distinct forward action | **LOCKED / APPROVED** |
| 39 | Remove Forgot Password from the final prototype | Leave a disabled future control or add a recovery flow | Removes a visible dead control and keeps the frozen auth scope honest | Account recovery is not demonstrated | **LOCKED / APPROVED after final QA** |
| 40 | Use the current eligible trip roster for ratings and votes | Fixed five-person preference roster | Keeps participation, scores and majority voting consistent with actual group membership | Seeded Penang data remains an example only | **LOCKED / APPROVED after final QA** |
| 41 | Use Bolt only for visual polish after freezing the functional baseline | Allow visual tooling to alter behavior | Protects the QA-approved product while permitting presentation refinement | Bolt changes must remain on the dedicated working branch | **LOCKED / APPROVED workflow** |

## Unresolved decisions

- Exact High / Medium / Low Group preference thresholds.
- Mascot name.
- Final production form of a transparent/vector logo and whether an app icon is required.

React + Vite remains the approved prototype direction unless a later instruction explicitly changes it; it is not an open implementation choice.

## FUTURE / POST-MVP

Real service integrations and more sophisticated settlement, routing, realtime collaboration or notification engines are not approved features. They are infrastructure possibilities only and must not be treated as roadmap commitments.
