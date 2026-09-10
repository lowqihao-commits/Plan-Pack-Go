# Plan Pack Go frontend prototype

Mobile-first React and Vite prototype for the approved Plan Pack Go flow.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The primary review viewport is `390 × 844`.

For quick access to the prototype, use ‘Continue with Google’ on the login screen. No admin credentials are required.

## Prototype scope

The interactive prototype includes Solo and Group trip creation, preferences, itinerary planning, Smart Packing, outfit planning, cost tracking, group management, profile settings, and lightweight plan adjustments.

Trip data and outfit photos are retained in memory during the current session, including when switching trips. Reloading resets the demonstration data. Authentication and recommendations do not use production services.

## Deployment settings

- Root directory: `prototype`
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

Navigation uses hash routes. Refreshing a deployed URL loads the app without a history-route rewrite; session-only trip routes return safely to My Trips after reload.
