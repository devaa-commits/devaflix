// Profile-enter intro: a red "D" that breaks into light ribbons, with a synthesized two-hit sting.
// Everything here is original (no Netflix audio or footage). Respects reduced motion and the sound toggle.
window.DevaIntro = (() => {
  const RIBBONS = ["#e50914", "#b20710", "#ff3d5a", "#ff7a00", "#ffd166", "#f2f2f2", "#7b2cbf", "#3a86ff", "#e50914", "#8a0a12"];
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  const soundOn = () => { try { return localStorage.getItem("devaflix:sound") !== "off"; } catch { return true; } };
  const setSound = on => { try { localStorage.setItem("devaflix:sound", on ? "on" : "off"); } catch {} };

  // Two low impacts (a short pickup, then a long boom) over a rising shimmer chord.
  const sting = () => {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const C = new AC(), t0 = C.currentTime + 0.05;
    const out = C.createGain(); out.gain.value = 0.8;
    const comp = C.createDynamicsCompressor(); out.connect(comp); comp.connect(C.destination);
    // small generated room so the hits bloom instead of clicking
    const rev = C.createConvolver(), len = C.sampleRate * 2.4, ir = C.createBuffer(2, len, C.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2); }
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
    setTimeout(() => C.close(), 4200);
  };

  let running = null;
  const play = ({ sound = soundOn(), onDone } = {}) => {
    if (sound) { try { sting(); } catch {} }
    if (reduced()) { onDone && onDone(); return; }
    const el = document.getElementById("intro");
    const beams = el.querySelector(".intro__beams");
    beams.innerHTML = Array.from({ length: 34 }, (_, i) => {
      const c = RIBBONS[(i * 7) % RIBBONS.length], w = 2 + ((i * 13) % 7);
      return `<i style="--c:${c};--w:${w}px;--x:${(i - 17) * 9}px;--d:${(i % 11) * 22}ms"></i>`;
    }).join("");
    el.hidden = false; el.classList.remove("is-out");
    void el.offsetWidth;
    el.classList.add("is-on");
    const finish = () => {
      if (!running) return;
      clearTimeout(running.t1); running = null;
      el.classList.add("is-out");
      onDone && onDone();
      setTimeout(() => { el.hidden = true; el.classList.remove("is-on", "is-out"); }, 650);
    };
    running = { t1: setTimeout(finish, 1750) };
    el.onclick = finish;
    addEventListener("keydown", finish, { once: true });
  };

  return { play, soundOn, setSound };
})();
