# Plan Pack Go — Asset Manifest

## Asset policy

The package contains approved raster assets and exact runtime copies; original source assets were not modified. Do not regenerate, redraw, reinterpret, vectorize or replace them during visual polish. Prefer the existing transparent files for runtime placement. Original opaque pose images remain reference-only where no transparent runtime pose exists.

All packaged paths are relative to `Plan-Pack-Go/`.

## Logo and app icon

| Asset | Packaged path | Format / background | Intended usage | Status | Replacement required? |
|---|---|---|---|---|---|
| Full logo | `assets/logo/plan-pack-go-logo-original.png` | PNG, 1254×1254, opaque Cream square/background | Authoritative logo and final prototype source; copied unchanged to `prototype/public/assets/plan-pack-go-logo.png` | **APPROVED** | No |
| App icon | — | — | Launcher/app icon | **OUT OF SCOPE** | Do not invent during visual polish |

The Cream square and surrounding oval shadow in the original logo image are not part of the standalone logo mark. Preserve the location pin/landscape, suitcase, dotted route, checkmark and full `Plan Pack Go` wordmark.

## Mascot assets

| Asset / role | Packaged filename | Format / background | Intended usage | Status | Replacement required? |
|---|---|---|---|---|---|
| Authoritative mascot identity | `assets/mascot/mascot-master-transparent.png` | PNG, transparent | Primary identity reference; neutral placement | **APPROVED** | No |
| Original base/backpack pose | `assets/mascot/背包.png` | PNG, opaque Cream scene | Original reference for backpack/scarf details | **APPROVED as reference** | Use transparent master for production placement |
| Itinerary analysis | `assets/mascot/mascot-map-transparent.png` | PNG, transparent | Small owl studying folded map | **APPROVED** | No |
| Original itinerary analysis | `assets/mascot/navigate.png` | PNG, opaque Cream scene | Pose/prop reference | **APPROVED as reference** | Transparent version already available |
| Packing pose | `assets/mascot/packing.png` | PNG, opaque Cream scene | Pose/prop reference for packing-a-suitcase state | **APPROVED as reference** | No replacement during visual polish |
| Loading / trip-ready flight pose | `assets/mascot/letsgo.png` | PNG, opaque scene with clouds/plane/route/pin | Splash/loading/trip-ready pose reference only | **APPROVED as reference** | No replacement during visual polish |
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

## Runtime asset mapping

| Runtime path | Approved source | Current use |
|---|---|---|
| `prototype/public/assets/plan-pack-go-logo.png` | `assets/logo/plan-pack-go-logo-original.png` | Splash and compact brand mark |
| `prototype/public/assets/mascot-master-transparent.png` | `assets/mascot/mascot-master-transparent.png` | Splash/loading brand moment |
| `prototype/public/assets/mascot-map-transparent.png` | `assets/mascot/mascot-map-transparent.png` | Smart Packing analysis |
| `prototype/public/assets/mascot-warning-transparent.png` | `assets/mascot/mascot-warning-transparent.png` | Shared Packing warning |
| `prototype/public/assets/mascot-packing-complete-transparent.png` | `assets/mascot/mascot-packing-complete-transparent.png` | Packing completion |

These runtime files are byte-for-byte copies of the approved source assets. Other opaque mascot images remain approved references and are not loaded by the current application. A transparent/vector logo, app icon, and additional transparent poses are possible future asset variants only; they are not required for the final prototype and must not be generated during Bolt visual polish.
