// =============================================================================
// content/config.ts — Schema das Content Collections (Astro)
// Define e valida o frontmatter dos artigos do blog
// =============================================================================

import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    /** Título do artigo (usado em <title> e <h1>) */
    title: z.string(),

    /** Resumo para meta description e card do blog (max 160 chars) */
    description: z.string().max(160),

    /** Data de publicação */
    publishDate: z.coerce.date(),

    /** Data de atualização (opcional) */
    updatedDate: z.coerce.date().optional(),

    /** Caminho da imagem de capa: /assets/images/blog/nome.webp */
    coverImage: z.string().optional(),

    /** Alt text da imagem de capa */
    coverImageAlt: z.string().optional(),

    /** Categoria do artigo */
    category: z.enum([
      'criacao-de-sites',
      'landing-pages',
      'seo',
      'trafego-pago',
      'redes-sociais',
      'email-marketing',
      'marketing-digital',
      'local',
      'nicho',
    ]),

    /** Tags para filtragem e relacionados */
    tags: z.array(z.string()).default([]),

    /** true = artigo destacado no topo do blog */
    featured: z.boolean().default(false),

    /** Tempo de leitura estimado (gerado automaticamente se não informado) */
    readingTime: z.number().optional(),

    /** Cidade alvo (para artigos locais) */
    city: z.string().optional(),

    /** Palavra-chave principal (para SEO) */
    focusKeyword: z.string().optional(),
  }),
});

export const collections = { blog };
