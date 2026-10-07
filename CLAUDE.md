# CLAUDE.md

Notes for Claude Code when working on this repo.

## Project

Jellyos (https://github.com/Lua-x/Jellyos-jellyfin-theme):
Custom CSS theme for the Jellyfin web client (10.9+, standard layout) in the
Apple TV / tvOS 26 style with Liquid Glass. Pure CSS, no build step.
Included in Jellyfin via `@import`.

## Rules

- Comments and documentation in English.
- All theme CSS lives in `theme/apple-tv.css`, split into 15 numbered
  sections (overview in the header comment). Put new rules in the matching
  section.
- Colors, radii, shadows, glass and animations only via the `--tv-*` and
  `--lg-*` variables in section 2 – no new hard-coded values if a variable
  fits.
- Don't include external resources (fonts, images, CDNs). Assets go into the
  repo and are loaded relative to the CSS file.
- Use `!important` only when Jellyfin's own styles would win otherwise.
- Always disable motion effects in the `prefers-reduced-motion` block too.
- Keep touch devices (`@media (hover: none)`) and `.layout-mobile` /
  `.layout-tv` in mind.
- Use `em` for sizes inside cards so they scale with every resolution.

## Liquid Glass – rules

- Add new glass elements to the selector groups in section 3: "Glass" for
  small controls, "Glass panels" for surfaces with a lot of text. Don't
  rebuild the material per element.
- **Backdrop root trap:** If an ancestor of a glass element has `filter`,
  `opacity < 1`, `mask`, `clip-path`, `mix-blend-mode` or its own
  `backdrop-filter`, the glass only sees that ancestor instead of the page.
  That's why `.skinHeader` has no blur of its own; the scroll edge lives in
  the pseudo-element `.skinHeader::before`.
- No `backdrop-filter` on elements that appear hundreds of times (cards,
  indicators) – too expensive while scrolling. Exception: the hover overlay
  buttons, which only exist on the hovered card.
- No blur over playing video except for the OSD controls.
- No outer shadow on elements that are moved out of view with `transform`
  (drawer, music bar) – the shadow would peek out at the edge.
- Only set new easing functions using `linear()` inside the `@supports`
  block in section 15 (older engines, e.g. in Jellyfin Media Player).
- No `background` on `body` – it would cover Jellyfin's backdrop layer.

## Jellyfin selectors (selection)

| Area | Classes |
|---|---|
| Header / tabs | `.skinHeader`, `.headerButton`, `.headerTabs`, `.emby-tabs-slider`, `.emby-tab-button`, `.emby-tab-button-active` |
| Drawer | `.mainDrawer`, `.navMenuOption`, `.navMenuOption-selected` |
| Cards | `.card`, `.cardBox`, `.cardScalable`, `.cardImageContainer`, `.cardFooter`, `.cardText`, `.cardText-first`, `.cardText-secondary`, `.itemProgressBar` |
| Card overlay | `.cardOverlayContainer`, `.cardOverlayFab-primary` (center play), `.cardOverlayButton-br` (bottom right group), `.cardOverlayButton`, `.cardOverlayButtonIcon` |
| Detail page | `.itemBackdrop`, `.detailRibbon`, `.detailPagePrimaryContainer`, `.mainDetailButtons`, `.detailButton`, `.btnPlay`, `.btnResume` |
| Forms | `.emby-input`, `.emby-select-withcolor`, `.emby-checkbox`, `.checkboxOutline`, `.searchfields-txtSearch` |
| Dialogs | `.dialog`, `.dialog-fullscreen`, `.actionSheet`, `.actionSheetMenuItem`, `.formDialogHeader`, `.formDialogFooter`, `.toast` |
| Player | `.skinHeader.osdHeader`, `.videoOsdBottom`, `.osdControls`, `.mdl-slider`, `.sliderBubble`, `.upNextDialog` |
| Music | `.nowPlayingBar` |
| Layout | `html.layout-desktop`, `html.layout-mobile`, `html.layout-tv` |

When in doubt, check class names in a real Jellyfin with the DevTools; source:
https://github.com/jellyfin/jellyfin-web (cards: `src/components/cardbuilder/`).

## Testing

1. Open the preview pages in a browser: `preview/index.html`,
   `preview/detail.html`, `preview/player.html`. They use the same classes as
   Jellyfin; `preview/preview.css` only recreates the layout, the look comes
   exclusively from the theme.
2. For card changes, also test against Jellyfin's real card CSS: compile
   `src/components/cardbuilder/card.scss` from jellyfin-web with Sass and load
   it before the theme – the preview does not reproduce every Jellyfin rule.
3. For visual checks, render screenshots with Playwright (desktop 1440×900
   and mobile 390×844 with `html.layout-mobile`), simulate hover on a card
   and check the light sweep across several frames.
4. In a real Jellyfin: include the CSS and click through home, detail page,
   player, settings and dialogs – on desktop and mobile.
5. Update the README screenshots in `preview/screenshots/` as WebP when the
   look changes noticeably.

## Versioning

Semantic Versioning via Git tags (`v1.1.2`). Also update the version in the
header comment of `theme/apple-tv.css` and in the jsDelivr link in the
README. jsDelivr only serves a version once its tag exists on GitHub.

## Ideas for later

- Real refraction via SVG filters (`feDisplacementMap`), injected with
  JavaScript – Chromium only, so optional as a separate file
- Hero banner on the home page (needs JS, e.g. JavaScript Injector plugin)
- Place the detail logo (`.detailLogo`) at the bottom left instead of the
  top right
- Optional light variant via a second file with overridden variables
