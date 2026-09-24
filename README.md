# The Secrets of the Universe

Source for the website. Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), deployed on Vercel.

## Run it locally

```sh
npm install
npm run dev
```

Then open http://localhost:4321.

## Write an entry

Each entry is a Markdown file inside the folder of its topic:

```
src/content/entries/religion/
src/content/entries/philosophy/
src/content/entries/life/
src/content/entries/body/
```

The file name becomes the address, so `philosophy/on-free-will.md` is published at `/philosophy/on-free-will/`.

Start the file with this block, then write the entry underneath in Markdown:

```md
---
title: On free will
description: One or two sentences shown in search results and link previews.
date: 2026-09-24
order: 1
---
```

- `order` sets the position in the topic list and for the Previous and Next buttons. 1 comes first.
- `date` appears under the title as month and year.
- Add `draft: true` to keep an entry off the live site. Drafts still show while `npm run dev` is running. This repository is public, so a committed draft can still be read on GitHub.

## Home page statement

Write the short statement for the home page in `src/content/home.md`. While the file is empty, nothing is shown.

## Topics, description and links

Topic names and their order, the site description and any footer links live in `src/config.js`.

## Publish

Commit and push to `main`. Once the repository is connected to Vercel, every push is built and deployed automatically.

## Fonts

Titles use Noto Serif Display, text uses Literata and buttons use Fredoka, all under the SIL Open Font License. The font files and their licenses are in `src/assets/fonts`.
