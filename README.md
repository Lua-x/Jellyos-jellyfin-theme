# Jellyfin tvOS Theme

Ein Custom-CSS-Theme für den Jellyfin-Web-Client im Stil von Apple TV (tvOS):
schwarzer Hintergrund, zentrierte Glas-Tab-Leiste, abgerundete Karten mit
Fokus-Zoom und Lichtreflex, weiße Pill-Buttons und weiche Verläufe auf der
Detailseite.

- Reines CSS – kein Plugin, kein JavaScript nötig
- Schrift (Inter) liegt im Repo, keine Google-Fonts-Anfragen
- Auf Apple-Geräten wird automatisch SF Pro genutzt
- Desktop-, Mobil- und TV-Layout von Jellyfin werden berücksichtigt
- Respektiert „Bewegung reduzieren“

Ziel: **Jellyfin 10.9 und neuer** (Web-Client, auch in Jellyfin Media Player
und den Apps, die den Web-Client nutzen).

## Installation

Jellyfin → **Dashboard → Allgemein → Benutzerdefinierter CSS-Code** und
eine der folgenden Varianten eintragen, dann speichern und die Seite neu laden.

### Variante A: über jsDelivr (am einfachsten)

```css
@import url("https://cdn.jsdelivr.net/gh/<github-user>/jellyfin-tvos-theme@main/theme/apple-tv.css");
```

Für eine feste Version statt `@main` einen Tag verwenden, z. B. `@v1.0.0`.

### Variante B: selbst gehostet (ohne Drittanbieter)

Den Ordner `theme/` **und** `fonts/` auf einen eigenen Webserver legen
(z. B. nginx im Homelab), sodass die Struktur erhalten bleibt:

```
https://dein-server/jellyfin-theme/theme/apple-tv.css
https://dein-server/jellyfin-theme/fonts/inter-latin-wght-normal.woff2
```

```css
@import url("https://dein-server/jellyfin-theme/theme/apple-tv.css");
```

Die Schrift wird relativ zur CSS-Datei geladen. Bei einem anderen Host als
Jellyfin muss der Webserver CORS für Schriften erlauben
(`Access-Control-Allow-Origin`).

## Anpassen

Alle Farben, Radien und Effekte stehen als Variablen am Anfang der Datei.
Eigene Werte einfach **unter** dem `@import` im Jellyfin-Feld überschreiben:

```css
@import url("…/apple-tv.css");

:root {
    --tv-tint: #30d158;        /* Akzentfarbe (z. B. Grün) */
    --tv-radius-card: 18px;    /* runder */
    --tv-focus-scale: 1.05;    /* dezenterer Zoom */
}
```

| Variable | Bedeutung |
|---|---|
| `--tv-bg` | Seitenhintergrund |
| `--tv-glass`, `--tv-glass-strong` | Glas-Flächen (Tabs, Drawer, Dialoge) |
| `--tv-text`, `--tv-text-2` | Primär- / Sekundärtext |
| `--tv-primary`, `--tv-on-primary` | Primär-Button und dessen Textfarbe |
| `--tv-tint` | Akzent (Links, Checkboxen) |
| `--tv-radius-card` | Eckenradius der Karten |
| `--tv-focus-scale` | Zoom bei Fokus/Hover |

## Empfohlene Jellyfin-Einstellungen

Für den Apple-TV-Look unter **Einstellungen → Startseite** bei den Reihen
„Weiterschauen“ und „Zuletzt hinzugefügt“ Querformat-Bilder (Thumbs)
verwenden. Unter **Einstellungen → Anzeige** die Hintergründe (Backdrops)
aktivieren.

## Vorschau ohne Server

`preview/index.html` ahmt die Jellyfin-Startseite mit denselben CSS-Klassen
nach. Einfach im Browser öffnen, um Änderungen schnell zu prüfen. Das ersetzt
keinen Test im echten Jellyfin, da die Vorschau nur einen Teil der Oberfläche
abbildet.

## Aufbau

```
theme/apple-tv.css   Das Theme (eine Datei, in Abschnitte gegliedert)
fonts/               Inter (variabel, latin) + Lizenz (SIL OFL 1.1)
preview/index.html   Statische Vorschau mit Jellyfin-Klassen
CLAUDE.md            Hinweise für die Weiterentwicklung mit Claude Code
```

## Bekannte Grenzen

- Jellyfin ändert Klassennamen gelegentlich zwischen Versionen. Wenn nach
  einem Update etwas nicht greift, mit den Entwicklertools (F12) die aktuelle
  Klasse prüfen.
- Ein „Top Shelf“-Hero-Banner wie auf dem Apple TV ist mit reinem CSS nicht
  möglich; dafür bräuchte es JavaScript (z. B. über ein Plugin).

## Lizenz

Theme: MIT (siehe `LICENSE`).
Schrift Inter: SIL Open Font License 1.1 (siehe `fonts/OFL.txt`).
Nicht mit Apple verbunden; „Apple TV“ und „tvOS“ sind Marken von Apple Inc.
