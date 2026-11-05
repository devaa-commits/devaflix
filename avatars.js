// Profile avatars: original illustrated villain portraits (no official artwork).
// To use your own picture instead, set `img: "assets/profiles/<file>"` on a profile in projects.js.
window.AVATARS = {
  madara: `<svg viewBox="0 0 100 100"><defs>
      <radialGradient id="mdBg" cx="50%" cy="38%" r="75%"><stop offset="0" stop-color="#7a0b12"/><stop offset=".6" stop-color="#2a0306"/><stop offset="1" stop-color="#0b0002"/></radialGradient>
      <radialGradient id="mdRin" r=".5"><stop offset="0" stop-color="#d9c2ff"/><stop offset="1" stop-color="#7b5bc4"/></radialGradient></defs>
    <rect width="100" height="100" fill="url(#mdBg)"/>
    <path d="M50 92c-16 0-26-8-29-22l-9 26h76l-9-26c-3 14-13 22-29 22z" fill="#1a1a1f"/>
    <path d="M4 98 10 62 2 66 12 38 2 38 20 18 18 4l16 10 8-12 8 10 10-10 2 12 18-6-8 14 16 2-12 10 12 12-12 0 8 20-6 6 4 24H4z" fill="#0d0d12"/>
    <path d="M32 42c0-13 8-21 18-21s18 8 18 21v12c0 13-8 21-18 21s-18-8-18-21z" fill="#ecdccb"/>
    <path d="M30 44c2-14 10-24 22-24 10 0 18 8 18 20-4-6-8-8-12-8l-4 8-4-8-6 8-2-8c-6 2-10 8-12 12z" fill="#0d0d12"/>
    <path d="M52 30c10 2 18 10 18 26l-4 22c0-14-2-24-8-28 0 10-4 14-8 16 2-10 2-22 2-36z" fill="#0d0d12"/>
    <path d="M34 46l11 2" stroke="#2a1a14" stroke-width="1.6" stroke-linecap="round"/><circle cx="41" cy="51" r="5.2" fill="#c1121f"/><circle cx="41" cy="51" r="1.6" fill="#000"/>
    ${[0, 120, 240].map(a => `<circle cx="${41 + 3.3 * Math.cos(a * Math.PI / 180)}" cy="${51 + 3.3 * Math.sin(a * Math.PI / 180)}" r="1" fill="#000"/>`).join("")}
    <circle cx="57" cy="51" r="5.2" fill="url(#mdRin)"/>${[1.3, 2.6, 3.9].map(r => `<circle cx="57" cy="51" r="${r}" fill="none" stroke="#3b2370" stroke-width=".7"/>`).join("")}
    <path d="M42 66c4 2 8 2 12 0" stroke="#7a4b3a" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>`,

  eren: `<svg viewBox="0 0 100 100"><defs>
      <linearGradient id="erBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d4a3c"/><stop offset=".55" stop-color="#1a201a"/><stop offset="1" stop-color="#0a0c0a"/></linearGradient>
      <radialGradient id="erGlow" r=".5"><stop offset="0" stop-color="#fff7b0"/><stop offset=".5" stop-color="#e6c229"/><stop offset="1" stop-color="#e6c22900"/></radialGradient></defs>
    <rect width="100" height="100" fill="url(#erBg)"/>
    ${[[18, 30, 14], [80, 26, 16], [30, 14, 10], [70, 10, 9], [50, 6, 11]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#cfd8cf" opacity=".18"/>`).join("")}
    <path d="M14 100c2-18 14-28 36-28s34 10 36 28z" fill="#2f2420"/>
    <path d="M32 42c0-16 8-24 18-24s18 8 18 24v12c0 12-7 20-18 20s-18-8-18-20z" fill="#5b4136"/>
    <path d="M30 46c-2-18 6-30 20-30s22 12 20 30c-3-8-6-14-10-16-4 4-14 4-20 0-4 2-8 8-10 16z" fill="#1d1410"/>
    <path d="M44 12c0-5 12-5 12 0s-12 5-12 0z" fill="#1d1410"/>
    <path d="M30 50c-2 10 0 22 6 28M70 50c2 10 0 22-6 28" stroke="#1d1410" stroke-width="3" fill="none"/>
    <circle cx="42" cy="47" r="7" fill="url(#erGlow)"/><circle cx="58" cy="47" r="7" fill="url(#erGlow)"/>
    <path d="M39 47h6M55 47h6" stroke="#fffbe0" stroke-width="2" stroke-linecap="round"/>
    <path d="M38 62h24" stroke="#e8dccd" stroke-width="5"/>${[40, 44, 48, 52, 56, 60].map(x => `<path d="M${x} 59.5v5" stroke="#5b4136" stroke-width=".8"/>`).join("")}
    <path d="M36 61c-2 3-6 4-8 3M64 61c2 3 6 4 8 3" stroke="#7a2e22" stroke-width="1.4" fill="none"/></svg>`,

  blackbeard: `<svg viewBox="0 0 100 100"><defs>
      <radialGradient id="bbBg" cx="50%" cy="45%" r="70%"><stop offset="0" stop-color="#3b1f4f"/><stop offset=".7" stop-color="#140a1d"/><stop offset="1" stop-color="#050208"/></radialGradient></defs>
    <rect width="100" height="100" fill="url(#bbBg)"/>
    ${[44, 36, 28].map((r, i) => `<path d="M${50 - r} 52a${r} ${r} 0 1 1 ${r * 1.6} ${r * .9}" stroke="#000" stroke-opacity=".75" stroke-width="${6 - i}" fill="none"/>`).join("")}
    <path d="M10 100c4-18 18-26 40-26s36 8 40 26z" fill="#e9e2d0"/><path d="M38 76l12 24 12-24" fill="#2b3a67"/>
    <ellipse cx="50" cy="50" rx="22" ry="24" fill="#c98f62"/>
    <path d="M26 46c0-16 10-24 24-24s24 8 24 24c-6-4-14-6-24-6s-18 2-24 6z" fill="#b5222b"/><path d="M70 36c8 0 12-4 14-8" stroke="#b5222b" stroke-width="4" stroke-linecap="round"/>
    <path d="M26 54c-4 18 8 32 24 32s28-14 24-32c-4 8-10 10-14 6-6 4-14 4-20 0-4 4-10 2-14-6z" fill="#120c0c"/>
    ${[[30, 70], [38, 78], [62, 78], [70, 70], [50, 82], [44, 74], [56, 74]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.5" fill="#1d1414"/>`).join("")}
    <path d="M37 60c6 6 20 6 26 0-2 6-8 9-13 9s-11-3-13-9z" fill="#8c1d1d"/>
    <path d="M38 60.5h24" stroke="#fff" stroke-width="3.2"/><path d="M42 59v3.4M47 59v3.4M54 59v3.4M58 59v3.4" stroke="#8c1d1d" stroke-width="1.6"/>
    <circle cx="42" cy="47" r="2.2" fill="#160d0d"/><circle cx="58" cy="47" r="2.2" fill="#160d0d"/>
    <path d="M37 42l9 2M63 42l-9 2" stroke="#120c0c" stroke-width="2.2" stroke-linecap="round"/></svg>`,

  loki: `<svg viewBox="0 0 100 100"><defs>
      <linearGradient id="lkBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1f6f3c"/><stop offset=".6" stop-color="#0c2e19"/><stop offset="1" stop-color="#03120a"/></linearGradient>
      <linearGradient id="lkGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a3"/><stop offset=".5" stop-color="#d4a017"/><stop offset="1" stop-color="#8a6508"/></linearGradient></defs>
    <rect width="100" height="100" fill="url(#lkBg)"/>
    <path d="M12 100c4-16 18-24 38-24s34 8 38 24z" fill="#14341f"/><path d="M36 76l14 14 14-14" fill="url(#lkGold)"/>
    <path d="M32 50c0-12 8-18 18-18s18 6 18 18v22c0 6-2 10-6 12l-2-20H40l-2 20c-4-2-6-6-6-12z" fill="#0b0b0b"/>
    <path d="M38 52c0-10 5-16 12-16s12 6 12 16v6c0 9-5 15-12 15s-12-6-12-15z" fill="#e8d6c4"/>
    <path d="M34 60c-2-16 2-28 16-30 14 2 18 14 16 30-3-10-6-16-8-17v10h-16V43c-2 1-5 7-8 17z" fill="url(#lkGold)"/>
    <path d="M38 34C30 26 22 12 30 2c-2 12 6 18 14 24zM62 34c8-8 16-22 8-32 2 12-6 18-14 24z" fill="url(#lkGold)"/>
    <path d="M38 64c-4 6-6 12-6 16M62 64c4 6 6 12 6 16" stroke="#111" stroke-width="3" fill="none"/>
    <path d="M44 55l4 1M56 55l-4 1" stroke="#1c3a26" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M45 66c3 2 7 2 10 0" stroke="#7a3d3d" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>`,

  ultron: `<svg viewBox="0 0 100 100"><defs>
      <radialGradient id="ulBg" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="#5a0f0f"/><stop offset=".6" stop-color="#1b0606"/><stop offset="1" stop-color="#050101"/></radialGradient>
      <linearGradient id="ulMetal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f2f4f7"/><stop offset=".45" stop-color="#9aa3ad"/><stop offset="1" stop-color="#3c434b"/></linearGradient>
      <radialGradient id="ulEye" r=".5"><stop offset="0" stop-color="#fff2c4"/><stop offset=".4" stop-color="#ff3b1f"/><stop offset="1" stop-color="#ff3b1f00"/></radialGradient></defs>
    <rect width="100" height="100" fill="url(#ulBg)"/>
    ${Array.from({ length: 6 }, (_, i) => `<path d="M0 ${20 + i * 14}h100" stroke="#ff3b1f" stroke-opacity=".06"/>`).join("")}
    <path d="M14 100c4-16 18-24 36-24s32 8 36 24z" fill="url(#ulMetal)"/><path d="M42 80h16l-2 20h-12z" fill="#2a2f35"/>
    <path d="M50 12c16 0 24 12 24 28 0 10-2 18-6 26l-8 10H40l-8-10c-4-8-6-16-6-26 0-16 8-28 24-28z" fill="url(#ulMetal)"/>
    <path d="M50 14v22M36 22l6 12M64 22l-6 12" stroke="#3c434b" stroke-width="1.2"/>
    <path d="M33 46l14 3-2 5-12-3zM67 46l-14 3 2 5 12-3z" fill="#1a0505"/>
    <ellipse cx="40" cy="50" rx="9" ry="5" fill="url(#ulEye)"/><ellipse cx="60" cy="50" rx="9" ry="5" fill="url(#ulEye)"/>
    <path d="M38 64c8 4 16 4 24 0l-3 8c-6 3-12 3-18 0z" fill="#1a0505"/>
    ${[42, 46, 50, 54, 58].map(x => `<path d="M${x} 65.5v5" stroke="#ff3b1f" stroke-width="1" stroke-opacity=".8"/>`).join("")}
    <path d="M26 40c-4 6-4 16 0 24M74 40c4 6 4 16 0 24" stroke="#5c646d" stroke-width="2" fill="none"/></svg>`
};
