# My Portfolio Site

---

## 📂 Project Structure

```text
folio/
├── public/
│   ├── images/               # Custom project illustrations (ax, Vellum, etc.)
│   └── favicon.svg           # Dynamic theme-adapting SVG favicon
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro  # HTML envelope, metadata, font loads, theme scripts
│   ├── components/
│   │   ├── Navbar.astro      # Sticky scroll-aware nav header & mobile drawer
│   │   ├── Footer.astro      # Dynamic copyright notice & footer links
│   │   ├── ThemeToggle.astro # Sun/Moon toggle with spring rotation animation
│   │   ├── Hero.astro        # Staggered name & tagline presentation
│   │   ├── SkillsGrid.astro  # Custom toolkit card grid with inline SVG icons
│   │   ├── ProjectCard.astro # Card with bleeding image wrapper and external link tags
│   │   └── SocialLinks.astro # Reusable social icons component
│   ├── pages/
│   │   ├── index.astro       # Home - Intro & featured projects
│   │   ├── about.astro       # Bio detailing Arch daily-driving, systems logic, & toolkit
│   │   ├── projects.astro    # Catalog listing ax, Vellum, HeadMod, & shortun
│   │   └── contact.astro     # Availability details & copy-to-clipboard email card
│   ├── data/
│   │   └── projects.json     # Project descriptions, tags, and repo links
│   └── styles/
│       └── global.css        # Core design tokens, CSS variables, resets, & utilities
├── astro.config.mjs          # Prefetching and site metadata
├── package.json              # Astro 7 configurations
└── tsconfig.json             # TypeScript settings
```
