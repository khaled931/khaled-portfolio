# Jakob Olsen / خالد الأسعد — A House for My Work

A multilingual React/Vite portfolio with a connected 3D courtyard house as its home screen. Normal page scrolling opens the front door and moves the camera through education, professional experience, projects and community work. Direct native pages contain the full portfolio.

## Run and verify

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
npm test
npm run build
```

Vite serves the project on port 4173. The production output is `dist/`, compatible with the existing Vercel project.

## Visitor experience

- Start outside a complete sandstone house. Scroll normally or activate “Scroll to enter” to begin walking through it.
- The camera travels through real openings in one model. The oak door opens before the camera reaches it; the route passes around the courtyard olive tree.
- A compact chapter rail jumps to a room along the tour. Drag horizontally to look around; normal vertical phone scrolling and browser pinch zoom remain available.
- “Browse sections”, the header and menu provide direct access. The home screen has no giant doorway arrows, zoom toolbar or fixed bottom dock. Native detail pages retain their navigation dock.
- English, Arabic, Norwegian and French remain available. Labels and text localize; the physical architecture stays in the same orientation. Language and theme persist where browser storage is available.
- With reduced motion, data saving or unavailable WebGL, the home screen becomes a single static entrance with a complete native section directory. No long, empty scrolling space is required.
- Original photography, video, digital work, factual content and contact URLs remain available. Shared hash links, old aliases, browser history, keyboard focus and native dialogs are preserved.

## Implementation

| File | Role |
| --- | --- |
| `src/HouseJourney.jsx` | Sticky tour, native scroll measurement, chapter UI and resilient content access |
| `src/houseScene.js` | Physical house, local geometry and textures, lighting, doors, look gestures and demand rendering |
| `src/houseGeometry.js` | Metric texture coordinates, beveled joinery, shaped olive leaves and static mesh batching |
| `src/houseMaterials.js`, `src/assets/house/` | Self-hosted photographic PBR surfaces, HDR sky and source/license records |
| `src/houseJourney.js` | Continuous camera route, portrait framing and chapter stops |
| `src/houseContent.js` | Tour copy in four languages |
| `src/house.css` | Responsive home layout, text contrast, compact controls and static mode |
| `src/App.jsx` | Detail pages, header, contact, dialogs, history and accessible navigation |
| `src/content/index.js`, `src/storyContent.js` | Existing professional facts and translated descriptions |
| `public/media/house/` | Optimized generated entrance illustration and its provenance |

The WebGL runtime loads only on the home route. Rendering pauses after movement settles, outside the viewport and when the document is hidden. Static opaque geometry is batched by material; shadow maps update when doors or lighting change. All geometry and textures are served locally. Mobile pixel density and foliage density are capped. Photographic wood and plaster textures and an HDR daylight capture come from Poly Haven under CC0; complete source URLs are recorded in `src/assets/house/sources.json`. The generated static illustration is not a screenshot of the interactive model.

## Private review artifact

```sh
node scripts/build-review.mjs /absolute/path/jakob-portfolio-house-preview.html
```

This builds one HTML file with code, fonts and portfolio images embedded. Open the downloaded file in a browser to review it. The command neither pushes to GitHub nor deploys a website. Its temporary build directory is ignored by git.

## Verification status

Interaction and camera tests, portrait camera-frustum checks and the production build are local checks. Actual desktop/mobile WebGL rendering and visual comparison still require an accessible authorized preview. `house-design-reference.md` records the direction and the browser / publication blockers encountered during this change. Existing `design-qa.md` and `qa/` screenshots document the previous gallery, not the new house.
