# 🚀 Manikandan — Personal Portfolio Website

> A premium, enterprise-grade personal portfolio website built with HTML5, CSS3, and JavaScript (ES6). Inspired by the design language of Apple, Stripe, Linear, and Vercel.

<br/>

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-E44D26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-264DE4?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F0DB4F?style=flat-square&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-Mobile--First-06B6D4?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Sections](#-sections)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Responsive Design](#-responsive-design)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Author](#-author)

---

## 🌟 Overview

This is a fully responsive, production-ready personal portfolio website for **Manikandan**, Software Engineer at Splendin Software Private Limited, Chennai. The design follows a **dark glassmorphism** aesthetic with neon gradient accents, animated particles, and smooth AOS scroll animations — built entirely without any frontend framework, using only vanilla HTML, CSS, and JavaScript.

---

## 🔗 Live Demo

> Deploy to GitHub Pages, Netlify, or Vercel to get a live URL.

```
https://manikandan-s-portfolio.vercel.app/
```

---

## ✨ Features

### Design & Theme
- 🌑 **Dark Mode** (default) with deep navy glassmorphism
- ☀️ **Light Mode** toggle with smooth transition
- 💾 Theme preference saved via `localStorage`
- 🎨 Neon gradient accents — Indigo · Cyan · Violet
- 🪟 Glassmorphism cards with `backdrop-filter: blur()`
- ✨ Glowing orb background effects

### Animations & Interactions
- 🌌 Particle canvas background with connecting lines
- ⌨️ Typing effect cycling through 5 role titles
- 🔢 Animated counters for statistics
- 📊 Skill progress bars with smooth fill animation
- 🎬 AOS (Animate On Scroll) reveal effects
- 🌀 Rotating gradient avatar ring
- 🏷️ Floating technology badges (desktop)
- 🖱️ Hover overlays on project cards

### Navigation & UX
- 📌 Sticky glassmorphism navbar
- 🔦 Active section highlighting on scroll
- 📱 Mobile hamburger menu with glass dropdown
- ⬆️ Back-to-top button (appears on scroll)
- 💬 Contact form with validation and success toast
- 🔗 Smooth scroll between all sections

---

## 📄 Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Animated intro with name, typing role, CTA buttons, social links |
| 2 | **About** | Personal bio, contact info card, animated stat counters |
| 3 | **Experience** | Professional timeline at Splendin Software |
| 4 | **Skills** | Tabbed dashboard — Frontend, Backend, Database, Tools, Concepts |
| 5 | **Projects** | E-Flora · Startup UI · Departmental Portal with hover reveal |
| 6 | **Education** | Vertical timeline — MCA (Alagappa) · B.Sc. (JJ College) |
| 7 | **Contact** | Form with validation + contact info + social links |
| 8 | **Footer** | Quick links, socials, copyright |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure, accessibility |
| **CSS3** | Glassmorphism, animations, CSS variables |
| **JavaScript ES6** | Interactivity, canvas particles, typing effect |
| **Bootstrap 5.3** | Responsive grid, utility classes, collapse |
| **Font Awesome 6.5** | Icons throughout the site |
| **Google Fonts** | Syne (display) + DM Sans (body) |
| **AOS 2.3** | Animate On Scroll library |

> **Zero build tools required.** No npm, no webpack, no bundler. Pure static files.

---

## 📁 Project Structure

```
manikandan-portfolio/
│
├── index.html        # Main HTML — all 9 sections
├── style.css         # All styles, variables, animations, responsive
├── script.js         # Particles, typing, counters, tabs, form, AOS
└── README.md         # This file
```

### Key CSS Architecture

```
style.css
├── CSS Custom Properties (:root variables)
├── Reset & Base
├── Particle Canvas
├── Navbar (glassmorphism)
├── Hero Section (orbs, avatar ring, badges)
├── Shared Section Styles (glass cards, tags, titles)
├── About (info card, stats grid)
├── Experience (timeline)
├── Skills (tabs + progress bars)
├── Projects (hover overlay cards)
├── Education (vertical timeline)
├── Contact (form + info panel)
├── Footer
├── Utilities (back-to-top, toast)
└── Responsive Breakpoints
    ├── ≤ 991px  (tablet landscape)
    ├── ≤ 768px  (tablet portrait)
    ├── ≤ 575px  (large phones)
    └── ≤ 400px  (small phones)
```

### Key JS Modules

```
script.js
├── initTheme()           — dark/light toggle + localStorage
├── initParticles()       — canvas particle system with connecting lines
├── initAOS()             — scroll-reveal animation setup
├── initNavbar()          — sticky nav + active link highlighting
├── initTypingEffect()    — multi-phrase typewriter with delete/retype
├── initSkillTabs()       — tab switching + re-animate bars
├── initSkillBars()       — IntersectionObserver for bar fill animation
├── initCounters()        — animated number count-up
├── initContactForm()     — validation + simulated send + toast
└── initBackToTop()       — scroll-aware visibility button
```

---

## 🚀 Getting Started

### Prerequisites

No installation needed. Just a modern browser.

### Run Locally

**Option 1 — Open directly**
```bash
# Clone or download the project
git clone https://github.com/Manikandan0328/portfolio.git
cd portfolio

# Open index.html in your browser
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

**Option 2 — Live Server (VS Code)**
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Opens at `http://127.0.0.1:5500`

**Option 3 — Python HTTP server**
```bash
# Python 3
python -m http.server 8080

# Then open: http://localhost:8080
```

---

## 📱 Responsive Design

The site is mobile-first and tested across all screen sizes:

| Breakpoint | Target Devices | Key Adjustments |
|------------|---------------|-----------------|
| `> 991px` | Desktop / Laptop | Full layout, floating badges, side-by-side columns |
| `≤ 991px` | Tablet Landscape | Glass navbar dropdown, centered hero, avatar 190px |
| `≤ 768px` | Tablet Portrait | Stacked CTA buttons, single-column skills, scroll indicator hidden |
| `≤ 575px` | Large Phones | Scrollable skills tabs, stacked experience cards, badges hidden |
| `≤ 400px` | Small Phones (SE) | Minimum padding, reduced avatar (130px), compact typography |

No horizontal scrolling on any device.

---

## 🎨 Customization

### Change Colors
Edit CSS variables at the top of `style.css`:

```css
:root {
  --bg-primary:    #050816;   /* Main background */
  --bg-secondary:  #0B1120;   /* Alt section background */
  --clr-primary:   #4F46E5;   /* Indigo — primary brand color */
  --clr-secondary: #06B6D4;   /* Cyan — secondary accents */
  --clr-accent:    #8B5CF6;   /* Violet — tertiary accents */
}
```

### Change Fonts
Replace the Google Fonts import in `index.html` and update the variables:

```css
:root {
  --font-display: 'Your Display Font', sans-serif;
  --font-body:    'Your Body Font', sans-serif;
}
```

### Update Personal Info
All personal content is in `index.html`. Search and replace:
- `Manikandan` — your name
- `smanikandanmani123@gmail.com` — your email
- `+91 9976008508` — your phone
- LinkedIn / GitHub URLs in all `href` attributes

### Update Typing Phrases
In `script.js`, edit the `phrases` array inside `initTypingEffect()`:

```js
const phrases = [
  'Software Engineer',
  'ASP.NET Developer',
  'Full Stack Developer',
  // Add your own...
];
```

### Add a Real Profile Photo
In `index.html`, replace the `.avatar-initials` div inside `.avatar-inner`:

```html
<div class="avatar-inner">
  <img src="your-photo.jpg" alt="Manikandan"
       style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />
</div>
```

### Connect the Contact Form
The form currently simulates a 1.5s send delay. To make it functional, replace the `setTimeout` block in `initContactForm()` with a real service:

```js
// Option 1 — Formspree (free)
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, subject, message })
});

// Option 2 — EmailJS
emailjs.send('SERVICE_ID', 'TEMPLATE_ID', { name, email, subject, message });
```

---

## 🌐 Deployment

### GitHub Pages (Free)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/Manikandan0328/portfolio.git
git push -u origin main

# 2. Go to: GitHub repo → Settings → Pages
# 3. Source: Deploy from branch → main → / (root)
# 4. Save → your site is live at:
#    https://manikandan0328.github.io/portfolio
```

### Netlify (Free, Drag & Drop)

1. Go to [netlify.com](https://netlify.com)
2. Drag the project folder into the Netlify dashboard
3. Get an instant live URL like `https://manikandan-portfolio.netlify.app`

### Vercel (Free)

```bash
npm install -g vercel
cd manikandan-portfolio
vercel
# Follow the prompts — deployed in under 60 seconds
```

---

## 👤 Author

**Manikandan**

- 🏢 Software Engineer — Splendin Software Private Limited, Chennai
- 🎓 MCA — Alagappa University (2023–2025)
- 🎓 B.Sc. Computer Science — JJ College of Arts and Science (2020–2023)
- 📍 Tamil Nadu, India

| Platform | Link |
|----------|------|
| LinkedIn | [linkedin.com/in/mani03ms](https://www.linkedin.com/in/mani03ms/) |
| GitHub | [github.com/Manikandan0328](https://github.com/Manikandan0328) |
| Email | smanikandanmani123@gmail.com |
| Phone | +91 9976008508 |

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

```
MIT License — Copyright (c) 2026 Manikandan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files, to deal in the Software
without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software.
```

---

<div align="center">

**⭐ If you found this helpful, give the repo a star!**

Made with ❤️ in Chennai, Tamil Nadu, India

© 2026 Manikandan. All Rights Reserved.

</div>
