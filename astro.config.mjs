import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Each face is split into two files. Browsers only download latin-ext
// when a page uses one of its characters (ā, ṣ, ʿ and similar).
const LATIN = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2190-2193, U+2212, U+2215, U+FEFF, U+FFFD';
const LATIN_EXT = 'U+0100-0130, U+0132-0151, U+0154-024F, U+0259, U+02B0-02BA, U+02BD-02C5, U+02C7-02D9, U+02DB, U+02DD-02FF, U+0300-0303, U+0305-0307, U+0309-0328, U+032A-036F, U+1E00-1EFF';

const file = (name) => `./src/assets/fonts/${name}.woff2`;

// Latin must stay first: Base.astro preloads the first file of each face.
const face = (name, weight, style = 'normal') => [
  { src: [file(`${name}-latin`)], weight, style, unicodeRange: [LATIN] },
  { src: [file(`${name}-latin-ext`)], weight, style, unicodeRange: [LATIN_EXT] },
];

// Vercel sets this to the production domain (a custom domain once one is added),
// so canonical links and share previews always point at the live site.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export default defineConfig({
  site: productionHost ? `https://${productionHost}` : 'http://localhost:4321',
  compressHTML: true,
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Noto Serif Display',
      cssVariable: '--typeface-display',
      fallbacks: ['serif'],
      options: { variants: face('noto-serif-display-condensed-medium', 500) },
    },
    {
      provider: fontProviders.local(),
      name: 'Literata',
      cssVariable: '--typeface-body',
      fallbacks: ['serif'],
      options: {
        variants: [
          ...face('literata-regular', 400),
          ...face('literata-semibold', 600),
          ...face('literata-italic', 400, 'italic'),
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Fredoka',
      cssVariable: '--typeface-button',
      fallbacks: ['sans-serif'],
      options: {
        variants: [{ src: [file('fredoka-expanded-regular-latin')], weight: 400, style: 'normal' }],
      },
    },
  ],
});
