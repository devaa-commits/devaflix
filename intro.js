// Profile-enter intro: a red "D" that breaks into light ribbons, with a synthesized two-hit sting.
// Everything here is original (no Netflix audio or footage). Respects reduced motion and the sound toggle.
window.DevaIntro = (() => {
  const RIBBONS = ["#e50914", "#b20710", "#ff3d5a", "#ff7a00", "#ffd166", "#f2f2f2", "#7b2cbf", "#3a86ff", "#e50914", "#8a0a12"];
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  const soundOn = () => { try { return localStorage.getItem("devaflix:sound") !== "off"; } catch { return true; } };
  const setSound = on => { try { localStorage.setItem("devaflix:sound", on ? "on" : "off"); } catch {} };

  const RATE = 44100;
  let tailCache = null;
  const roomTail = () => tailCache || (tailCache = [0, 1].map(() => {
    const len = RATE * 1.8, d = new Float32Array(len);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
    return d;
  }));
  // Opening the audio device costs ~200ms on macOS, so do it (suspended) while the profile screen is idle;
  // the click then only resumes it. One context is reused for every play.
  let ctx = null;
  const audio = () => {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!ctx && AC) { try { ctx = new AC({ sampleRate: RATE }); } catch { ctx = null; } }
    return ctx;
  };
  (window.requestIdleCallback || (f => setTimeout(f, 300)))(() => { roomTail(); if (soundOn()) audio(); });

  // Two low impacts (a short pickup, then a long boom) over a rising shimmer chord.
  const sting = () => {
    const C = audio(); if (!C) return;
    if (C.state === "suspended") C.resume();
    const t0 = C.currentTime + 0.05;
    const out = C.createGain(); out.gain.value = 0.8;
    const comp = C.createDynamicsCompressor(); out.connect(comp); comp.connect(C.destination);
    // small generated room so the hits bloom instead of clicking (tail precomputed off the click)
    const tail = roomTail(), rev = C.createConvolver(), ir = C.createBuffer(2, tail[0].length, RATE);
    ir.copyToChannel(tail[0], 0); ir.copyToChannel(tail[1], 1);
    rev.buffer = ir; const wet = C.createGain(); wet.gain.value = 0.32; out.connect(rev); rev.connect(wet); wet.connect(comp);

    const env = (g, t, peak, dur) => { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); };
    const hit = (t, f, dur, vol) => {
      const sub = C.createOscillator(), gs = C.createGain();
      sub.type = "sine"; sub.frequency.setValueAtTime(f * 2.4, t); sub.frequency.exponentialRampToValueAtTime(f, t + 0.08);
      env(gs, t, vol, dur); sub.connect(gs); gs.connect(out); sub.start(t); sub.stop(t + dur + 0.1);
      const body = C.createOscillator(), lp = C.createBiquadFilter(), gb = C.createGain();
      body.type = "sawtooth"; body.frequency.setValueAtTime(f * 2, t);
      lp.type = "lowpass"; lp.frequency.setValueAtTime(2200, t); lp.frequency.exponentialRampToValueAtTime(140, t + dur * 0.7);
      env(gb, t, vol * 0.28, dur * 0.8); body.connect(lp); lp.connect(gb); gb.connect(out); body.start(t); body.stop(t + dur + 0.1);
      const n = C.createBufferSource(), nb = C.createBuffer(1, C.sampleRate * 0.05, C.sampleRate), nd = nb.getChannelData(0);
      for (let i = 0; i < nd.length; i++) nd[i] = (Math.random() * 2 - 1) * (1 - i / nd.length);
      const gn = C.createGain(); gn.gain.value = vol * 0.25; n.buffer = nb; n.connect(gn); gn.connect(out); n.start(t);
    };
    hit(t0, 49, 0.32, 0.9);
    hit(t0 + 0.3, 36.7, 2.4, 1);
    [146.8, 220, 293.7, 440, 587.3].forEach((f, i) => {
      const o = C.createOscillator(), lp = C.createBiquadFilter(), g = C.createGain(), s = t0 + 0.45;
      o.type = "sawtooth"; o.frequency.value = f; o.detune.value = (i % 2 ? 7 : -7);
      lp.type = "lowpass"; lp.frequency.setValueAtTime(300, s); lp.frequency.exponentialRampToValueAtTime(3200, s + 1.4);
      g.gain.setValueAtTime(0.0001, s); g.gain.exponentialRampToValueAtTime(0.035, s + 1.1); g.gain.exponentialRampToValueAtTime(0.0001, s + 2.6);
      o.connect(lp); lp.connect(g); g.connect(out); o.start(s); o.stop(s + 2.7);
    });
    setTimeout(() => out.disconnect(), 4200);
  };

  let running = null;
  // prepare() does the heavy work (building the page) behind a black screen, before anything moves
  const play = ({ sound = soundOn(), prepare, onDone } = {}) => {
    if (reduced()) { prepare && prepare(); if (sound) { try { sting(); } catch {} } onDone && onDone(); return; }
    const el = document.getElementById("intro");
    const beams = el.querySelector(".intro__beams");
    beams.innerHTML = Array.from({ length: 34 }, (_, i) => {
      const c = RIBBONS[(i * 7) % RIBBONS.length], w = 2 + ((i * 13) % 7);
      return `<i style="--c:${c};--w:${w}px;--x:${(i - 17) * 9}px;--d:${(i % 11) * 22}ms"></i>`;
    }).join("");
    el.hidden = false; el.classList.remove("is-out", "is-on");
    const raf = f => requestAnimationFrame(() => requestAnimationFrame(f));
    let prepared = false;
    raf(() => {
      if (!prepared) { prepare && prepare(); prepared = true; }
      if (!running) return; // skipped during the black frame: page is ready, just lift the screen
      raf(() => {
        if (!running) return;
        if (sound) { try { sting(); } catch {} }
        el.classList.add("is-on");
        running.t1 = setTimeout(finish, 1750);
      });
    });
    const finish = () => {
      if (!running) return;
      if (!prepared) { prepare && prepare(); prepared = true; }
      clearTimeout(running.t1); running = null;
      el.classList.add("is-out");
      onDone && onDone();
      setTimeout(() => { el.hidden = true; el.classList.remove("is-on", "is-out"); }, 650);
    };
    running = { t1: 0 };
    el.onclick = finish;
    addEventListener("keydown", finish, { once: true });
  };

  return { play, soundOn, setSound };
})();
