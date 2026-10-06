# Jakob Olsen / خالد الأسعد — Experience Gallery

A responsive React/Vite portfolio presented as four connected architectural exhibition rooms: **experience, projects, volunteering and education**. The artwork follows the approved sandstone, teal and gold reference; all navigation and portfolio content are accessible native HTML.

## Run and verify

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
npm test
npm run build
```

The development server runs on port 4173. `npm run dev -- --host 0.0.0.0 --port 4173` is also supported. The build outputs `dist/`, compatible with the existing Vercel Vite project.

## Visitor experience

- Choose a room through its gallery entrance, the header, the persistent mobile dock or the accessible menu.
- The gallery entrance briefly zooms toward the selected room. Direct room switching stays fast; reduced-motion preferences remove the camera animation.
- Native hash links support shared destinations, refresh, browser Back/Forward and modifier-click. Old `#energy`, `#volunteer` and `#media` links still resolve.
- English, Arabic, Norwegian and French remain available. Arabic uses RTL reading order; the physical gallery and room order remain consistent. Language and appearance persist when storage is available.
- Story, digital work, original photography, the drone video and every existing contact link remain accessible through the menu and gallery links.
- Original photographs open in a native modal with previous/next controls, keyboard arrows, Escape and focus restoration.
- Mobile navigation respects safe areas. No scroll locking or gesture is required to move through the portfolio.

## Content and design

| File                    | Responsibility                                                  |
| ----------------------- | --------------------------------------------------------------- |
| `src/content/index.js`  | Existing translated professional content and contact URLs       |
| `src/storyContent.js`   | Existing narrative and project descriptions                     |
| `src/mediaGallery.js`   | Original photography and video references                       |
| `src/galleryContent.js` | Localized gallery UI and entrance coordinates                   |
| `src/navigation.js`     | Destinations, legacy links and resilient preferences            |
| `src/App.jsx`           | Semantic screens, navigation, modal focus and room interactions |
| `src/gallery.css`       | Responsive layout, themes, focus and motion                     |
| `src/typography.css`    | Locally hosted Inter and IBM Plex Sans Arabic                   |

Generated artwork has 480px, 900px and 1440px WebP variants in `public/media/gallery/`. `assets.json` records source dimensions, hashes and exported sizes. Images select their size through `srcset`; only the current room image loads. No WebGL runtime or remote font requests are required.

To regenerate delivery variants from the original generated PNGs (named `overview.png`, `experience.png`, `projects.png`, `volunteering.png`, `education.png`):

```sh
node scripts/prepare-gallery-assets.mjs /path/to/source-images
```

`design-reference.md` records the approved visual decisions. `design-qa.md` and `qa/` contain source comparisons and real browser captures. `qa/mobile.html` is a development-only iframe viewport harness, excluded from the production build. It checks responsive web layouts; it does not emulate a physical phone or mobile OS.

The quality workflow runs locked dependency installation, interaction tests and a production build on pull requests and relevant pushes. Production deployment uses the existing Vercel setup after the review branch is merged.
