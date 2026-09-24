import { getCollection } from 'astro:content';
import { TOPICS } from '../config.js';

// Drafts show while running `npm run dev` and are left out of the published site.
const isVisible = ({ data }) => import.meta.env.DEV || !data.draft;

export async function getTopics() {
  const entries = await getCollection('entries', isVisible);
  const ids = TOPICS.map((topic) => topic.id);

  for (const entry of entries) {
    const [folder] = entry.id.split('/');
    if (!ids.includes(folder)) {
      throw new Error(`${entry.filePath} is in "${folder}", which is not a topic. Move it into one of: ${ids.join(', ')}.`);
    }
  }

  return TOPICS.map((topic) => ({
    ...topic,
    entries: entries
      .filter((entry) => entry.id.startsWith(`${topic.id}/`))
      .sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title))
      .map((entry) => ({ ...entry, slug: entry.id.slice(topic.id.length + 1), href: `/${entry.id}/` })),
  }));
}

export const formatMonth = (date) =>
  date.toLocaleDateString('en', { month: 'long', year: 'numeric', timeZone: 'UTC' });
