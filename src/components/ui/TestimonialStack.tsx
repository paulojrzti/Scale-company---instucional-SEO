import React, { useState, useRef, useEffect, useCallback, type CSSProperties } from 'react';

export interface Testimonial {
  id: string | number;
  initials: string;
  name: string;
  role: string;
  quote: string;
  tags: { text: string; type: 'featured' | 'default' }[];
  avatarGradient: string;
}

export interface TestimonialStackProps {
  testimonials: Testimonial[];
  visibleBehind?: number;
}

export const TestimonialStack = ({ testimonials, visibleBehind = 2 }: TestimonialStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalCards = testimonials.length;

  const navigate = useCallback((newIndex: number) => {
    setActiveIndex((newIndex + totalCards) % totalCards);
  }, [totalCards]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (index !== activeIndex) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartRef.current);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    if (Math.abs(dragOffset) > 50) {
      navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, activeIndex, navigate]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  // Auto-play
  useEffect(() => {
    if (isDragging) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % totalCards);
    }, 5000);
    return () => clearInterval(timer);
  }, [isDragging, totalCards]);

  if (!testimonials?.length) return null;

  return (
    <div className="ts-root">
      <div className="ts-stack">
        {testimonials.map((testimonial, index) => {
          const displayOrder = (index - activeIndex + totalCards) % totalCards;

          const style: CSSProperties = {};
          if (displayOrder === 0) {
            style.transform = `translateX(${dragOffset}px)`;
            style.opacity = 1;
            style.zIndex = totalCards;
          } else if (displayOrder <= visibleBehind) {
            const scale = 1 - 0.05 * displayOrder;
            const translateY = -2 * displayOrder;
            style.transform = `scale(${scale}) translateY(${translateY}rem)`;
            style.opacity = 1 - 0.25 * displayOrder;
            style.zIndex = totalCards - displayOrder;
          } else {
            style.transform = 'scale(0)';
            style.opacity = 0;
            style.zIndex = 0;
          }

          return (
            <div
              ref={el => { cardRefs.current[index] = el; }}
              key={testimonial.id}
              className="ts-card"
              style={style}
              onMouseDown={(e) => handleDragStart(e, index)}
              onTouchStart={(e) => handleDragStart(e, index)}
            >
              <div className="ts-card-inner">
                <div className="ts-header">
                  <div className="ts-avatar" style={{ background: testimonial.avatarGradient }}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h3 className="ts-name">{testimonial.name}</h3>
                    <p className="ts-role">{testimonial.role}</p>
                  </div>
                </div>

                <blockquote className="ts-quote">"{testimonial.quote}"</blockquote>

                <div className="ts-footer">
                  <div className="ts-tags">
                    {testimonial.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`ts-tag ${tag.type === 'featured' ? 'ts-tag-featured' : ''}`}
                      >
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ts-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            aria-label={`Ir para depoimento ${index + 1}`}
            onClick={() => navigate(index)}
            className={`ts-dot ${activeIndex === index ? 'ts-dot-active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

// Pre-configured Scale testimonials
const scaleTestimonials: Testimonial[] = [
  {
    id: 1,
    initials: 'JV',
    name: 'João Vitor',
    role: 'CEO — Construtora JVS',
    quote: 'A Scale mudou completamente nosso marketing. Saímos de zero leads para mais de 60 por mês em apenas 3 meses. O relatório mensal é claro e mostra exatamente onde o dinheiro está indo.',
    tags: [{ text: 'DESTAQUE', type: 'featured' }, { text: 'Tráfego Pago', type: 'default' }],
    avatarGradient: 'linear-gradient(135deg, #1630DF, #00BAFF)',
  },
  {
    id: 2,
    initials: 'AM',
    name: 'Ana Maria',
    role: 'Diretora — Clínica Vida Plena',
    quote: 'Antes da Scale, gastávamos com agência e não víamos resultado. Agora estamos na primeira página do Google e os agendamentos triplicaram. Transparência total em cada passo.',
    tags: [{ text: 'SEO', type: 'default' }, { text: 'Google Ads', type: 'default' }],
    avatarGradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    id: 3,
    initials: 'RM',
    name: 'Ricardo Mendes',
    role: 'Sócio — Grupo Mendes',
    quote: 'O site que a Scale criou não é só bonito. Ele converte. Em 4 meses já estávamos ranqueando para as principais palavras-chave do nosso segmento. Resultado real.',
    tags: [{ text: 'Site', type: 'default' }, { text: 'SEO', type: 'featured' }],
    avatarGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    id: 4,
    initials: 'CS',
    name: 'Camila Santos',
    role: 'Proprietária — Studio CS',
    quote: 'A gestão de redes sociais da Scale transformou nossa presença online. Engajamento aumentou 400% e começamos a receber clientes direto pelo Instagram. Recomendo de olhos fechados.',
    tags: [{ text: 'Redes Sociais', type: 'default' }, { text: 'Conteúdo', type: 'default' }],
    avatarGradient: 'linear-gradient(135deg, #ec4899, #d946ef)',
  },
  {
    id: 5,
    initials: 'PL',
    name: 'Pedro Lima',
    role: 'Diretor Comercial — TechES',
    quote: 'O diagnóstico gratuito já valeu mais do que meses com a agência anterior. A Scale entende de negócio, não só de marketing. Nosso custo por lead caiu 60% no primeiro trimestre.',
    tags: [{ text: 'Performance', type: 'featured' }],
    avatarGradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  },
];

export default function ScaleTestimonials() {
  return <TestimonialStack testimonials={scaleTestimonials} />;
}
