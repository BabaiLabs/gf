# 💝 Will You Be My Bubu?

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-Love-ff69b4?style=for-the-badge&logo=heart&logoColor=white" alt="Made with Love">
  <img src="https://img.shields.io/badge/Aesthetic-Coquette%20Lovecore-ffc1cc?style=for-the-badge" alt="Coquette Aesthetic">
  <img src="https://img.shields.io/badge/Works%20on-Mobile%20%26%20Desktop-db7093?style=for-the-badge" alt="Cross Platform">
  <img src="https://img.shields.io/badge/Dependencies-Zero-ff85c1?style=for-the-badge" alt="Zero Dependencies">
</p>

<p align="center">
  A fully interactive, animated love proposal website — handcrafted with pure HTML, CSS & JavaScript. No frameworks. No installs. Just love. 💌
</p>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🙅 **Unbeatable "No" Button** | Cycles through guilt-trip messages while the "Yes" button grows bigger with every click |
| 💋 **Shake to Send a Kiss** | Shake your phone, press `K`, or tap the 💋 button — a burst of hearts flies across the screen |
| 🎀 **Coquette Lovecore UI** | Soft pinks, dashed borders, ribbon bows, handwritten fonts — full Pinterest aesthetic |
| 🫧 **Spring Physics Animations** | Every element squishes, pops, and bounces with CSS spring keyframes |
| 🎬 **Animated Heart Loader** | A spinning paper heart preloader sets the mood before the big question |
| 🎉 **Celebration Yes Page** | Pulsing text, floating hearts, and pure serotonin when they say yes |
| 📱 **Fully Responsive** | Pixel-perfect on phones, tablets, and desktops |
| 📴 **Offline Support** | Service Worker caches all assets — works without internet after first load |

---

## 📁 Project Structure

```
💝 will-you-be-my-bubu/
│
├── index.html          ← Main proposal page
├── yes_page.html       ← Celebration page (when they say yes!)
│
├── styles.css          ← Main page styles (coquette lovecore theme)
├── yes_style.css       ← Yes page styles with celebration animations
├── loader.css          ← Animated heart loader styles
│
├── script.js           ← "No" button logic & Yes button growth
├── shake.js            ← 💋 Shake / Key / Button kiss feature
├── loader.js           ← Loader timing logic
├── sw.js               ← Service Worker (offline caching)
│
├── waiting.webp        ← Image shown on the proposal page
└── yes.webp            ← Image shown on the celebration page
```

---

## 🚀 Getting Started

No installs. No build tools. Open and go.

```bash
# 1. Clone the repo
git clone https://github.com/your-username/will-you-be-my-bubu.git

# 2. Open in browser
open index.html
```

> **Deploy for free:** Push to GitHub → Settings → Pages → Deploy from `main`. Done. 🎀

---

## 🎨 Customisation

| What to change | File | What to edit |
|---|---|---|
| Their name / nickname | `index.html` | The `<h1>` tag text |
| The main question | `index.html` | The `<h2>` tag text |
| "No" button messages | `script.js` | The `messages` array |
| Proposal image | Root folder | Replace `waiting.webp` |
| Celebration image | Root folder | Replace `yes.webp` |
| Celebration message | `yes_page.html` | The last `<h1>` tag |
| Colors & fonts | `styles.css` | Gradients & CSS variables |

---

## 💋 Shake to Send a Kiss — How It Works

Works across **all devices** with three trigger methods:

| Device | How to trigger |
|---|---|
| 📱 Android | Shake your phone |
| 🍎 iPhone (iOS 13+) | Tap the permission button, then shake |
| 💻 Laptop / Desktop | Press the `K` key |
| 🖱️ Any device | Click the **💋** floating button (bottom-right corner) |

Every kiss trigger fires:
- 😘 Giant kiss emoji pops & fades
- 💕 10 hearts burst outward in all directions
- 🌊 Pink ripple ring radiates from the kiss
- 💋 *"Kiss Sent to Bubu!"* toast slides up from the bottom

---

## 🛠️ Tech Stack

- **HTML5** — Semantic, clean markup
- **CSS3** — Keyframe animations, spring physics, gradients, responsive design
- **Vanilla JavaScript** — Zero dependencies, pure love
- **Service Worker API** — Offline-first PWA support
- **DeviceMotion API** — Phone shake detection

> No frameworks. No `npm install`. No build steps. Just vibes. 🌸

---

## 📖 How to Use

1. **Customise** — Swap the images, edit the names and messages
2. **Preview** — Open `index.html` in any browser
3. **Deploy** — Host free on GitHub Pages, Netlify, or Vercel
4. **Send** — Share the link and wait for the magic ✨

---

<p align="center">
  <b>Made with 💖 for my Bubu.</b><br>
  <i>Every line of code is a love letter.</i>
</p>
