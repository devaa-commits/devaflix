(() => {
  const D = window.PORTFOLIO;
  const IM = window.IMPACT || { projects: {}, cast: [], fteHours: 1800 };
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const PHONE = matchMedia("(max-width: 760px)");
  const FINE = matchMedia("(hover: hover) and (pointer: fine)");
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)");
  const ICON = {
    play: '<svg viewBox="0 0 24 24"><path d="M6 4l15 8-15 8z"/></svg>',
    info: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm1 6v8h-2v-8h2Zm0-4v2h-2V6h2Z"/></svg>',
    more: '<svg viewBox="0 0 24 24"><path d="M5.3 8.3 12 15l6.7-6.7 1.4 1.4L12 17.8 3.9 9.7z"/></svg>'
  };

  // ---------- AI Workforce cast → titles ----------
  IM.cast.forEach(c => {
    const id = "ai-" + c.key;
    if (D.projects.some(p => p.id === id)) return;
    D.projects.push({
      id, title: c.name, category: "workforce", unit: c.partner, status: c.vol ? "Live" : "Idle", year: "2026",
      role: "Governed: scored hourly against its own rubric in AI Workforce Scorecards",
      logline: `${c.role}. ${c.does}`,
      how: `${c.does} Every run is pulled from automation step logs and graded against its rubric each hour. Current read: ${c.kpi}.`,
      stack: ["Vendasta AI Workforce", "Vendasta Automations", "Scorecards"],
      impact: [{ v: c.vol.toLocaleString(), l: `${c.unit} in the last 30 days` }, { v: c.kpi.split(/[·(]/)[0].trim(), l: "headline KPI" }],
      tags: ["ai-employee"]
    });
    IM.projects[id] = {
      scene: "robot", glyph: c.glyph, ai: 1, capacity: true,
      model: c.vol ? { per: "month", volume: c.vol, unit: c.unit, manualMin: c.manualMin, autoMin: 0, basis: "modeled",
        notes: ["Volume: 30-day count from AI Workforce Scorecards (Oct 2026).", `Manual: about ${c.manualMin} min for a person to do one.`, "Shown as human-equivalent capacity, not as hours saved by a build."] } : null
    };
  });
  const X = p => IM.projects[p.id] || {};

  // ---------- Impact math ----------
  const PER = { day: 250, week: 52, month: 12, year: 1, once: 1 };
  const calc = p => {
    const m = X(p).model; if (!m) return null;
    const annual = m.volume * PER[m.per];
    const hours = annual * (m.manualMin - m.autoMin) / 60;
    return { ...m, annual, hours, fte: hours / IM.fteHours, eff: m.manualMin ? (m.manualMin - m.autoMin) / m.manualMin : 0, once: m.per === "once" };
  };
  const k = n => n >= 10000 ? (n / 1000).toFixed(0) + "K" : n >= 1000 ? (n / 1000).toFixed(1) + "K" : Math.round(n).toLocaleString();
  const fte = n => n >= 10 ? n.toFixed(0) : n >= 1 ? n.toFixed(1) : n.toFixed(2);

  // ---------- Poster art: one illustrated scene per project ----------
  const S = 'fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
  const F = 'fill="rgba(255,255,255,.16)" stroke="#fff" stroke-width="2"';
  const A = "#ffd166";
  const person = (x, y, s = 1, c = "#fff") => `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-9" r="6" fill="${c}"/><path d="M-10 9c0-7 4-11 10-11s10 4 10 11z" fill="${c}"/></g>`;
  const robot = (x, y, s = 1, label = "") => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0-22v-6" ${S}/><circle cx="0" cy="-30" r="3" fill="${A}"/><rect x="-16" y="-22" width="32" height="26" rx="7" ${F}/><circle cx="-6" cy="-10" r="3" fill="#fff"/><circle cx="6" cy="-10" r="3" fill="#fff"/><path d="M-6-2h12" ${S}/>${label ? `<text x="0" y="22" font-size="11" font-family="Bebas Neue,Impact" fill="#fff" text-anchor="middle" letter-spacing="1">${label}</text>` : ""}</g>`;
  const star = (x, y, r = 10, fill = A) => { let d = ""; for (let i = 0; i < 10; i++) { const a = Math.PI / 5 * i - Math.PI / 2, rr = i % 2 ? r * .45 : r; d += (i ? "L" : "M") + (x + rr * Math.cos(a)).toFixed(1) + " " + (y + rr * Math.sin(a)).toFixed(1); } return `<path d="${d}Z" fill="${fill}"/>`; };
  let LIVE = false; // set while building hero / preview / title art
  const flow = (d, dur = 2.4, delay = 0, c = A) => !LIVE ? "" : `<circle r="3.5" fill="${c}"><animateMotion dur="${dur}s" begin="${delay}s" repeatCount="indefinite" path="${d}"/></circle>`;
  const GLYPH = {
    tiers: `<path d="M-8 6h4V0h-4zM-2 6h4v-9h-4zM4 6h4v-14h-4z" fill="#fff"/>`,
    search: `<circle cx="-2" cy="-2" r="6" ${S}/><path d="m3 3 5 5" ${S}/>`,
    target: `<circle r="8" ${S}/><circle r="3.5" fill="#fff"/>`,
    chat: `<path d="M-9-7h18v11h-9l-5 5v-5h-4z" ${S}/>`,
    phone: `<path d="M-6-9c-2 6 6 16 13 15l1-4-4-2-2 2c-3-1-6-5-6-7l2-2-2-4z" ${S}/>`,
    wave: `<path d="M-10 0h3l2-7 3 14 3-10 2 3h7" ${S}/>`,
    pen: `<path d="m-8 8 3-9 9-9 6 6-9 9z" ${S}/>`,
    bolt: `<path d="M2-10-6 2h6l-2 9 8-12h-6z" fill="#fff"/>`,
    compass: `<circle r="9" ${S}/><path d="m4-4-2 6-6 2 2-6z" fill="#fff"/>`
  };
  const SCENES = {
    router: () => `${person(178, 92, 1.2, A)}<path d="M192 90h26" ${S}/><path d="M232 74l14 16-14 16-14-16z" ${F}/>
      ${[38, 74, 110, 146].map(y => `<path d="M246 90C262 90 262 ${y} 276 ${y}" ${S} stroke-opacity=".8"/>${person(292, y + 2, .85)}`).join("")}
      ${[38, 74, 110, 146].map((y, i) => flow(`M178 90H232C262 90 262 ${y} 280 ${y}`, 2.6, i * .6)).join("")}
      <text x="232" y="94" font-size="10" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="800">AI</text>`,
    funnel: () => `${[0, 1, 2, 3, 4, 5, 6].map(i => `<circle cx="${180 + i * 18}" cy="${22 + (i % 2) * 8}" r="4" fill="#fff" opacity=".8"/>`).join("")}
      <path d="M170 44h140l-52 58v34h-36v-34z" ${F}/><path d="M188 64h104M206 84h68" ${S} stroke-opacity=".6"/>${person(240, 164, .9, A)}${flow("M240 30V150", 2)}${flow("M200 30L240 150", 2.4, .8)}`,
    squad: () => ["N", "M", "Z", "L"].map((l, i) => robot(170 + i * 40, 70, .95, l)).join("") + ["S", "E", "S"].map((l, i) => robot(190 + i * 40, 140, .95, l)).join(""),
    bug: () => `<circle cx="228" cy="82" r="46" ${F}/><path d="M261 115l34 34" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
      <ellipse cx="228" cy="86" rx="13" ry="18" fill="${A}"/><circle cx="228" cy="64" r="7" fill="${A}"/><path d="M215 78l-12-6M215 90h-14M216 100l-11 8M241 78l12-6M241 90h14M240 100l11 8M224 58l-4-8M232 58l4-8" ${S}/>
      <path d="M190 150l8 8 16-18" stroke="#46d369" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    builder: () => `<rect x="160" y="28" width="56" height="26" rx="6" ${F}/><rect x="160" y="78" width="56" height="26" rx="6" ${F}/><path d="M250 91l18-16 18 16-18 16z" ${F}/>
      <rect x="160" y="128" width="56" height="26" rx="6" ${F}/><rect x="240" y="128" width="56" height="26" rx="6" fill="${A}"/>
      <path d="M188 54v24M188 104v24M216 91h34M268 107v21" ${S}/>${star(296, 36, 12)}${star(276, 56, 6, "#fff")}`,
    stars: () => [0, 1, 2, 3, 4].map(i => star(178 + i * 28, 52, 12)).join("") + `<path d="M170 82h132v50h-80l-18 16v-16h-34z" ${F}/><path d="M184 100h100M184 116h66" ${S} stroke-opacity=".7"/><path d="M262 116l8 8 16-18" stroke="#46d369" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    review: () => `<path d="M168 40h120v56h-74l-18 16V96h-28z" ${F}/>${[0, 1, 2, 3, 4].map(i => star(186 + i * 20, 58, 7)).join("")}<path d="M182 78h86" ${S}/>
      <rect x="208" y="118" width="92" height="40" rx="6" fill="#46d369"/><path d="M224 138l8 8 16-18" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/><text x="284" y="143" font-size="11" fill="#fff" text-anchor="middle" font-family="Inter" font-weight="800">DONE</text>`,
    radar: () => `<path d="M206 118c0-30 6-58 32-58s32 28 32 58l10 12h-84z" ${F}/><circle cx="238" cy="138" r="7" fill="#fff"/><path d="M238 46v14" ${S}/>
      <path d="M286 62c10 10 10 34 0 44M298 50c18 18 18 50 0 68M190 62c-10 10-10 34 0 44M178 50c-18 18-18 50 0 68" ${S} stroke-opacity=".75"/><circle cx="270" cy="56" r="11" fill="#e50914"/><text x="270" y="60" font-size="11" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="800">!</text>`,
    ticket: () => `<rect x="160" y="34" width="56" height="74" rx="5" ${F}/><path d="M170 52h36M170 66h36M170 80h24" ${S} stroke-opacity=".7"/><path d="M224 72h22m-8-8 8 8-8 8" ${S}/>
      <path d="M252 50h50v14a8 8 0 0 0 0 16v14h-50v-14a8 8 0 0 0 0-16z" fill="${A}"/><text x="277" y="78" font-size="11" text-anchor="middle" fill="#000" font-family="Inter" font-weight="800">JIRA</text>${person(277, 146, .9)}<path d="M277 112v14" ${S} stroke-dasharray="3 4"/>`,
    gauge: () => `<path d="M168 128a62 62 0 0 1 124 0" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="14"/><path d="M168 128a62 62 0 0 1 106-44" fill="none" stroke="${A}" stroke-width="14"/>
      <path d="M230 128l30-38" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="230" cy="128" r="7" fill="#fff"/>
      <text x="230" y="160" font-size="22" text-anchor="middle" fill="#fff" font-family="Bebas Neue,Impact">98.2%</text>`,
    pin: () => `<path d="M160 120l70-26 80 26-70 30z" ${F}/><path d="M195 107l80 28M245 99l-40 44" ${S} stroke-opacity=".5"/>
      <path d="M236 108c-22-26-30-38-30-52a30 30 0 0 1 60 0c0 14-8 26-30 52z" fill="#e50914" stroke="#fff" stroke-width="2"/><circle cx="236" cy="56" r="10" fill="#fff"/>`,
    merge: () => `${[30, 66, 102, 138].map((y, i) => `<path d="M162 ${y + 10}l8-12h28l8 12v14h-44z" ${F}/>${flow(`M206 ${y + 16}C240 ${y + 16} 240 90 262 90`, 2.2, i * .5)}<path d="M206 ${y + 16}C240 ${y + 16} 240 90 262 90" ${S} stroke-opacity=".5"/>`).join("")}
      <path d="M262 74l12-18h24l12 18v38h-48z" fill="${A}" stroke="#fff" stroke-width="2"/><path d="M276 112V92h16v20" stroke="#000" stroke-width="2" fill="none"/>`,
    docs: () => `<rect x="196" y="22" width="88" height="112" rx="6" ${F} transform="rotate(8 240 78)"/><rect x="186" y="28" width="88" height="112" rx="6" ${F} transform="rotate(-6 230 84)"/>
      <rect x="180" y="36" width="88" height="116" rx="6" fill="#141414" stroke="#fff" stroke-width="2"/><rect x="200" y="50" width="48" height="16" rx="4" fill="${A}"/><path d="M224 66v12" ${S}/><path d="M224 78l14 12-14 12-14-12z" ${S}/><path d="M224 102v10M198 128h52" ${S}/>`,
    org: () => `<circle cx="236" cy="30" r="12" fill="${A}"/>${[176, 216, 256, 296].map(x => `<path d="M236 42C236 60 ${x} 56 ${x} 72" ${S} stroke-opacity=".6"/><circle cx="${x}" cy="80" r="9" fill="#fff"/>${[-12, 0, 12].map(dx => `<path d="M${x} 89L${x + dx} 120" ${S} stroke-opacity=".4"/><circle cx="${x + dx}" cy="126" r="5" fill="rgba(255,255,255,.75)"/>`).join("")}`).join("")}<text x="236" y="160" font-size="13" text-anchor="middle" fill="#fff" font-family="Bebas Neue,Impact" letter-spacing="2">1 · 4 · 13</text>`,
    handshake: () => `<rect x="160" y="40" width="58" height="76" rx="5" ${F}/><path d="M170 58h38M170 72h38M170 98c8-8 14 6 22-2" ${S} stroke-opacity=".8"/>
      <path d="M222 78h26" ${S} stroke-dasharray="4 5"/>${person(270, 82, 1.1)}<circle cx="286" cy="128" r="18" fill="${A}"/><text x="286" y="133" font-size="14" text-anchor="middle" fill="#000" font-family="Inter" font-weight="800">10%</text>`,
    tiers: () => [70, 58, 46, 34, 24, 14].map((h, i) => `<rect x="${166 + i * 23}" y="${150 - h * 1.6}" width="17" height="${h * 1.6}" rx="3" fill="${i === 0 ? A : "rgba(255,255,255,.8)"}"/><text x="${174 + i * 23}" y="166" font-size="10" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">T${i}</text>`).join(""),
    fingerprint: () => `${[12, 22, 32, 42].map(r => `<path d="M${214 - r} 90a${r} ${r} 0 0 1 ${r * 2} 0v${r / 2}" ${S} stroke-opacity=".75"/>`).join("")}<circle cx="262" cy="104" r="26" ${F}/><path d="M280 122l18 18" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="262" cy="104" r="6" fill="${A}"/>`,
    houses: () => [0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<path d="M${168 + c * 34} ${52 + r * 40}l13-12 13 12v18h-26z" ${r === 1 && c === 2 ? `fill="${A}" stroke="#fff"` : F}/>`).join("")).join(""),
    calendar: () => `<rect x="168" y="36" width="90" height="96" rx="7" ${F}/><path d="M168 58h90M190 28v14M236 28v14" ${S}/>${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<rect x="${176 + c * 20}" y="${66 + r * 20}" width="12" height="12" rx="2" fill="${r === 1 && c === 2 ? A : "rgba(255,255,255,.5)"}"/>`).join("")).join("")}
      <rect x="250" y="96" width="56" height="60" rx="6" fill="#141414" stroke="#fff" stroke-width="2"/>${[0, 1, 2].map(i => `<path d="M258 ${112 + i * 14}l4 4 7-8M274 ${114 + i * 14}h24" stroke="${i < 2 ? "#46d369" : "#fff"}" stroke-width="2" fill="none" stroke-linecap="round"/>`).join("")}`,
    headset: () => `<path d="M186 96v-14a44 44 0 0 1 88 0v14" ${S}/><rect x="176" y="92" width="18" height="32" rx="7" fill="#fff"/><rect x="266" y="92" width="18" height="32" rx="7" fill="#fff"/><path d="M275 124c0 14-14 20-30 20" ${S}/>
      <path d="M210 40h70v34h-46l-12 12v-12h-12z" fill="${A}"/><circle cx="230" cy="57" r="3" fill="#000"/><circle cx="245" cy="57" r="3" fill="#000"/><circle cx="260" cy="57" r="3" fill="#000"/>`,
    wave: () => Array.from({ length: 22 }, (_, i) => { const h = 10 + Math.abs(Math.sin(i * .9)) * 56 + (i % 3) * 6; return `<rect x="${164 + i * 6.6}" y="${90 - h / 2}" width="3.6" height="${h}" rx="2" fill="${i > 7 && i < 14 ? A : "#fff"}"/>`; }).join(""),
    mail: () => `<rect x="168" y="58" width="112" height="76" rx="6" ${F}/><path d="M168 64l56 42 56-42" ${S}/><circle cx="290" cy="44" r="14" fill="${A}"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M${290 + 19 * Math.cos(a * Math.PI / 180)} ${44 + 19 * Math.sin(a * Math.PI / 180)}l${5 * Math.cos(a * Math.PI / 180)} ${5 * Math.sin(a * Math.PI / 180)}" ${S}/>`).join("")}<text x="224" y="156" font-size="13" text-anchor="middle" fill="#fff" font-family="Bebas Neue,Impact" letter-spacing="2">7:00 AM</text>`,
    blueprint: () => `${Array.from({ length: 8 }, (_, i) => `<path d="M${160 + i * 20} 20v150M160 ${20 + i * 20}h150" stroke="rgba(255,255,255,.18)" stroke-width="1"/>`).join("")}
      <path d="M170 140h40l20-40h40l20-50" ${S}/><circle cx="170" cy="140" r="6" fill="#fff"/><circle cx="230" cy="100" r="6" fill="#fff"/><circle cx="290" cy="50" r="8" fill="${A}"/>`,
    clock: () => `<circle cx="236" cy="96" r="52" ${F}/><path d="M228 36h16M236 36v8M280 52l8-8" ${S}/><path d="M236 96V66" stroke="${A}" stroke-width="4" stroke-linecap="round"/><path d="M236 96l20 12" ${S}/><circle cx="236" cy="96" r="5" fill="#fff"/>`,
    code: () => `<text x="236" y="112" font-size="72" text-anchor="middle" fill="#fff" font-family="Bebas Neue,Impact">{ }</text><text x="236" y="152" font-size="16" text-anchor="middle" fill="${A}" font-family="Inter" font-weight="800">.gs</text>`,
    floor: () => `<path d="M236 40l74 40-74 40-74-40z" ${F}/><path d="M236 120v24l74-40V80M236 144l-74-40V80" ${S} stroke-opacity=".6"/>${[[210, 70], [236, 60], [262, 70], [210, 90], [236, 80], [262, 90]].map(([x, y]) => `<rect x="${x - 7}" y="${y - 4}" width="14" height="8" rx="2" fill="${A}" transform="skewX(-20)"/>`).join("")}`,
    decode: () => `<rect x="160" y="30" width="44" height="22" rx="4" ${F}/><path d="M182 52v14" ${S}/><path d="M182 66l14 12-14 12-14-12z" ${F}/><path d="M196 78h20" ${S}/><path d="M230 66l14 12-14 12-14-12z" ${F}/><path d="M244 78h20" ${S}/><path d="M278 66l14 12-14 12-14-12z" fill="${A}"/>
      <path d="M182 90v20M230 90v20M278 90v20" ${S}/><rect x="164" y="110" width="36" height="20" rx="4" ${F}/><rect x="212" y="110" width="36" height="20" rx="4" ${F}/><rect x="260" y="110" width="36" height="20" rx="4" ${F}/><text x="230" y="158" font-size="13" text-anchor="middle" fill="#fff" font-family="Bebas Neue,Impact" letter-spacing="2">159 STEPS</text>`,
    map: () => [0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${170 + c * 44}" y="${30 + r * 44}" width="36" height="36" rx="5" ${r === c ? `fill="${A}"` : F}/>`).join("")).join(""),
    crate: () => `<rect x="170" y="98" width="56" height="50" rx="3" ${F}/><rect x="232" y="98" width="56" height="50" rx="3" ${F}/><rect x="200" y="44" width="56" height="50" rx="3" fill="${A}"/><path d="M170 112h56M232 112h56M200 58h56" ${S} stroke-opacity=".6"/><text x="228" y="82" font-size="14" text-anchor="middle" fill="#000" font-family="Inter" font-weight="800">#partner</text>`,
    robot: g => `${robot(232, 112, 2.6)}<g transform="translate(286 54)"><circle r="17" fill="${A}"/><g transform="scale(1.1)" style="filter:invert(1)">${GLYPH[g] || ""}</g></g>`
  };
  const LOOKS = {
    ai: "linear-gradient(135deg,#240046 0%,#7209b7 50%,#f72585 100%)",
    routing: "linear-gradient(135deg,#03045e 0%,#0077b6 55%,#00b4d8 100%)",
    hygiene: "linear-gradient(135deg,#081c15 0%,#1b4332 45%,#52b788 100%)",
    reputation: "linear-gradient(135deg,#370617 0%,#9d0208 50%,#f48c06 100%)",
    tooling: "linear-gradient(135deg,#0b0b1e 0%,#1f2a5a 50%,#e94560 130%)",
    lab: "linear-gradient(135deg,#10002b 0%,#3c096c 50%,#ff9e00 140%)",
    workforce: "linear-gradient(135deg,#001219 0%,#005f73 50%,#0a9396 100%)"
  };
  const hash = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const cat = p => D.categories.find(c => c.id === p.category) || D.categories[0];
  const match = p => 90 + (hash(p.id) % 10);
  const statusOf = p => (p.status || "").toLowerCase();

  const sceneSvg = p => { const x = X(p); const fn = SCENES[x.scene] || SCENES.blueprint; return `<svg class="art__scene" viewBox="150 10 170 165" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${fn(x.glyph)}</svg>`; };
  const art = (p, extra = "", withTitle = true, live = false) => {
    const h = hash(p.id);
    LIVE = live; const scene = sceneSvg(p); LIVE = false;
    const ribbon = statusOf(p) === "in progress" ? '<span class="art__ribbon">New Episodes</span>'
      : statusOf(p) === "prototype" ? '<span class="art__ribbon art__ribbon--live">Pilot</span>'
      : p.category === "workforce" ? '<span class="art__ribbon art__ribbon--ai">AI Employee</span>' : "";
    const prog = statusOf(p) === "in progress" ? `<div class="progress"><i style="width:${p.progress || 55}%"></i></div>` : "";
    return `<div class="art ${extra}" style="--g:${LOOKS[cat(p).look] || LOOKS.tooling};--h:${(h % 30) - 15}deg">
      <span class="art__d">D</span>${ribbon}${scene}
      ${withTitle ? `<div class="art__title">${esc(p.title)}</div>` : ""}${prog}
    </div>`;
  };

  const gainText = p => {
    const c = calc(p); if (!c || !c.hours) return "";
    if (X(p).capacity) return `≈${k(c.hours)} human-hrs/yr`;
    if (c.basis === "projected") return `≈${k(c.hours)} hrs/yr projected`;
    return c.once ? `${k(c.hours)} hrs saved` : `${k(c.hours)} hrs/yr saved`;
  };

  // ---------- My List (per-viewer) ----------
  const store = {
    get() { try { return JSON.parse(localStorage.getItem("devaflix:list") || "[]"); } catch { return []; } },
    set(v) { try { localStorage.setItem("devaflix:list", JSON.stringify(v)); } catch {} }
  };
  let myList = store.get();
  const inList = id => myList.includes(id);
  const toggleList = id => {
    myList = inList(id) ? myList.filter(x => x !== id) : [...myList, id];
    store.set(myList);
    document.querySelectorAll(`[data-list="${id}"]`).forEach(b => { b.textContent = inList(id) ? "✓" : "+"; b.setAttribute("aria-label", inList(id) ? "Remove from My List" : "Add to My List"); });
  };

  // ---------- Cards & rows ----------
  const portrait = () => PHONE.matches;
  const card = (p, opts = {}) => {
    const tall = opts.portrait ?? portrait();
    return `<button class="card${tall ? " card--portrait" : ""}" data-open="${p.id}" data-card="${p.id}" aria-label="${esc(p.title)}"${opts.i != null ? ` style="--i:${opts.i}"` : ""}>
      <div class="card__art">${art(p, tall ? "art--portrait" : "")}</div></button>`;
  };
  const topCard = (p, i) => `<button class="card card--top" data-open="${p.id}" data-card="${p.id}" aria-label="Number ${i + 1}: ${esc(p.title)}">
      <span class="topnum" aria-hidden="true">${i + 1}</span><div class="card__art">${art(p, "art--portrait")}</div></button>`;
  const row = (title, items, opts = {}) => {
    if (!items.length) return "";
    const head = opts.explore
      ? `<button data-filter="${opts.explore}">${esc(title)}<span class="row__explore">Explore all ›</span></button>`
      : esc(title);
    return `<section class="row" aria-label="${esc(title)}">
      <div class="row__head"><h2 class="row__title">${head}</h2>${opts.sub ? `<span class="row__sub">${esc(opts.sub)}</span>` : ""}</div>
      <div class="row__wrap">
        <button class="row__arrow row__arrow--l is-off" data-scroll="-1" aria-label="Scroll ${esc(title)} left">‹</button>
        <div class="row__track">${items.map((p, i) => (opts.top ? topCard(p, i) : card(p))).join("")}</div>
        <button class="row__arrow row__arrow--r" data-scroll="1" aria-label="Scroll ${esc(title)} right">›</button>
      </div></section>`;
  };
  const syncArrows = tr => {
    const wrap = tr.parentElement;
    const max = tr.scrollWidth - tr.clientWidth - 2;
    wrap.querySelector(".row__arrow--l").classList.toggle("is-off", tr.scrollLeft <= 2);
    wrap.querySelector(".row__arrow--r").classList.toggle("is-off", tr.scrollLeft >= max);
  };

  // ---------- Totals ----------
  const totals = () => {
    let rec = 0, once = 0, proj = 0, cap = 0, aiBuilt = 0;
    D.projects.forEach(p => {
      const c = calc(p), x = X(p);
      if (c) {
        if (x.capacity) cap += c.hours;
        else if (c.basis === "projected") proj += c.hours;
        else if (c.once) once += c.hours;
        else rec += c.hours;
      }
      if (!x.capacity && p.id !== "ai-scorecards" && p.id !== "lead-routing-engine") aiBuilt += x.ai || 0;
    });
    return { rec, once, proj, cap, aiBuilt, cast: IM.cast.length };
  };
  const band = () => {
    const t = totals();
    return `<section class="band" aria-label="Impact so far">
      <div><div class="band__eyebrow">Season 2026</div><h2 class="band__title">The impact so far</h2></div>
      <div class="band__stats">
        <div><b>${k(t.rec)}</b><span>hours a year automated<br>≈${fte(t.rec / IM.fteHours)} FTE</span></div>
        <div><b>${t.cast}</b><span>AI employees governed<br>≈${fte(t.cap / IM.fteHours)} FTE of output</span></div>
        <div><b>${t.aiBuilt}</b><span>AI agents & bots<br>built and shipped</span></div>
        <div><b>312</b><span>automations documented<br>and owned</span></div>
      </div>
      <button class="band__cta" data-ledger>Impact ledger ›</button>
    </section>`;
  };

  // ---------- Breadcrumbs ----------
  const crumbs = trail => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${trail.map((c, i) => `<li>${c.go && i < trail.length - 1
    ? `<button data-filter="${c.go}">${esc(c.label)}</button>`
    : `<span${i === trail.length - 1 ? ' aria-current="page"' : ""}>${esc(c.label)}</span>`}</li>`).join("")}</ol></nav>`;
  const viewLabel = id => {
    const [kk, v] = id.split(":");
    if (kk === "cat") return (D.categories.find(c => c.id === v) || { name: v }).name;
    if (kk === "unit") return ((D.units.find(u => u.id === v) || { name: v }).name || v).split(" (")[0];
    return id === "list" ? "My List" : "Home";
  };
  const trailFor = id => [{ label: "Home", go: "all" }, ...(id === "all" ? [] : [{ label: viewLabel(id), go: id }])];

  // ---------- Living scenes ----------
  const animateScene = (svg, delay = 0) => {
    if (!svg || REDUCED.matches) return;
    [...svg.children].forEach((el, i) => {
      if (el.tagName === "circle" && el.querySelector("animateMotion")) return;
      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, delay: delay + 80 + Math.min(i, 16) * 45, easing: "ease-out", fill: "backwards" });
    });
    svg.querySelectorAll("path[stroke]:not([stroke-dasharray])").forEach((el, i) => {
      const len = el.getTotalLength ? el.getTotalLength() : 0; if (!len) return;
      el.style.strokeDasharray = `${len} ${len}`;
      el.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 760, delay: delay + 120 + Math.min(i, 14) * 55, easing: "cubic-bezier(.65,0,.35,1)", fill: "backwards" })
        .onfinish = () => { el.style.strokeDasharray = ""; };
    });
  };

  // ---------- Hero ----------
  let heroTimer, heroIdx = 0, heroPool = [];
  const renderHero = () => {
    const p = heroPool[heroIdx % heroPool.length];
    if (!p) { $("#hero").innerHTML = ""; return; }
    const rank = D.projects.filter(x => x.top).sort((a, b) => a.top - b.top).indexOf(p);
    const c = calc(p), x = X(p);
    const stats = [];
    if (c && c.hours) stats.push(`<span class="is-hot"><b>${k(c.hours)}</b>${c.once ? "hrs saved" : c.basis === "projected" ? "hrs / yr projected" : "hrs / yr"}</span>`, `<span><b>≈${fte(c.fte)}</b>FTE</span>`);
    if (c && c.eff) stats.push(`<span><b>${Math.round(c.eff * 100)}%</b>less effort</span>`);
    if (x.ai) stats.push(`<span><b>${x.ai}</b>AI ${x.ai > 1 ? "employees" : "employee"}</span>`);
    const oldArt = $("#hero .hero__art");
    $("#hero").innerHTML = `
      <div class="hero__art is-entering">${art(p, "art--hero", false, true)}</div>
      <div class="hero__sheen"></div>
      <div class="hero__content">
        ${current.startsWith("unit:") ? crumbs(trailFor(current)) : ""}
        <div class="hero__kicker"><b>D</b> ${esc(cat(p).name)} · ${esc(p.unit || "GTM")}</div>
        <h1 class="hero__title">${esc(p.title)}</h1>
        ${rank >= 0 ? `<div class="hero__top10"><span class="badge10">TOP<br>10</span>#${rank + 1} in GTM Automation Today</div>` : ""}
        <p class="hero__desc">${esc(p.logline)}</p>
        ${stats.length ? `<div class="hero__stats">${stats.join("")}</div>` : ""}
        <div class="hero__actions">
          <button class="btn btn--play" data-open="${p.id}">${ICON.play}Play</button>
          <button class="btn btn--info" data-open="${p.id}">${ICON.info}More Info</button>
        </div>
      </div>
      ${heroPool.length > 1 ? `<div class="hero__dots">${heroPool.map((h, i) => `<button data-hero="${i}" class="${i === heroIdx % heroPool.length ? "is-on" : ""}" aria-label="Show ${esc(h.title)}"></button>`).join("")}</div>` : ""}
      <div class="hero__rating">${esc(p.status)}</div>`;
    // the outgoing slide stays underneath while the new one fades in over it
    const newArt = $("#hero .hero__art");
    if (oldArt && !REDUCED.matches) { oldArt.classList.remove("is-entering"); $("#hero").insertBefore(oldArt, newArt); setTimeout(() => oldArt.remove(), 750); }
    requestAnimationFrame(() => requestAnimationFrame(() => { newArt.classList.remove("is-entering"); $("#hero .hero__sheen").classList.add("is-on"); }));
    animateScene(newArt.querySelector(".art__scene"), 150);
  };
  const startHero = pool => {
    heroPool = pool.slice(0, 5); heroIdx = 0; renderHero();
    clearInterval(heroTimer);
    if (heroPool.length > 1 && !REDUCED.matches)
      heroTimer = setInterval(() => { if ($("#modal").hidden && !pvEl && !document.hidden && !$("#hero").matches(":hover, :focus-within")) { heroIdx++; renderHero(); } }, 10000);
  };

  // ---------- Views ----------
  const CAT_DESC = {
    routing: "The engine every inbound lead runs through, and the programs that feed it.",
    ai: "Agents, copilots and LLM pipelines built for GTM and support teams.",
    workforce: "The AI employees inside Vendasta and Broadly automations, each scored hourly against its own rubric.",
    hygiene: "Keeping 290K+ CRM records clean, deduplicated and routable.",
    reputation: "Listings and review operations, automated end to end.",
    tooling: "Internal apps, monitoring and documentation for the RevOps team.",
    lab: "Hackathon builds, pilots and specs in flight."
  };
  const UNIT_DESC = { Vendasta: "Vendasta's own channel business.", Broadly: "Broadly by Vendasta, the direct-to-SMB business.", Franchise: "A multi-brand franchise partner." };
  const MAIN_NAV = [
    { id: "all", label: "Home" }, { id: "unit:Vendasta", label: "Vendasta", opt: true }, { id: "unit:Broadly", label: "Broadly", opt: true },
    { id: "cat:routing", label: "Lead Routing", opt: true }, { id: "cat:workforce", label: "AI Workforce", opt: true },
    { ledger: true, label: "Impact" }, { id: "list", label: "My List" }
  ];
  let current = "all";
  const filterBy = id => {
    if (id === "all") return D.projects;
    if (id === "list") return D.projects.filter(p => inList(p.id));
    const [kk, v] = id.split(":");
    if (kk === "unit") return D.projects.filter(p => (p.unit || "").split(/[ ,/+]+/).includes(v));
    if (kk === "cat") return D.projects.filter(p => p.category === v);
    return D.projects;
  };
  const weight = p => (p.top ? 1000 - p.top * 10 : 0) + (p.featured ? 50 : 0) + ((calc(p) || {}).hours || 0) / 1000;
  const byWeight = (a, b) => weight(b) - weight(a);

  const renderNav = () => {
    const inMenu = id => id.startsWith("cat:") && !MAIN_NAV.some(n => n.id === id) || id === "unit:Franchise";
    $("#navLinks").innerHTML = MAIN_NAV.map(n => n.ledger
      ? `<button data-ledger>${n.label}</button>`
      : `<button data-filter="${n.id}" class="${n.opt ? "nav__opt " : ""}${n.id === current ? "is-active" : ""}"${n.id === current ? ' aria-current="page"' : ""}>${n.label}</button>`).join("")
      + `<button class="nav__browse${inMenu(current) ? " is-active" : ""}" data-menu aria-expanded="false" aria-haspopup="true">Browse</button>
      <div class="menu" id="menu" hidden>
        <div class="menu__label">Genres</div>
        ${D.categories.map(c => `<button data-filter="cat:${c.id}">${esc(c.name)}</button>`).join("")}
        <div class="menu__label">Partners</div>
        ${D.units.map(u => `<button data-filter="unit:${u.id}">${esc(u.id)} · ${esc(u.name.split(" (")[0])}</button>`).join("")}
      </div>`;
  };

  const browsePage = (eyebrow, title, desc, items, rowsHtml, trail = trailFor(current)) => `<section class="browse">
      ${crumbs(trail)}
      <h1 class="browse__title">${esc(title)}</h1>
      ${desc ? `<p class="browse__desc">${esc(desc)}</p>` : ""}
      ${rowsHtml || (items.length ? `<div class="grid">${items.map((p, i) => card(p, { i })).join("")}</div>` : `<p class="empty">Nothing here yet. Hover a title and press “+” to save it to My List.</p>`)}
    </section>`;

  const render = (id = current) => {
    if (id !== current) { const r = $("#rows"); r.classList.remove("is-swapping"); void r.offsetWidth; r.classList.add("is-swapping"); }
    current = id;
    hidePreview();
    renderNav();
    const q = $("#search").value.trim().toLowerCase();
    if (q) {
      const hits = D.projects.filter(p => [p.title, p.logline, p.problem, p.how, p.unit, p.role, cat(p).name, ...(p.stack || [])].join(" ").toLowerCase().includes(q)).sort(byWeight);
      $("#hero").hidden = true; clearInterval(heroTimer);
      $("#rows").innerHTML = browsePage("Search", `“${q}”`, `${hits.length} title${hits.length === 1 ? "" : "s"}`, hits, "", [{ label: "Home", go: "all" }, { label: "Search" }])
        .replace('<p class="empty">Nothing here yet. Hover a title and press “+” to save it to My List.</p>', `<p class="empty">No titles match. Try “routing”, “Claude” or “Apps Script”.</p>`);
      afterRender(); return;
    }
    const items = filterBy(id);
    const [kk, v] = id.split(":");

    if (id === "all" || kk === "unit") {
      $("#hero").hidden = false;
      const featured = items.filter(p => p.featured).sort(byWeight);
      startHero(featured.length ? featured : items.slice().sort(byWeight).slice(0, 1));
      let html = "";
      if (id === "all") {
        html += row("Top 10 GTM Builds Today", D.projects.filter(p => p.top).sort((a, b) => a.top - b.top).slice(0, 10), { top: true });
        html += band();
      }
      D.categories.forEach(c => {
        const list = items.filter(p => p.category === c.id).sort(byWeight);
        html += row(c.row || c.name, list, { explore: `cat:${c.id}`, sub: c.sub });
      });
      $("#rows").innerHTML = html;
    } else {
      $("#hero").hidden = true; clearInterval(heroTimer);
      if (kk === "cat") {
        const c = D.categories.find(x => x.id === v);
        $("#rows").innerHTML = browsePage("Genre", c ? c.name : v, CAT_DESC[v], items.sort(byWeight));
      } else {
        $("#rows").innerHTML = browsePage("Your picks", "My List", "", items);
      }
    }
    afterRender();
  };
  const afterRender = () => document.querySelectorAll(".row__track").forEach(syncArrows);

  // ---------- Floating hover preview ----------
  let pvEl = null, pvCard = null, pvTimer = 0;
  const hidePreview = () => {
    clearTimeout(pvTimer);
    if (pvCard) pvCard.classList.remove("is-previewing");
    if (pvEl) { const el = pvEl; el.classList.remove("is-in"); setTimeout(() => el.remove(), 220); }
    pvEl = pvCard = null;
  };
  const tagsFor = p => {
    const x = X(p), out = [cat(p).short || cat(p).name];
    if (x.ai) out.push(`${x.ai} AI ${x.ai > 1 ? "agents" : "agent"}`);
    const s = (p.stack || []).find(t => t.length <= 22);
    if (s) out.push(s);
    return out;
  };
  const showPreview = cardEl => {
    hidePreview();
    const p = D.projects.find(x => x.id === cardEl.dataset.card); if (!p) return;
    const box = cardEl.querySelector(".card__art").getBoundingClientRect();
    const w = Math.min(Math.max(box.width * 1.5, 320), 420, innerWidth - 32);
    const artH = w * 9 / 16;
    let left = box.left + box.width / 2 - w / 2;
    left = Math.max(16, Math.min(left, innerWidth - w - 16 - 8));
    let top = box.top + box.height / 2 - artH / 2 - 10;
    top = Math.max(76, top);
    const gain = gainText(p);
    const el = document.createElement("div");
    el.className = "pv"; el.dataset.open = p.id; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", p.title);
    el.style.cssText = `left:${left + scrollX}px;top:${top + scrollY}px;width:${w}px;transform-origin:${box.left + box.width / 2 - left}px ${box.top + box.height / 2 - top}px`;
    el.innerHTML = `<div class="pv__art">${art(p, "", true, true)}</div>
      <div class="pv__body">
        <div class="pv__btns">
          <button class="cbtn cbtn--play" data-open="${p.id}" aria-label="Open ${esc(p.title)}">${ICON.play}</button>
          <button class="cbtn" data-list="${p.id}" aria-label="${inList(p.id) ? "Remove from" : "Add to"} My List">${inList(p.id) ? "✓" : "+"}</button>
          <button class="cbtn cbtn--more" data-open="${p.id}" aria-label="More info">${ICON.more}</button>
        </div>
        <div class="pv__meta">${gain ? `<span class="gain">${esc(gain)}</span>` : ""}<span class="pill">${esc(p.unit || "GTM")}</span><span>${esc(p.status)}</span></div>
        <p class="pv__logline">${esc(p.logline)}</p>
        <div class="tags">${tagsFor(p).map(t => `<span>${esc(t)}</span>`).join("")}</div>
      </div>`;
    el.addEventListener("mouseleave", e => { if (!(e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest(`[data-card="${p.id}"]`))) hidePreview(); });
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("is-in"));
    animateScene(el.querySelector(".art__scene"), 120);
    cardEl.classList.add("is-previewing");
    pvEl = el; pvCard = cardEl;
  };
  document.addEventListener("mouseover", e => {
    if (!FINE.matches) return;
    const c = e.target.closest && e.target.closest("[data-card]");
    if (!c || c.closest(".modal")) return;
    if (c === pvCard) return;
    clearTimeout(pvTimer);
    pvTimer = setTimeout(() => { if (c.matches(":hover")) showPreview(c); }, 420);
  });
  document.addEventListener("mouseout", e => {
    const c = e.target.closest && e.target.closest("[data-card]");
    if (!c) return;
    const to = e.relatedTarget;
    if (to && (c.contains(to) || (to.closest && to.closest(".pv")))) return;
    clearTimeout(pvTimer);
    if (c === pvCard) hidePreview();
  });
  addEventListener("scroll", () => { if (pvEl) hidePreview(); }, { passive: true });
  addEventListener("resize", hidePreview);
  document.addEventListener("scroll", e => { const t = e.target; if (t.classList && t.classList.contains("row__track")) { syncArrows(t); hidePreview(); } }, true);

  // ---------- Modal ----------
  const impactReport = p => {
    const c = calc(p), x = X(p);
    if (!c && !x.tat && !x.ai) return "";
    const tiles = [];
    if (c && c.eff) tiles.push([`${Math.round(c.eff * 100)}%`, "less effort per task"]);
    if (c && c.hours) tiles.push([k(c.hours), x.capacity ? "human-equivalent hrs / yr" : c.once ? "hours saved (one-time)" : "hours saved / yr"]);
    if (c && c.hours) tiles.push([`≈${fte(c.fte)}`, x.capacity ? "FTE of output" : "FTE equivalent"]);
    if (c) tiles.push([k(c.annual), `${c.unit} / ${c.once ? "run" : "yr"}`]);
    if (x.ai) tiles.push([x.ai, x.capacity ? "AI employee" : "AI employees / agents"]);
    return `<h3 class="m-h m-h--first">Impact Report ${c ? `<span class="basis basis--${c.basis}">${c.basis}</span>` : ""}</h3>
      ${x.tat ? `<div class="tat"><div><span>Before</span><b>${esc(x.tat.before)}</b></div><div class="tat__arrow" aria-hidden="true">→</div><div><span>After</span><b>${esc(x.tat.after)}</b></div></div>` : ""}
      ${tiles.length ? `<div class="impact">${tiles.map(([val, l]) => `<div><b>${esc(val)}</b><span>${esc(l)}</span></div>`).join("")}</div>` : ""}
      ${c ? `<details class="how"><summary>How this is calculated</summary>
        <p><code>${c.volume.toLocaleString()} ${esc(c.unit)} / ${c.per} × ${PER[c.per]} = ${c.annual.toLocaleString()} per year</code><br>
        <code>× (${c.manualMin} − ${c.autoMin} min) ÷ 60 = ${Math.round(c.hours).toLocaleString()} hrs</code><br>
        <code>÷ ${IM.fteHours.toLocaleString()} hrs per FTE-year = ${fte(c.fte)} FTE</code></p>
        <ul>${(c.notes || []).map(n => `<li>${esc(n)}</li>`).join("")}</ul></details>` : ""}`;
  };

  let lastFocus = null;
  const openModal = id => {
    const p = D.projects.find(x => x.id === id);
    if (!p) return;
    hidePreview();
    const eps = p.episodes || [], stills = X(p).stills || [];
    const similar = D.projects.filter(x => x.id !== p.id && x.category === p.category).sort(byWeight).slice(0, 6);
    const gain = gainText(p);
    $("#modalBody").innerHTML = `
      <div class="m-art">${art(p, "", true, true)}</div>
      <div class="m-body">
        ${crumbs([{ label: "Home", go: "all" }, { label: cat(p).name, go: `cat:${p.category}` }, { label: p.title }])}
        <div class="m-actions">
          <button class="btn btn--play" data-jump="${eps.length ? "eps" : "story"}">${ICON.play}${eps.length ? "Play Episodes" : "Read the Story"}</button>
          <button class="cbtn" data-list="${p.id}" aria-label="${inList(p.id) ? "Remove from" : "Add to"} My List">${inList(p.id) ? "✓" : "+"}</button>
        </div>
        <div class="m-meta">${gain ? `<span class="gain">${esc(gain)}</span>` : ""}<span>${esc(p.year || "")}</span><span class="pill">${esc(p.unit || "GTM")}</span><span class="pill">${esc(p.status)}</span></div>
        <p class="m-lead" id="mTitle">${esc(p.logline)}</p>
        ${impactReport(p)}
        <h3 class="m-h" id="story">The Story</h3>
        <div class="m-grid">
          <div>
            ${p.problem ? `<p class="m-text"><b>The problem.</b> ${esc(p.problem)}</p>` : ""}
            ${p.how ? `<p class="m-text"><b>The build.</b> ${esc(p.how)}</p>` : ""}
          </div>
          <dl class="m-side">
            <div><dt>Stack: </dt><dd>${(p.stack || []).map(esc).join(", ")}</dd></div>
            <div><dt>Genre: </dt><dd>${esc(cat(p).name)}</dd></div>
            <div><dt>Business unit: </dt><dd>${esc(p.unit || "GTM-wide")}</dd></div>
            ${p.role ? `<div><dt>Role: </dt><dd>${esc(p.role)}</dd></div>` : ""}
          </dl>
        </div>
        ${p.impact && p.impact.length ? `<h3 class="m-h">By the Numbers</h3><div class="impact impact--facts">${p.impact.map(i => `<div><b>${esc(i.v)}</b><span>${esc(i.l)}</span></div>`).join("")}</div>` : ""}
        ${stills.length ? `<h3 class="m-h">Stills</h3><div class="stills">${stills.map(s => `<button class="still" data-still="${esc(s.src)}" data-cap="${esc(s.cap)}"><img src="${esc(s.src)}" alt="${esc(s.cap)}" loading="lazy"><span>${esc(s.cap)}</span></button>`).join("")}</div>` : ""}
        ${eps.length ? `<h3 class="m-h" id="eps">Episodes</h3>${eps.map((e, i) => `<div class="ep"><div class="ep__n">${i + 1}</div><div><p class="ep__t">${esc(e.t)}</p><p class="ep__d">${esc(e.d)}</p></div></div>`).join("")}` : ""}
        ${similar.length ? `<h3 class="m-h">More Like This</h3><div class="m-more">${similar.map(s => card(s, { portrait: true })).join("")}</div>` : ""}
      </div>`;
    showModal();
  };

  const openLedger = () => {
    hidePreview(); closeMenu();
    const rows = D.projects.map(p => ({ p, c: calc(p) })).filter(r => r.c).sort((a, b) => b.c.hours - a.c.hours);
    const t = totals();
    $("#modalBody").innerHTML = `<div class="m-body ledger">
      <div class="ledger__crumbs">${crumbs([{ label: "Home", go: "all" }, { label: "Impact Ledger" }])}</div>
      <h2 class="m-h m-h--first" id="mTitle" style="font-size:28px;margin-top:34px">Impact Ledger</h2>
      <p class="m-text">Each row is <code>volume × (manual − automated minutes)</code>, annualized and divided by ${IM.fteHours.toLocaleString()} hours per FTE-year.
      <b>Measured</b>: volume and time come from logs. <b>Modeled</b>: volume is measured and minutes are assumed. <b>Projected</b>: pilots, left out of the headline totals. Every input lives in <code>impact.js</code>.</p>
      <div class="ledger__wrap"><table>
        <thead><tr><th>Title</th><th>Basis</th><th>Volume / yr</th><th>Manual → Auto</th><th>Hours</th><th>FTE</th></tr></thead>
        <tbody>${rows.map(({ p, c }) => `<tr data-open="${p.id}"><td>${esc(p.title)}${X(p).capacity ? ' <span class="pill">AI output</span>' : ""}</td><td><span class="basis basis--${c.basis}">${c.basis}</span></td><td>${k(c.annual)} ${esc(c.unit)}${c.once ? " (once)" : ""}</td><td>${c.manualMin} → ${c.autoMin} min</td><td>${k(c.hours)}</td><td>${fte(c.fte)}</td></tr>`).join("")}</tbody>
        <tfoot><tr><td colspan="4">Recurring: live builds and owned systems</td><td>${k(t.rec)}</td><td>${fte(t.rec / IM.fteHours)}</td></tr>
        <tr><td colspan="4">One-time</td><td>${k(t.once)}</td><td></td></tr>
        <tr><td colspan="4">Projected (pilots, not in headline)</td><td>${k(t.proj)}</td><td>${fte(t.proj / IM.fteHours)}</td></tr>
        <tr><td colspan="4">AI workforce output governed</td><td>${k(t.cap)}</td><td>${fte(t.cap / IM.fteHours)}</td></tr></tfoot>
      </table></div></div>`;
    showModal();
  };

  // ---------- Card → title expand ----------
  let expandFrom = null, foldTo = null, closing = null;
  const originFor = el => {
    if (el.closest(".modal") || el.closest(".ledger")) return null;
    const pv = el.closest(".pv");
    if (pv) return { rect: pv.querySelector(".pv__art").getBoundingClientRect(), back: pvCard && pvCard.querySelector(".card__art") };
    const c = el.closest("[data-card]");
    if (c) { const a = c.querySelector(".card__art"); return { rect: a.getBoundingClientRect(), back: a }; }
    if (el.closest("#hero")) { const a = [...document.querySelectorAll("#hero .hero__art")].pop(); return a ? { rect: a.getBoundingClientRect(), back: null } : null; }
    return null;
  };
  // transform that puts the sheet's artwork exactly over rect r
  const flip = r => {
    const card = $(".modal__card"), to = card.getBoundingClientRect(), artH = $(".m-art") ? $(".m-art").getBoundingClientRect().height : to.height;
    const s = r.width / to.width;
    return { tf: `translate(${r.left - to.left}px, ${r.top - to.top}px) scale(${s}, ${r.height / artH})`, clip: `inset(0 0 ${Math.max(0, to.height - artH)}px 0 round 10px)` };
  };
  const expand = () => {
    const o = expandFrom; expandFrom = null; foldTo = o && o.back;
    if (!o || REDUCED.matches || !$(".m-art")) return;
    const card = $(".modal__card"), f = flip(o.rect);
    card.style.animation = "none"; card.style.transformOrigin = "0 0";
    card.animate([{ transform: f.tf, clipPath: f.clip }, { transform: "none", clipPath: "inset(0 0 0 0 round 8px)" }], { duration: 420, easing: "cubic-bezier(.32,.72,0,1)" });
    $(".modal__backdrop").animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: "ease-out" });
    $("#modalBody .m-body").animate([{ opacity: 0 }, { opacity: 0, offset: .45 }, { opacity: 1 }], { duration: 420, easing: "ease-out" });
  };
  const fold = done => {
    const el = foldTo; foldTo = null;
    const r = el && document.contains(el) && el.getBoundingClientRect();
    const onScreen = r && r.width && r.bottom > 0 && r.top < innerHeight && $("#modal").scrollTop < 40;
    const card = $(".modal__card");
    if (REDUCED.matches || !card) return done();
    const anim = onScreen && $(".m-art")
      ? card.animate([{ transform: "none", clipPath: "inset(0 0 0 0 round 8px)" }, { transform: flip(r).tf, clipPath: flip(r).clip, opacity: .6 }], { duration: 260, easing: "cubic-bezier(.4,0,.2,1)" })
      : card.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "scale(.96)" }], { duration: 160, easing: "ease-in" });
    $(".modal__backdrop").animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: "ease-in", fill: "forwards" });
    closing = anim; anim.onfinish = () => { if (closing === anim) { closing = null; done(); } };
  };

  const showModal = () => {
    if (closing) { closing.cancel(); closing = null; $(".modal__backdrop").getAnimations().forEach(a => a.cancel()); }
    if ($("#modal").hidden) lastFocus = document.activeElement;
    const wasOpen = !$("#modal").hidden;
    $("#modal").hidden = false; document.body.style.overflow = "hidden"; $("#modal").scrollTop = 0;
    const card = $(".modal__card"); card.style.animation = ""; card.style.transformOrigin = "";
    animateScene($("#modalBody .m-art .art__scene"), wasOpen ? 0 : 220);
    if (!wasOpen) expand(); else { expandFrom = null; card.animate([{ opacity: .4 }, { opacity: 1 }], { duration: 220, easing: "ease-out" }); }
    $(".modal__close").focus({ preventScroll: true });
  };
  const closeModal = () => {
    if ($("#modal").hidden || closing) return;
    fold(() => { $("#modal").hidden = true; document.body.style.overflow = ""; $(".modal__backdrop").getAnimations().forEach(a => a.cancel()); syncTop(); });
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  };
  const openStill = (src, cap) => { $("#lightbox").innerHTML = `<figure><img src="${esc(src)}" alt="${esc(cap)}"><figcaption>${esc(cap)}</figcaption></figure>`; $("#lightbox").hidden = false; };
  const closeMenu = () => { const m = $("#menu"); if (m && !m.hidden) { m.hidden = true; $("[data-menu]").setAttribute("aria-expanded", "false"); } };

  // ---------- Profiles ----------
  const AV = window.AVATARS || {};
  let faceN = 0;
  // each copy gets unique gradient ids, so a hidden copy can't break a visible one
  const face = p => {
    if (p.img) return `<img src="${esc(p.img)}" alt="${esc(p.villainName || p.name)}">`;
    const svg = AV[p.villain]; if (!svg) return esc(p.initial);
    const n = ++faceN;
    return svg.replace(/id="([^"]+)"/g, `id="$1-${n}"`).replace(/url\(#([^)]+)\)/g, `url(#$1-${n})`);
  };
  let profileId = null;
  const setProfile = pid => {
    const pr = D.profiles.find(p => p.id === pid) || D.profiles[0];
    profileId = pr.id;
    $("#profileBtn").innerHTML = face(pr); $("#profileBtn").style.background = pr.color; $("#profileBtn").title = `Switch profile (${pr.villainName || pr.name})`;
    try { sessionStorage.setItem("devaflix:profile", pr.id); } catch {}
    return pr;
  };
  const pickProfile = (pid, intro = true) => {
    const pr = setProfile(pid);
    const enter = () => go({ view: pr.view || "all", profile: pr.id });
    if (!intro || !window.DevaIntro) return enter();
    window.DevaIntro.play({ prepare: enter, onDone: () => { const a = $("#app"); a.classList.add("is-arriving"); setTimeout(() => a.classList.remove("is-arriving"), 950); } });
  };
  const syncSound = () => { const on = !window.DevaIntro || window.DevaIntro.soundOn(); $("#soundBtn").setAttribute("aria-pressed", String(on)); $("#soundBtn span").textContent = on ? "Sound on" : "Sound off"; };
  syncSound();
  $("#profiles").innerHTML = D.profiles.map(p => `
    <button class="profile" data-profile="${p.id}">
      <span class="profile__img" style="background:${p.color}">${face(p)}</span>
      <span class="profile__name">${esc(p.name)}</span>
      <span class="profile__sub">${p.villainName ? `<b>${esc(p.villainName)}</b> · ` : ""}${esc(p.sub || "")}</span>
    </button>`).join("");

  const o = D.owner;
  // CC BY / BY-SA photos need the photographer, licence and source named
  const credited = D.profiles.filter(p => p.credit);
  $("#credits").innerHTML = credited.length ? `Profile photos are cosplay photographs from Wikimedia Commons, cropped: ${credited.map(p =>
    `<a href="${esc(p.credit.url)}" target="_blank" rel="noopener">${esc(p.villainName)}</a> by ${esc(p.credit.by)} (${esc(p.credit.license)})`).join(", ")}.` : "";
  $("#footerAbout").innerHTML = `<h3>${esc(o.name)} · ${esc(o.title)}</h3><p>${esc(o.about)}</p>
    <div class="footer__links">${(o.links || []).map(l => `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</div>`;

  // ---------- Events ----------
  document.addEventListener("click", e => {
    const t = e.target;
    if (t.closest("#lightbox")) return closeTop();
    if (t.closest("#toTop")) return (!$("#modal").hidden ? $("#modal") : window).scrollTo({ top: 0, behavior: REDUCED.matches ? "instant" : "smooth" });
    if (t.closest("[data-menu]")) { const m = $("#menu"); m.hidden = !m.hidden; t.closest("[data-menu]").setAttribute("aria-expanded", String(!m.hidden)); return; }
    if (!t.closest("#menu")) closeMenu();
    const list = t.closest("[data-list]");
    if (list) { e.stopPropagation(); toggleList(list.dataset.list); if (current === "list" && $("#modal").hidden) render(); return; }
    if (t.closest("#soundBtn")) { window.DevaIntro && window.DevaIntro.setSound(!window.DevaIntro.soundOn()); return syncSound(); }
    const pf = t.closest("[data-profile]"); if (pf) return pickProfile(pf.dataset.profile, !pf.classList.contains("gate__skip"));
    const f = t.closest("[data-filter]"); if (f) { e.preventDefault(); closeMenu(); return goView(f.dataset.filter); }
    const sc = t.closest("[data-scroll]"); if (sc) { const tr = sc.parentElement.querySelector(".row__track"); tr.scrollBy({ left: +sc.dataset.scroll * tr.clientWidth * .85, behavior: "smooth" }); return; }
    const hd = t.closest("[data-hero]"); if (hd) { heroIdx = +hd.dataset.hero; renderHero(); return; }
    const st = t.closest("[data-still]"); if (st) return go({ ...route, still: st.dataset.still, cap: st.dataset.cap });
    if (t.closest("[data-ledger]")) return goModal("impact");
    if (t.closest("[data-close]")) return closeTop();
    const jp = t.closest("[data-jump]"); if (jp) { const el = document.getElementById(jp.dataset.jump); el && el.scrollIntoView({ behavior: "smooth" }); return; }
    const op = t.closest("[data-open]"); if (op) { expandFrom = originFor(op); return goModal(op.dataset.open); }
    if (t.closest("#profileBtn")) go({ gate: true });
  });
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (!$("#lightbox").hidden || !$("#modal").hidden) closeTop();
    else { closeMenu(); hidePreview(); }
  });
  $("#search").addEventListener("input", e => { $(".search").classList.toggle("has-value", !!e.target.value); render(); });
  addEventListener("scroll", () => $("#nav").classList.toggle("is-solid", scrollY > 40), { passive: true });
  PHONE.addEventListener("change", () => { if (!$("#app").hidden) render(); });

  // ---------- History ----------
  // Every page, title and still is a history entry, so Back (and swipe-back on phones) steps
  // through the site: title → page → Home → profiles, instead of leaving it.
  // URLs: #/cat:routing (page), #lead-routing-engine (title), #impact (ledger), #who (profiles).
  history.scrollRestoration = "manual";
  const VIEWS = ["all", "list", ...D.categories.map(c => `cat:${c.id}`), ...D.units.map(u => `unit:${u.id}`)];
  const urlFor = s => s.gate ? "#who" : s.modal ? `#${s.modal}` : s.view && s.view !== "all" ? `#/${s.view}` : location.pathname + location.search;
  const parse = hash => {
    const h = decodeURIComponent(hash.slice(1));
    if (h === "who") return { gate: true };
    if (h.startsWith("/") && VIEWS.includes(h.slice(1))) return { view: h.slice(1) };
    if (h === "impact" || D.projects.some(p => p.id === h)) return { view: "all", modal: h, depth: 1 };
    return { view: "all" };
  };
  let route = {}, shown = {};
  const apply = s => {
    const prev = shown; shown = s;
    if (s.gate) {
      hidePreview(); closeMenu(); closeModal(); $("#lightbox").hidden = true;
      $("#app").hidden = true; $("#gate").hidden = false;
      window.scrollTo({ top: 0, behavior: "instant" }); syncTop(); return;
    }
    if (s.profile && s.profile !== profileId) setProfile(s.profile);
    const entering = $("#app").hidden;
    $("#gate").hidden = true; $("#app").hidden = false;
    if (entering || s.view !== prev.view || s.fresh) {
      $("#search").value = ""; $(".search").classList.remove("has-value");
      render(s.view || "all");
      window.scrollTo({ top: s.y || 0, behavior: "instant" });
    }
    if (!s.modal) closeModal();
    else if (s.modal !== prev.modal || $("#modal").hidden) s.modal === "impact" ? openLedger() : openModal(s.modal);
    if (s.still) openStill(s.still, s.cap); else $("#lightbox").hidden = true;
    syncTop();
  };
  const go = (s, replace) => {
    if (!replace && !route.gate && !route.modal) history.replaceState({ ...route, y: scrollY }, "", location.href); // come back to the same spot
    route = s;
    history[replace ? "replaceState" : "pushState"](s, "", urlFor(s));
    apply(s);
  };
  const goView = view => {
    const searching = !!$("#search").value;
    if (view === route.view && route.modal) return closeTop();
    if (view === route.view && !route.modal && !route.gate) {
      if (searching) apply({ ...route, fresh: true });
      return window.scrollTo({ top: 0, behavior: "instant" });
    }
    go({ view, profile: profileId });
  };
  const goModal = id => {
    if (id === route.modal) return;
    go({ view: route.view || current, profile: profileId, modal: id, depth: route.modal ? (route.depth || 1) + 1 : 1 });
  };
  // close drops the still, or every stacked title, in one step back to the page underneath
  const closeTop = () => {
    if (route.still) return history.back();
    if (route.modal) return history.go(-(route.depth || 1));
    closeModal(); $("#lightbox").hidden = true; syncTop();
  };
  addEventListener("popstate", e => { route = e.state || parse(location.hash); apply(route); });

  // ---------- Back to top ----------
  const syncTop = () => {
    const inModal = !$("#modal").hidden, y = inModal ? $("#modal").scrollTop : scrollY;
    $("#toTop").classList.toggle("is-on", y > innerHeight * 1.2 && $("#gate").hidden && $("#lightbox").hidden);
  };
  addEventListener("scroll", syncTop, { passive: true });
  $("#modal").addEventListener("scroll", syncTop, { passive: true });

  // ---------- Boot ----------
  // A reload keeps its history entry. A fresh deep link gets Home underneath it, so Back lands on Home.
  let saved = null; try { saved = sessionStorage.getItem("devaflix:profile"); } catch {}
  const deep = parse(location.hash);
  if (history.state) { route = history.state; apply(route); }
  else if (location.hash && !deep.gate) {
    setProfile(saved || "all");
    go({ view: "all", profile: profileId }, true);
    if (deep.view !== "all" || deep.modal) go({ ...deep, profile: profileId });
  } else if (saved && !deep.gate) { const pr = setProfile(saved); go({ view: pr.view || "all", profile: pr.id }, true); }
  else go({ gate: true }, true);
})();
