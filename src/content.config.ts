import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Knowledge base — imported from the old Webflow site by scripts/import-kb.mjs.
// One Markdown file per article at src/content/kb/<slug>.md; images beside them in ./images/.
const kb = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/kb' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    category: z.string(),
    /** curated position from the old knowledge-base index — drives every list on the site */
    order: z.number().int(),
    sourceUrl: z.string().url(),
  }),
});

export const collections = { kb };
