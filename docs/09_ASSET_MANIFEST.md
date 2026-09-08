# Plan Pack Go — Asset Manifest

## Asset policy

The package contains copies for handoff; original iCloud assets were not modified. Do not regenerate assets. Prefer transparent Stitch-ready files where approved. Original pose images remain references when a clean transparent production cutout is unavailable.

All packaged paths are relative to `Plan-Pack-Go/`.

## Logo and app icon

| Asset | Packaged path | Format / background | Intended usage | Status | Replacement required? |
|---|---|---|---|---|---|
| Full logo reference | `assets/logo/plan-pack-go-logo-original.png` | PNG, 1254×1254, opaque Cream square/background | Authoritative logo composition and colour reference; Splash and compact brand mark recreation | **APPROVED as reference** | Clean standalone transparent/vector export is **MISSING / TODO**; do not use rejected halo cutouts |
| App icon | — | — | Launcher/app icon | **MISSING / TODO** | Yes, only if later prototype/delivery requires it; do not invent now |

The Cream square and surrounding oval shadow in the original logo image are not part of the standalone logo mark. Preserve the location pin/landscape, suitcase, dotted route, checkmark and full `Plan Pack Go` wordmark.

## Mascot assets

| Asset / role | Packaged filename | Format / background | Intended usage | Status | Replacement required? |
|---|---|---|---|---|---|
| Authoritative mascot identity | `assets/mascot/mascot-master-transparent.png` | PNG, transparent | Primary identity reference; neutral placement | **APPROVED** | No |
| Original base/backpack pose | `assets/mascot/背包.png` | PNG, opaque Cream scene | Original reference for backpack/scarf details | **APPROVED as reference** | Use transparent master for production placement |
| Itinerary analysis | `assets/mascot/mascot-map-transparent.png` | PNG, transparent | Small owl studying folded map | **APPROVED** | No |
| Original itinerary analysis | `assets/mascot/navigate.png` | PNG, opaque Cream scene | Pose/prop reference | **APPROVED as reference** | Transparent version already available |
| Packing pose | `assets/mascot/packing.png` | PNG, opaque Cream scene | Pose/prop reference for packing-a-suitcase state | **APPROVED as reference** | Clean transparent production cutout **MISSING / TODO** |
| Loading / trip-ready flight pose | `assets/mascot/letsgo.png` | PNG, opaque scene with clouds/plane/route/pin | Splash/loading/trip-ready pose reference only | **APPROVED as reference** | Clean transparent production cutout **MISSING / TODO** |
| Warning | `assets/mascot/mascot-warning-transparent.png` | PNG, transparent | Calm shared-item or itinerary warning | **APPROVED** | No |
| Original warning | `assets/mascot/alert.png` | PNG, opaque Cream scene | Pose/sign reference | **APPROVED as reference** | Transparent version already available |
| Packing completed | `assets/mascot/mascot-packing-complete-transparent.png` | PNG, transparent | Sitting on closed suitcase/check state | **APPROVED** | No |
| Original packing completed | `assets/mascot/packingdone.png` | PNG, opaque Cream scene | Pose/prop reference | **APPROVED as reference** | Transparent version already available |
| Attachment guide | `assets/mascot/ATTACHMENT-GUIDE.md` | Markdown | Explains Stitch reference roles and exclusions | **APPROVED reference** | No |

For `letsgo.png`, the clouds, plane, dotted route, map pin, landscape and background are not part of the mascot. They must not be copied as fixed mascot anatomy. A new short route may be composed in the UI.

## Supporting references

| File | Path | Purpose | Status |
|---|---|---|---|
| Screen inventory v1 | `assets/references/screen-inventory-v1.md` | Earlier conceptual inventory and rules | Reference only; `docs/03_SCREEN_INVENTORY.md` controls production numbering |
| Stitch prompt pack | `assets/references/stitch-prompt-pack.md` | Low-Fi generation and conversion history | Approved production reference; not an implementation spec |

## External read-only project references

These remain under the local ChatGPT project `sources/` and were not duplicated into the package because of their size:

- `CodeNection 2026 Handbook (1).pdf`
- `FAQ CodeNection 2026.pdf`
- `Kick-off Day Slides CN26.pdf`
- `TNC CodeNection 2026 .pdf`

## Missing / TODO assets

1. Transparent or vector standalone logo suitable for direct production placement.
2. App icon, if later required.
3. Clean transparent packing-suitcase pose.
4. Clean transparent flying/loading/trip-ready pose.

Do not generate these until explicitly approved.
