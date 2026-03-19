/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],

  theme: {
    extend: {
      /**
       * CORES — mapeadas para CSS vars definidas em global.css
       * Quando os assets da empresa chegarem:
       *   1. Abra src/styles/global.css
       *   2. Preencha os valores de --color-brand-* e --color-surface-*
       *   3. Nada mais precisa mudar — tudo atualiza automaticamente
       *
       * Grupos de cor disponíveis:
       *   brand.primary / brand.secondary / brand.accent
       *   ink (DEFAULT=heading) / ink.mid / ink.light / ink.inverse
       *   surface.page / surface.card / surface.subtle
       *   edge (DEFAULT=border)
       */
      colors: {
        brand: {
          primary:   'var(--color-brand-primary)',
          secondary: 'var(--color-brand-secondary)',
          accent:    'var(--color-brand-accent)',
        },
        ink: {
          DEFAULT: 'var(--color-text-primary)',
          mid:     'var(--color-text-secondary)',
          light:   'var(--color-text-muted)',
          inverse: 'var(--color-text-on-dark)',
        },
        surface: {
          page:   'var(--color-surface-page)',
          card:   'var(--color-surface-card)',
          subtle: 'var(--color-surface-subtle)',
        },
        edge: {
          DEFAULT: 'var(--color-border)',
          strong:  'var(--color-border-strong)',
        },
      },

      /**
       * TIPOGRAFIA — preencher após definir as fontes da empresa
       * Ex: fontFamily: { body: ['Inter', 'system-ui', 'sans-serif'] }
       */
      fontFamily: {
        body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
      },

      /** Max-width container (1200px do design) */
      maxWidth: {
        site: '1200px',
      },

      /** Z-index semântico */
      zIndex: {
        dropdown: '100',
        sticky:   '200',
        overlay:  '300',
        modal:    '400',
      },

      /** Transições padrão */
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },

  plugins: [],
};
