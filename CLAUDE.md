# CLAUDE.md

Hinweise für Claude Code bei der Arbeit an diesem Repo.

## Projekt

Jellyos (https://github.com/Lua-x/Jellyos-jellyfin-theme):
Custom-CSS-Theme für den Jellyfin-Web-Client (10.9+, Standard-Layout) im
Apple-TV-/tvOS-26-Stil mit Liquid Glass. Reines CSS, kein Build-Schritt.
Wird in Jellyfin per `@import` eingebunden.

## Regeln

- Kommentare und Dokumentation auf Deutsch.
- Alles Theme-CSS liegt in `theme/apple-tv.css`, gegliedert in 15
  nummerierte Abschnitte (Übersicht im Kopfkommentar). Neue Regeln in den
  passenden Abschnitt einsortieren.
- Farben, Radien, Schatten, Glas und Animationen nur über die `--tv-*`- und
  `--lg-*`-Variablen in Abschnitt 2 – keine neuen festen Werte, wenn eine
  Variable passt.
- Keine externen Ressourcen (Fonts, Bilder, CDNs) einbinden. Assets kommen ins
  Repo und werden relativ zur CSS-Datei geladen.
- `!important` nur, wenn Jellyfins eigene Styles sonst gewinnen.
- Bewegungseffekte immer auch im `prefers-reduced-motion`-Block abschalten.
- Touch-Geräte (`@media (hover: none)`) und `.layout-mobile` / `.layout-tv`
  mitdenken.

## Liquid Glass – Regeln

- Neue Glas-Elemente in die Selektor-Gruppen in Abschnitt 3 aufnehmen:
  „Glas“ für kleine Bedienelemente, „Glas-Panels“ für Flächen mit viel Text.
  Material nicht pro Element neu zusammenbauen.
- **Backdrop-Root-Falle:** Hat ein Vorfahr eines Glas-Elements `filter`,
  `opacity < 1`, `mask`, `clip-path`, `mix-blend-mode` oder selbst
  `backdrop-filter`, sieht das Glas nur noch diesen Vorfahren statt der Seite.
  Deshalb hat `.skinHeader` keinen eigenen Blur; die Scroll-Kante liegt im
  Pseudo-Element `.skinHeader::before`.
- Kein `backdrop-filter` auf Elementen, die hundertfach vorkommen (Karten,
  Indikatoren) – kostet zu viel Leistung beim Scrollen.
- Kein Blur über laufendem Video außer der OSD-Steuerung.
- Kein Außenschatten auf Elementen, die per `transform` aus dem Bild geschoben
  werden (Drawer, Musikleiste) – der Schatten blitzt sonst am Rand hervor.
- Neue Easing-Funktionen mit `linear()` nur innerhalb des `@supports`-Blocks
  in Abschnitt 15 setzen (ältere Engines, z. B. in Jellyfin Media Player).
- Kein `background` auf `body` – würde Jellyfins Backdrop-Ebene verdecken.

## Jellyfin-Selektoren (Auswahl)

| Bereich | Klassen |
|---|---|
| Kopfzeile / Tabs | `.skinHeader`, `.headerButton`, `.headerTabs`, `.emby-tabs-slider`, `.emby-tab-button`, `.emby-tab-button-active` |
| Drawer | `.mainDrawer`, `.navMenuOption`, `.navMenuOption-selected` |
| Karten | `.card`, `.cardBox`, `.cardScalable`, `.cardImageContainer`, `.cardOverlayContainer`, `.cardOverlayButton`, `.cardFooter`, `.cardText`, `.itemProgressBar` |
| Detailseite | `.itemBackdrop`, `.detailRibbon`, `.detailPagePrimaryContainer`, `.mainDetailButtons`, `.detailButton`, `.btnPlay`, `.btnResume` |
| Formulare | `.emby-input`, `.emby-select-withcolor`, `.emby-checkbox`, `.checkboxOutline`, `.searchfields-txtSearch` |
| Dialoge | `.dialog`, `.dialog-fullscreen`, `.actionSheet`, `.actionSheetMenuItem`, `.formDialogHeader`, `.formDialogFooter`, `.toast` |
| Player | `.skinHeader.osdHeader`, `.videoOsdBottom`, `.osdControls`, `.mdl-slider`, `.sliderBubble`, `.upNextDialog` |
| Musik | `.nowPlayingBar` |
| Layout | `html.layout-desktop`, `html.layout-mobile`, `html.layout-tv` |

Klassennamen im Zweifel im echten Jellyfin mit den DevTools prüfen; Quelle:
https://github.com/jellyfin/jellyfin-web

## Testen

1. Vorschau-Seiten im Browser öffnen: `preview/index.html`,
   `preview/detail.html`, `preview/player.html`. Sie nutzen dieselben Klassen
   wie Jellyfin; `preview/preview.css` bildet nur das Layout nach, das
   Aussehen kommt ausschließlich aus dem Theme.
2. Für visuelle Prüfung Screenshots per Playwright rendern (Desktop 1440×900
   und Mobil 390×844 mit `html.layout-mobile`), Hover auf eine Karte
   simulieren und den Lichtstreif über mehrere Frames prüfen.
3. Im echten Jellyfin: CSS einbinden und Startseite, Detailseite, Player,
   Einstellungen und Dialoge durchklicken – auf Desktop und Mobil.
4. README-Screenshots in `preview/screenshots/` als WebP aktualisieren, wenn
   sich die Optik deutlich ändert.

## Versionierung

Semantic Versioning über Git-Tags (`v1.1.0`). Version auch im Kopfkommentar
von `theme/apple-tv.css` und im jsDelivr-Link in der README anpassen.

## Ideen für später

- Echte Lichtbrechung über SVG-Filter (`feDisplacementMap`), per JavaScript
  eingefügt – nur Chromium, daher optional als eigene Datei
- Hero-Banner auf der Startseite (braucht JS, z. B. JavaScript-Injector-Plugin)
- Detail-Logo (`.detailLogo`) unten links statt oben rechts platzieren
- Optionale Hell-Variante über eine zweite Datei mit überschriebenen Variablen
