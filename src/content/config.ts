import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const docs = defineCollection({
	schema: z.object({
		title: z.string(),
	}),
});

export const collections = { 
	blog, 
	cores: docs,
	components: docs,
	templates: docs
};
