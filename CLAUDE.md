# Scale Company — Guia do Projeto

## Stack
- **Framework:** Astro 5 (geração estática)
- **CSS:** Tailwind CSS v3 + `@astrojs/tailwind`
- **Linguagem:** TypeScript
- **Hosting:** A definir (Vercel ou Netlify recomendados)

## Estrutura de Pastas

```
src/
├── components/
│   ├── layout/       → Header, Footer, Nav, BaseHead
│   ├── sections/     → blocos de página (Hero, ServicesGrid, LocalCTA, ...)
│   ├── ui/           → componentes atômicos (Button, ServiceCard, Badge, ...)
│   └── seo/          → schemas JSON-LD (LocalBusiness, Service, Article)
├── content/blog/     → artigos em Markdown (.md)
├── data/             → dados centralizados (services.ts, cities.ts, navigation.ts)
├── layouts/          → BaseLayout, ServiceLayout, LocalLayout, BlogLayout
├── pages/            → rotas do site (arquivo = URL)
│   ├── servicos/     → páginas nacionais de serviço
│   ├── vila-velha/   → páginas locais VV (Fase 1)
│   ├── vitoria/      → páginas locais Vitória (Fase 2)
│   ├── serra/        → páginas locais Serra (Fase 2)
│   └── espirito-santo/ → hub estadual (Fase 3)
└── styles/
    └── global.css    → @tailwind directives + CSS vars + @layer components
```

## Tailwind — Padrões do Projeto

O projeto usa **Tailwind v3** com cores baseadas em variáveis CSS definidas em `src/styles/global.css`.

### Grupos de cores customizados

| Grupo | Uso | Exemplo de classe |
|-------|-----|-------------------|
| `brand.*` | Cores da marca | `bg-brand-primary`, `text-brand-primary` |
| `ink.*` | Texto | `text-ink`, `text-ink-light`, `text-ink-inverse` |
| `surface.*` | Fundos | `bg-surface-card`, `bg-surface-subtle` |
| `edge.*` | Bordas | `border-edge` |

### Para atualizar a identidade visual
Edite apenas `src/styles/global.css` — as variáveis `:root` controlam tudo:
```css
:root {
  --color-brand-primary: #0ea5e9;   /* ← substituir pela cor real */
  --color-brand-secondary: #0284c7;
  --font-body: system-ui;           /* ← substituir pela fonte real */
  --font-heading: system-ui;
}
```

### Classes utilitárias (@layer components em global.css)

```html
<!-- Container com max-width -->
<div class="container">...</div>
<div class="container-narrow">...</div>

<!-- Seção com padding vertical padrão -->
<section class="section">...</section>
<section class="section bg-surface-subtle">...</section>

<!-- Cabeçalho de seção -->
<div class="section-header">
  <span class="section-label">Label</span>
  <h2 class="section-title">Título</h2>
  <p class="section-subtitle">Subtítulo</p>
</div>
```

### Botões inline (padrão das páginas)
```html
<!-- Primary -->
<a href="..." class="px-8 py-4 text-lg font-semibold rounded-lg bg-brand-primary text-ink-inverse hover:bg-brand-secondary border-2 border-brand-primary transition-colors">
  CTA
</a>

<!-- Outline -->
<a href="..." class="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-ink-inverse transition-colors">
  CTA
</a>
```
> Ou use `<Button variant="primary" size="lg">` de `@components/ui/Button.astro`.

### Badge de cidade (padrão das páginas locais)
```html
<span class="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
  📍 Vila Velha – ES
</span>
```

### Cards de serviço/cidade
```html
<a href="..." class="block p-5 rounded-xl border border-edge bg-surface-card hover:border-brand-primary hover:shadow-md transition-all">
  <p class="font-semibold text-ink text-lg">Serviço</p>
</a>
```

## Path Aliases (use nos imports)

```ts
import Button from '@components/ui/Button.astro';
import BaseLayout from '@layouts/BaseLayout.astro';
import { services } from '@data/services';
import '@styles/global.css';
```

## Responsabilidades (2 devs)

| Área | Dev 1 (Tech/SEO) | Dev 2 (Conteúdo/Local) |
|------|------------------|------------------------|
| `src/components/` | ✅ cria e mantém | ⚠️ não criar sem avisar |
| `src/layouts/` | ✅ principal | lê, não edita |
| `src/pages/` | cria arquivos + estrutura | preenche textos e copy |
| `src/content/blog/` | — | ✅ principal |
| `src/data/` | ✅ estrutura TypeScript | ✅ preenche valores |
| `src/styles/global.css` | ✅ principal | só lê variáveis CSS |

## Git — Branches

```
main        → produção (só via PR de develop)
develop     → integração (sempre funcional)
dev1/sem1-setup        → Dev 1
dev2/sem1-conteudo-vv  → Dev 2
```

- **Commits em português, imperativo:** `adiciona página vila-velha/criacao-de-sites`
- **PR obrigatório** para develop — o outro dev revisa
- **Tags por fase:** `v1.0.0` (Fase 1), `v2.0.0` (Fase 2), `v3.0.0` (Fase 3)

## Como Adicionar uma Nova Página Local

1. Criar arquivo em `src/pages/[cidade]/[servico].astro`
2. Usar `LocalLayout` como layout base
3. Importar dados da cidade de `@data/cities`
4. Title tag: `"[Serviço] em [Cidade] – ES | Scale"`
5. Hero com badge de cidade, h1, descrição e CTAs — copiar padrão de `/vila-velha/criacao-de-sites.astro`

## Como Adicionar um Artigo de Blog

1. Criar arquivo `.md` em `src/content/blog/`
2. Preencher o frontmatter conforme schema em `src/content/config.ts`
3. O arquivo `src/pages/blog/[slug].astro` renderiza automaticamente

## Nomenclatura de Arquivos

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Componentes Astro | PascalCase | `ServiceCard.astro` |
| Páginas Astro | kebab-case | `criacao-de-sites.astro` |
| Data files | camelCase | `services.ts` |
| Artigos MD | kebab-case | `quanto-custa-criar-site.md` |
| Imagens | `categoria-nome.webp` | `service-criacao-de-sites.webp` |

## URLs do Site (mapa completo)

### Nacionais
- `/` — Home
- `/servicos` — Hub de serviços
- `/servicos/gestao-redes-sociais`
- `/servicos/trafego-pago`
- `/servicos/consultoria-seo`
- `/servicos/criacao-de-sites`
- `/servicos/criacao-de-landing-pages`
- `/servicos/email-marketing`
- `/cases`
- `/sobre`
- `/contato`
- `/blog` + `/blog/[slug]`

### Locais — Vila Velha (Fase 1)
- `/vila-velha` — hub local
- `/vila-velha/criacao-de-sites`
- `/vila-velha/criacao-de-landing-pages`
- `/vila-velha/seo`
- `/vila-velha/gestao-redes-sociais`
- `/vila-velha/trafego-pago`

### Locais — Vitória (Fase 2), Serra (Fase 2), ES (Fase 3)
- `/vitoria`, `/vitoria/criacao-de-sites`, `/vitoria/seo`
- `/serra`, `/serra/criacao-de-sites`
- `/espirito-santo`, `/espirito-santo/criacao-de-sites`
