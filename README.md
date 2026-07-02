# Jakob Olsen Portfolio

A clean, mobile-first portfolio website built with **Vite**, **React**, and **Tailwind CSS**.

The portfolio uses a **Nordic Energy Intelligence** visual identity and includes an interactive map connecting three portfolio pillars:

| Country | Portfolio story |
|---|---|
| Syria | Syrian Renewables — renewable energy data platform |
| Morocco | Renewable Energy Certificates — certificates and market transparency |
| Norway | M.Sc. Renewable Energy Systems — University of Oslo academic foundation |

## Visual Identity

| Element | Value |
|---|---|
| Primary color | Nordic Teal `#217A8D` |
| Dark color | Energy Navy `#0B1F2A` |
| Text color | Deep Graphite `#232B2B` |
| Background | Arctic White `#F7FAF9` |
| Accent | Solar Gold `#F2B84B` |
| Secondary accent | Clean Green `#3A9D5D` |

## Local Development

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Production Build

```bash
npm run build
```

The optimized site will be generated in the `dist` folder.

## Deploying to Vercel

1. Go to Vercel and choose **Add New Project**.
2. Import this GitHub repository.
3. Use these settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

After deployment, Vercel will automatically redeploy when changes are pushed to the `main` branch.
