// =============================================================================
// navigation.ts — Itens do menu principal
// =============================================================================

export interface NavItem {
  label: string;
  href: string;
  /** true = abre dropdown com subitens */
  hasDropdown?: boolean;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    label: 'Serviços',
    href: '/servicos',
    hasDropdown: true,
    children: [
      { label: 'Criação de Sites',        href: '/servicos/criacao-de-sites' },
      { label: 'Landing Pages',           href: '/servicos/criacao-de-landing-pages' },
      { label: 'Tráfego Pago',            href: '/servicos/trafego-pago' },
      { label: 'Gestão de Redes Sociais', href: '/servicos/gestao-redes-sociais' },
      { label: 'Consultoria de SEO',      href: '/servicos/consultoria-seo' },
      { label: 'Email Marketing',         href: '/servicos/email-marketing' },
    ],
  },
  {
    label: 'Cases',
    href: '/cases',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Sobre',
    href: '/sobre',
  },
];

/** Item CTA (botão no menu) */
export const ctaNav: NavItem = {
  label: 'Falar com especialista',
  href: '/contato',
};
