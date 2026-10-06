# CLAUDE.md

Hinweise für Claude Code bei der Arbeit an diesem Repo.

## Projekt

Custom-CSS-Theme für den Jellyfin-Web-Client (10.9+) im Apple-TV-/tvOS-Stil.
Reines CSS, kein Build-Schritt. Wird in Jellyfin per `@import` eingebunden.

## Regeln

- Kommentare und Dokumentation auf Deutsch.
- Alles Theme-CSS liegt in `theme/apple-tv.css`, gegliedert in nummerierte
  Abschnitte. Neue Regeln in den passenden Abschnitt einsortieren.
- Farben, Radien, Schatten und Animationen nur über die `--tv-*`-Variablen in
  Abschnitt 2 – keine neuen festen Werte, wenn eine Variable passt.
- Keine externen Ressourcen (Fonts, Bilder, CDNs) einbinden. Assets kommen ins
  Repo und werden relativ zur CSS-Datei geladen.
- `!important` nur, wenn Jellyfins eigene Styles sonst gewinnen.
- Bewegungseffekte immer auch im `prefers-reduced-motion`-Block abschalten.
- Touch-Geräte (`@media (hover: none)`) und `.layout-mobile` / `.layout-tv`
  mitdenken.

## Jellyfin-Selektoren (Auswahl)

| Bereich | Klassen |
|---|---|
| Kopfzeile / Tabs | `.skinHeader`, `.headerTabs`, `.emby-tabs-slider`, `.emby-tab-button`, `.emby-tab-button-active` |
| Drawer | `.mainDrawer`, `.navMenuOption`, `.navMenuOption-selected` |
| Karten | `.card`, `.cardBox`, `.cardScalable`, `.cardImageContainer`, `.cardOverlayContainer`, `.cardText`, `.itemProgressBar` |
| Detailseite | `.itemBackdrop`, `.detailRibbon`, `.detailPagePrimaryContainer`, `.mainDetailButtons`, `.detailButton`, `.btnPlay`, `.btnResume` |
| Formulare | `.emby-input`, `.emby-select-withcolor`, `.emby-checkbox`, `.checkboxOutline` |
| Dialoge | `.dialog`, `.dialog-fullscreen`, `.actionSheet`, `.formDialogHeader`, `.toast` |
| Player | `.osdHeader`, `.videoOsdBottom`, `.mdl-slider`, `.sliderBubble` |
| Layout | `html.layout-desktop`, `html.layout-mobile`, `html.layout-tv` |

Klassennamen im Zweifel im echten Jellyfin mit den DevTools prüfen; Quelle:
https://github.com/jellyfin/jellyfin-web

## Testen

1. `preview/index.html` im Browser öffnen (schneller Sichttest).
2. Im echten Jellyfin: CSS ins Dashboard-Feld kopieren oder per lokalem
   Webserver einbinden und Startseite, Detailseite, Player, Einstellungen und
   Dialoge durchklicken – auf Desktop und Mobil.

## Versionierung

Semantic Versioning über Git-Tags (`v1.0.0`). Version auch im Kopfkommentar
von `theme/apple-tv.css` anpassen.

## Ideen für später

- Detail-Logo (`.detailLogo`) unten links statt oben rechts platzieren
- Hero-Banner auf der Startseite (braucht JS, z. B. JavaScript-Injector-Plugin)
- Optionale Hell-Variante über eine zweite Datei mit überschriebenen Variablen
