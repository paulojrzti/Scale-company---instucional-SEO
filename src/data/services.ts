// =============================================================================
// services.ts — Dados centralizados dos 6 serviços da Scale Company
// Edite aqui; as mudanças refletem em todo o site automaticamente.
// =============================================================================

export interface Service {
  /** ID único, usado para referências internas */
  id: string;
  /** Nome completo do serviço */
  name: string;
  /** Slug nacional: /servicos/[slug] */
  slug: string;
  /** Slug nas páginas locais: /[cidade]/[localSlug] */
  localSlug: string;
  /** Descrição longa para página e meta description */
  description: string;
  /** Descrição curta para cards */
  shortDesc: string;
  /** Emoji de ícone */
  icon: string;
  /** Volume de busca estimado (nacional) */
  volume: string;
  /** Tags de categoria (exibidas nos cards) */
  tags: string[];
  /** Serviço para upsell (nome exibido) */
  upsell?: string;
  /** Keywords principais para SEO (meta, h1, etc.) */
  keywords: string[];
}

export const services: Service[] = [
  {
    id: 'redes-sociais',
    name: 'Gestão de Redes Sociais',
    slug: 'gestao-redes-sociais',
    localSlug: 'gestao-redes-sociais',
    description:
      'Social media completo: criação de conteúdo, calendário editorial, estratégia de crescimento e relatórios mensais de performance.',
    shortDesc: 'Social media, criação de conteúdo e relatórios mensais',
    icon: '📱',
    volume: '~9.900 buscas/mês',
    tags: ['Recorrente', 'Alto volume local'],
    upsell: 'Tráfego Pago',
    keywords: [
      'gestão de redes sociais',
      'social media para empresas',
      'criação de conteúdo para redes sociais',
    ],
  },
  {
    id: 'trafego-pago',
    name: 'Tráfego Pago',
    slug: 'trafego-pago',
    localSlug: 'trafego-pago',
    description:
      'Gestão profissional de Google Ads e Meta Ads com foco em ROAS. Relatório de performance mensal e otimização contínua.',
    shortDesc: 'Google Ads, Meta Ads e relatório de ROAS',
    icon: '💰',
    volume: '~6.600 buscas/mês',
    tags: ['Alta conversão', 'Recorrente'],
    upsell: 'Landing Pages',
    keywords: [
      'tráfego pago para empresas',
      'gestão google ads',
      'gestão meta ads',
      'agência de tráfego pago',
    ],
  },
  {
    id: 'seo',
    name: 'Consultoria de SEO',
    slug: 'consultoria-seo',
    localSlug: 'seo',
    description:
      'Consultoria e gestão mensal de SEO: auditoria técnica, otimização on-page, produção de conteúdo estratégico e link building.',
    shortDesc: 'SEO técnico, conteúdo e link building',
    icon: '🔍',
    volume: '~3.600 buscas/mês',
    tags: ['Novo serviço', 'Recorrente'],
    upsell: 'Criação de Conteúdo',
    keywords: [
      'consultoria de SEO',
      'agência de SEO',
      'otimização de site para Google',
      'posicionamento no Google',
    ],
  },
  {
    id: 'criacao-de-sites',
    name: 'Criação de Sites',
    slug: 'criacao-de-sites',
    localSlug: 'criacao-de-sites',
    description:
      'Sites institucionais responsivos com SEO técnico incluso: velocidade otimizada, CMS para edição fácil e entrega em até 30 dias.',
    shortDesc: 'Sites institucionais com SEO e CMS incluso',
    icon: '🌐',
    volume: '~33.000 buscas/mês est.',
    tags: ['Novo serviço', 'Alto volume'],
    upsell: 'SEO + Redes Sociais',
    keywords: [
      'criação de site para empresa',
      'criar site profissional',
      'desenvolvimento de site',
      'site institucional para empresa',
    ],
  },
  {
    id: 'landing-pages',
    name: 'Landing Pages',
    slug: 'criacao-de-landing-pages',
    localSlug: 'criacao-de-landing-pages',
    description:
      'Páginas de alta conversão para campanhas de tráfego, lançamentos e captação de leads — com design focado em resultado.',
    shortDesc: 'Páginas de conversão para campanhas e lançamentos',
    icon: '⚡',
    volume: '~8.100 buscas/mês est.',
    tags: ['Novo serviço', 'Alta intenção'],
    upsell: 'Tráfego Pago',
    keywords: [
      'criação de landing page',
      'landing page profissional',
      'landing page para google ads',
      'página de conversão',
    ],
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    slug: 'email-marketing',
    localSlug: 'email-marketing',
    description:
      'Automações de email, nutrição de leads, newsletters estratégicas e integração com CRM para aumentar retenção e LTV.',
    shortDesc: 'Automações, newsletters e nutrição de leads',
    icon: '📧',
    volume: '~2.400 buscas/mês',
    tags: ['Complementar', 'Recorrente'],
    keywords: [
      'email marketing para empresas',
      'automação de email',
      'newsletter profissional',
    ],
  },
];

/** Retorna um serviço pelo slug nacional */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Retorna um serviço pelo localSlug */
export function getServiceByLocalSlug(localSlug: string): Service | undefined {
  return services.find((s) => s.localSlug === localSlug);
}
