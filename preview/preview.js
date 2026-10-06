// Gemeinsame Helfer für die Vorschau-Seiten (Icons und Karten)

// Material-Icons (Apache-2.0), dieselben wie in Jellyfin
const ICONS = {
    arrow_back: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
    menu: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
    search: "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
    cast: "M21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2a9 9 0 0 1 9 9h2c0-6.08-4.93-11-11-11z",
    person: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    play_arrow: "M8 5v14l11-7z",
    pause: "M6 19h4V5H6v14zm8-14v14h4V5h-4z",
    check: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
    favorite_border: "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z",
    more_horiz: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
    playlist_add: "M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z",
    skip_previous: "M6 6h2v12H6zm3.5 6 8.5 6V6z",
    skip_next: "M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z",
    subtitles: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z",
    volume_up: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z",
    fullscreen: "M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
};

function icon(name) {
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[name]}"/></svg>`;
}

// Platzhalter <span data-icon="..."> durch SVG ersetzen
function iconsEinsetzen() {
    document.querySelectorAll("[data-icon]").forEach(el => {
        el.outerHTML = icon(el.dataset.icon);
    });
}

// Farbverläufe als Poster-Ersatz
const POSTER = [
    ["#1d3b6b", "#e2725b", "#ffd6a0"], ["#0f5132", "#9bd18b", "#e6ffd1"],
    ["#3a1c71", "#d76d77", "#ffd1dc"], ["#232526", "#c9a227", "#fff1b8"],
    ["#134e5e", "#71b280", "#d6fff0"], ["#41295a", "#8e44ad", "#f3d1ff"],
    ["#0b486b", "#f56217", "#ffe0c2"], ["#cb356b", "#3a1c71", "#ffd0e4"]
];

function posterBild(i) {
    const [a, b, c] = POSTER[i % POSTER.length];
    return `radial-gradient(circle at 70% 28%, ${c}aa, transparent 38%),
            linear-gradient(160deg, ${a}, ${b})`;
}

// Querformat-Bilder: die beiden Szenen, farblich variiert
function thumbBild(i) {
    const datei = i % 2 === 0 ? "assets/berge.svg" : "assets/weltraum.svg";
    return { bild: `url(${datei})`, filter: `hue-rotate(${(i * 47) % 360}deg)` };
}

/**
 * Erzeugt eine Karte mit denselben Klassen wie Jellyfin.
 * typ: "backdrop" | "portrait" | "square"
 */
function karte({ titel, info = "", typ = "portrait", index = 0, fortschritt = 0, gesehen = false }) {
    const kartenTyp = {
        backdrop: "overflowBackdropCard",
        portrait: "overflowPortraitCard",
        square: "overflowSquareCard"
    }[typ];

    let stil = `background:${posterBild(index)}`;
    if (typ === "backdrop") {
        const t = thumbBild(index);
        stil = `background-image:${t.bild};filter:${t.filter}`;
    }

    const balken = fortschritt
        ? `<div class="innerCardFooter"><div class="itemProgressBar">
               <div class="itemProgressBarForeground" style="width:${fortschritt}%"></div>
           </div></div>`
        : "";

    const haken = gesehen
        ? `<div class="playedIndicator">${icon("check")}</div>`
        : "";

    const overlay = typ === "square" ? "" : `
        <div class="cardOverlayContainer">
            <button class="cardOverlayButton" title="Abspielen">${icon("play_arrow")}</button>
            <button class="cardOverlayButton" title="Mehr">${icon("more_horiz")}</button>
        </div>`;

    return `
    <div class="card ${kartenTyp}" tabindex="0">
        <div class="cardBox cardBox-bottompadded">
            <div class="cardScalable">
                <div class="cardPadder cardPadder-${typ}"></div>
                <div class="cardImageContainer" style="${stil}"></div>
                ${haken}${balken}${overlay}
            </div>
            <div class="cardFooter">
                <div class="cardText cardText-first">${titel}</div>
                ${info ? `<div class="cardText">${info}</div>` : ""}
            </div>
        </div>
    </div>`;
}

function reihe(id, karten) {
    document.getElementById(id).innerHTML = karten.map(karte).join("");
}
