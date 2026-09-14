// 💋 Shake / Click / Key — Send a Kiss Feature (Mobile + Laptop)
(function () {
  const SHAKE_THRESHOLD = 14;
  const SHAKE_COOLDOWN  = 1800;

  let lastX = null, lastY = null, lastZ = null;
  let lastShakeTime = 0;

  /* ── Inject CSS ─────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    /* Big kiss emoji that pops in */
    .shake-kiss-emoji {
      position: fixed;
      font-size: 5em;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%) scale(0);
      animation: kissAppear 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    @keyframes kissAppear {
      0%   { transform: translate(-50%,-50%) scale(0) rotate(-20deg); opacity:1; }
      40%  { transform: translate(-50%,-50%) scale(1.4) rotate(10deg); opacity:1; }
      70%  { transform: translate(-50%,-50%) scale(1.1) rotate(-5deg); opacity:1; }
      100% { transform: translate(-50%,-50%) scale(1.3) rotate(0deg);  opacity:0; }
    }

    /* Burst hearts flying outward */
    .shake-burst-heart {
      position: fixed;
      font-size: 1.8em;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      animation: heartBurst 1.1s ease-out forwards;
    }
    @keyframes heartBurst {
      0%   { transform: translate(-50%,-50%) translate(0,0) scale(1);              opacity:1; }
      100% { transform: translate(-50%,-50%) translate(var(--tx),var(--ty)) scale(0.3); opacity:0; }
    }

    /* "Kiss Sent to Bubu!" toast */
    .shake-toast {
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: linear-gradient(135deg, #ff69b4, #ff85c1);
      color: #fff;
      font-family: 'Playfair Display', serif;
      font-size: 1.15em;
      padding: 14px 28px;
      border-radius: 50px;
      box-shadow: 0 8px 25px rgba(255,105,180,0.45);
      z-index: 10000;
      opacity: 0;
      white-space: nowrap;
      animation: toastIn 2.2s ease forwards;
      pointer-events: none;
    }
    @keyframes toastIn {
      0%   { opacity:0; transform: translateX(-50%) translateY(20px); }
      15%  { opacity:1; transform: translateX(-50%) translateY(0);    }
      75%  { opacity:1; transform: translateX(-50%) translateY(0);    }
      100% { opacity:0; transform: translateX(-50%) translateY(-10px);}
    }

    /* Ripple ring on shake */
    .shake-ripple {
      position: fixed;
      pointer-events: none;
      z-index: 9997;
      border-radius: 50%;
      border: 3px solid rgba(255,105,180,0.6);
      transform: translate(-50%,-50%) scale(0);
      animation: rippleOut 0.9s ease-out forwards;
    }
    @keyframes rippleOut {
      0%   { transform: translate(-50%,-50%) scale(0);   opacity:1; }
      100% { transform: translate(-50%,-50%) scale(4.5); opacity:0; }
    }

    /* Hint pill on load */
    .shake-hint-pill {
      position: fixed;
      bottom: 22px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: rgba(255,193,204,0.92);
      color: #8b0a50;
      font-family: 'Playfair Display', serif;
      font-size: 0.92em;
      padding: 10px 22px;
      border-radius: 50px;
      border: 2px dashed #ff69b4;
      box-shadow: 0 4px 15px rgba(255,105,180,0.25);
      z-index: 9990;
      white-space: nowrap;
      opacity: 0;
      animation: hintFade 4s ease forwards;
      pointer-events: none;
    }
    @keyframes hintFade {
      0%   { opacity:0; transform: translateX(-50%) translateY(20px); }
      12%  { opacity:1; transform: translateX(-50%) translateY(0);    }
      75%  { opacity:1; transform: translateX(-50%) translateY(0);    }
      100% { opacity:0; transform: translateX(-50%) translateY(-5px); }
    }

    /* 💋 Floating kiss button (always visible) */
    .shake-fab {
      position: fixed;
      bottom: 22px;
      right: 22px;
      width: 62px;
      height: 62px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff69b4, #ff85c1);
      border: 3px solid #fff;
      font-size: 1.9em;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 22px rgba(255,105,180,0.5);
      z-index: 9995;
      animation: fabPop 0.6s cubic-bezier(0.175,0.885,0.32,1.275) 1.2s both,
                 fabPulse 2.5s ease-in-out 2s infinite;
      transition: transform 0.15s ease;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    .shake-fab:hover  { transform: scale(1.12) rotate(-8deg); }
    .shake-fab:active { transform: scale(0.93); }
    @keyframes fabPop {
      0%   { opacity:0; transform: scale(0) rotate(-20deg); }
      70%  { transform: scale(1.15) rotate(5deg); }
      100% { opacity:1; transform: scale(1) rotate(0deg); }
    }
    @keyframes fabPulse {
      0%,100% { box-shadow: 0 6px 22px rgba(255,105,180,0.5); }
      50%      { box-shadow: 0 8px 30px rgba(255,105,180,0.75); }
    }

    /* Tooltip on the FAB */
    .shake-fab-tooltip {
      position: fixed;
      bottom: 94px;
      right: 22px;
      background: rgba(255,193,204,0.95);
      color: #8b0a50;
      font-family: 'Playfair Display', serif;
      font-size: 0.82em;
      padding: 7px 14px;
      border-radius: 12px;
      border: 2px dashed #ff69b4;
      box-shadow: 0 3px 12px rgba(255,105,180,0.25);
      z-index: 9994;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      animation: hintFade 4s ease 1.5s forwards;
    }

    /* iOS permission button */
    .shake-permission-btn {
      position: fixed;
      bottom: 90px;
      right: 22px;
      background: linear-gradient(135deg, #ffc1cc, #ffb3bf);
      color: #8b0a50;
      font-family: 'Playfair Display', serif;
      font-size: 0.85em;
      padding: 10px 16px;
      border-radius: 50px;
      border: 2px solid #fff;
      cursor: pointer;
      box-shadow: 0 5px 18px rgba(255,105,180,0.35);
      z-index: 9993;
      max-width: 200px;
      text-align: center;
      line-height: 1.4;
    }

    /* Key hint badge */
    .shake-key-badge {
      position: fixed;
      top: 16px;
      right: 16px;
      background: rgba(255,193,204,0.88);
      color: #8b0a50;
      font-family: 'Playfair Display', serif;
      font-size: 0.8em;
      padding: 7px 14px;
      border-radius: 50px;
      border: 2px dashed #ff69b4;
      box-shadow: 0 3px 10px rgba(255,105,180,0.2);
      z-index: 9990;
      opacity: 0;
      pointer-events: none;
      animation: hintFade 4s ease 1.8s forwards;
    }
  `;
  document.head.appendChild(style);

  /* ── Core kiss effect ────────────────────────────────────────── */
  const HEARTS = ['💕','💗','💖','💓','💝','❤️','🌸','✨'];

  function sendKiss(cx, cy) {
    // cx/cy in px → convert to vw/vh strings
    const x = (cx != null ? cx + 'px' : (25 + Math.random() * 50) + 'vw');
    const y = (cy != null ? cy + 'px' : (20 + Math.random() * 40) + 'vh');

    // 😘 pop
    const kissEl = document.createElement('div');
    kissEl.className = 'shake-kiss-emoji';
    kissEl.innerHTML = '😘';
    kissEl.style.left = x;
    kissEl.style.top  = y;
    document.body.appendChild(kissEl);
    setTimeout(() => kissEl.remove(), 1500);

    // Ripple
    const ripple = document.createElement('div');
    ripple.className = 'shake-ripple';
    ripple.style.cssText = `left:${x};top:${y};width:80px;height:80px;`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 950);

    // Burst hearts
    for (let i = 0; i < 10; i++) {
      const angle    = (i / 10) * 360 + Math.random() * 20;
      const distance = 70 + Math.random() * 90;
      const tx = Math.cos(angle * Math.PI / 180) * distance;
      const ty = Math.sin(angle * Math.PI / 180) * distance;
      const h = document.createElement('div');
      h.className = 'shake-burst-heart';
      h.innerHTML = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      h.style.cssText = `left:${x};top:${y};--tx:${tx}px;--ty:${ty}px;`;
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1150);
    }

    // Toast
    const toast = document.createElement('div');
    toast.className = 'shake-toast';
    toast.innerHTML = '💋 Kiss Sent to Bubu! 😘';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2300);
  }

  /* Cooldown guard shared across all triggers */
  let lastKissTime = 0;
  function tryKiss(cx, cy) {
    const now = Date.now();
    if (now - lastKissTime < SHAKE_COOLDOWN) return;
    lastKissTime = now;
    sendKiss(cx, cy);
  }

  /* ── 1. Phone shake ──────────────────────────────────────────── */
  function onMotion(e) {
    const acc = e.accelerationIncludingGravity;
    if (!acc) return;
    const { x, y, z } = acc;
    if (lastX === null) { lastX = x; lastY = y; lastZ = z; return; }
    const delta = Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ);
    lastX = x; lastY = y; lastZ = z;
    if (delta > SHAKE_THRESHOLD) tryKiss(null, null);
  }

  /* ── 2. Keyboard — press K ───────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'k' || e.key === 'K') tryKiss(null, null);
  });

  /* ── 3. Floating 💋 FAB button ──────────────────────────────── */
  function createFAB() {
    const fab = document.createElement('button');
    fab.className = 'shake-fab';
    fab.innerHTML = '💋';
    fab.title = 'Send a kiss!';
    fab.addEventListener('click', function (e) {
      e.stopPropagation();
      tryKiss(null, null);
    });
    document.body.appendChild(fab);

    // Tooltip
    const tip = document.createElement('div');
    tip.className = 'shake-fab-tooltip';
    tip.innerHTML = 'Click to send a kiss! 😘';
    document.body.appendChild(tip);
  }

  /* ── Hint pill ───────────────────────────────────────────────── */
  function showHint() {
    // Mobile hint
    if (window.DeviceMotionEvent) {
      const pill = document.createElement('div');
      pill.className = 'shake-hint-pill';
      pill.innerHTML = '📱 Shake to send a kiss! 😘';
      document.body.appendChild(pill);
      setTimeout(() => pill.remove(), 4200);
    }
    // Desktop hint
    const badge = document.createElement('div');
    badge.className = 'shake-key-badge';
    badge.innerHTML = '⌨️ Press <b>K</b> to send a kiss 😘';
    document.body.appendChild(badge);
    setTimeout(() => badge.remove(), 5800);
  }

  /* ── Init ────────────────────────────────────────────────────── */
  function init() {
    // Always create the FAB (works on all devices)
    createFAB();

    // Show hints after a short delay
    setTimeout(showHint, 1600);

    // Mobile motion
    if (window.DeviceMotionEvent) {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // iOS 13+ — show permission button
        const btn = document.createElement('button');
        btn.className = 'shake-permission-btn';
        btn.innerHTML = '📱 Enable Shake-to-Kiss 😘';
        btn.onclick = function () {
          DeviceMotionEvent.requestPermission().then(state => {
            if (state === 'granted') {
              window.addEventListener('devicemotion', onMotion);
              btn.remove();
            }
          }).catch(console.error);
        };
        document.body.appendChild(btn);
      } else {
        // Android & others
        window.addEventListener('devicemotion', onMotion);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
