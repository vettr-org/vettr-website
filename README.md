# Worked With website

The Worked With marketing site, integrated into the existing Next.js 16.3.6 / React 19 App Router starter from `develop`.

## Run locally

Use the Node.js version supported by Next.js 16 and the package manager pinned in `package.json` (`pnpm@12.6.0`). This integration was checked with Node.js 22.23.2.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000.

```sh
pnpm lint
pnpm build
pnpm start
```

The existing Next.js, React, Tailwind, TypeScript, and lockfile versions are unchanged. Styling lives in `app/globals.css`, with the starter's Tailwind setup retained. There are no additional runtime dependencies or external font/CDN requests.

## Routes

| Route | Content |
| --- | --- |
| `/` | Full marketing homepage |
| `/contact` | Contact form with all five requested topics |
| `/terms` | Existing Terms of Service draft from the supplied Figma template |
| `/privacy` | Matching legal layout with privacy content placeholder |

The legal draft retains its supplied `[Date]`, `[ADDRESS]`, legacy mail destinations, and other placeholders. Replace these with your approved content before publishing. No new legal terms or privacy policy were authored for this integration.

## Components

- `components/site-header.tsx`: fixed, transparent navigation; samples section backgrounds and updates contrast after scrolling, resizing, or client-side navigation.
- `components/site-footer.tsx` and `brand.tsx`: shared links and branding.
- `components/phone-preview.tsx`: reusable, decorative app illustration assembled from local assets.
- `components/store-links.tsx`: shared App Store / Google Play buttons with complete 360 × 120 PNGs rendered at 120 × 40.
- `components/phrase-cycler.tsx`: one shuffled 15-phrase deck shared by two annotation positions; 360ms entrance, 4-second hold, 260ms fade-out, then a 300ms pause before the next entrance. Pauses in background tabs, respects reduced motion, and cleans up on route changes.
- `components/contact-form.tsx`: client-side validation and Supabase-backed submission via server action.
- `components/terms-content.tsx`: supplied legal content, rendered as static React markup.

All images and brand fonts are under `public/assets`. Font license notices supplied with the original assets are retained. Confirm your existing Visby CF and New York Small web-font licensing before public distribution.

The latest standalone refinements are included: right-hand annotation moved up/right by 12px, 3× store PNGs in both sections, and “resumé” spelling throughout the site.

## Backend integration

The contact form posts to the `submitContact` server action in `app/contact/actions.ts`, which validates the fields and inserts a row into Supabase `public.contact_submissions` using a server-only client (`SUPABASE_URL` and `SUPABASE_SECRET_KEY`). `SUPABASE_SECRET_KEY` must be the **service_role** secret from Supabase → Project Settings → API Keys — the anon/publishable key will fail inserts. Copy `.env.example` to `.env.local` for local development (typically Vettr STAGING). Production hosting should point at Vettr PROD. Do not commit secrets or expose them as `NEXT_PUBLIC_` variables.

The server-rendered submit button remains disabled until hydration, preventing accidental no-JavaScript submission. Failed inserts keep the entered text and show a generic error.

Store buttons dispatch `workedwith:store-click` on `window` and log `[WorkedWith] store-click`, with `store` (`app-store` / `google-play`) and `placement` (`hero` / `hiring`). They do not navigate.

## Verification

- ESLint passed.
- TypeScript and the Next.js production build passed using `pnpm exec next build --webpack`.
- The default Turbopack compiler encountered a local sandbox restriction when creating its PostCSS worker's port. The repository's default build command is unchanged; Webpack is an official alternate Next.js compiler.
- Production site checked at 320, 390, 768, 1024, 1440, and 1920 pixels, with no horizontal overflow.
- Desktop section and heading geometry matched the original standalone site within 2 pixels.
- Browser checks covered all routes, hydration, client-side navigation, background-aware header contrast, four 3× PNG badges and click events, contact validation and event handoff, animation remounts, two complete nonrepeating phrase cycles, reduced motion, and the no-JavaScript form fallback.
- No browser JavaScript errors or failed requests during those checks.

## Design references

- Homepage: https://www.figma.com/design/EKIgZOgADcvgE2MgQioucD/Untitled?node-id=5-1086
- Contact: https://www.figma.com/design/EKIgZOgADcvgE2MgQioucD/Untitled?node-id=27-1398
- Legal template: https://www.figma.com/design/EKIgZOgADcvgE2MgQioucD/Untitled?node-id=27-3213
