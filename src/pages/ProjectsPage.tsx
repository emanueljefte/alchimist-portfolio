import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageWrapper from '@/src/components/PageWrapper';
import { projects } from '@/src/data/projects.data';

gsap.registerPlugin(ScrollTrigger);

const badgeStyles = {
  released: { cls: 'text-green-400 border-green-400/30 bg-green-400/10', dot: 'bg-green-400', label: 'v1.0.4 lançada' },
  beta:     { cls: 'text-amber-400 border-amber-400/30 bg-amber-400/10', dot: 'bg-amber-400', label: 'beta' },
  wip:      { cls: 'text-blue-400  border-blue-400/30  bg-blue-400/10',  dot: 'bg-blue-400',  label: 'em construção' },
} satisfies Record<string, { cls: string; dot: string; label: string }>;

const ALL = 'Todos';

const ProjectsPage = () => {
  const pageRef   = useRef<HTMLDivElement>(null);
  const cardsRef  = useRef<HTMLDivElement[]>([]);

  // lista única de tags para o filtro
  const allTags = [ALL, ...Array.from(new Set(projects.flatMap(p => p.tags)))];
  const [active, setActive] = useState(ALL);

  const filtered = active === ALL
    ? projects
    : projects.filter(p => p.tags.includes(active));

  const lançados = projects.filter(p => p.badgeType === 'released').length;

  // reset refs ao filtrar
  const addCard = (el: HTMLDivElement | null, i: number) => {
    if (el) cardsRef.current[i] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0,
            duration: 0.5,
            delay: i * 0.08,
            ease: 'power3.out',
            clearProps: 'all',
          }
        );
      });
    }, pageRef);

    return () => ctx.kill();
  }, [active]);

  return (
    <PageWrapper>
      <div ref={pageRef} className="max-w-7xl mx-auto px-6 py-16">

        {/* ── cabeçalho ── */}
        <div className="flex items-end justify-between gap-4 flex-wrap pb-8 border-b border-outline-variant/10 mb-8">
          <div>
            <span className="font-mono text-[11px] text-on-surface-variant/40 block mb-2 tracking-widest">
              ⚗ alchimist / projectos
            </span>
            <h1 className="font-headline text-4xl lg:text-5xl font-bold text-on-surface tracking-tight">
              Trabalhos
            </h1>
          </div>
          <div className="flex items-center gap-2 font-mono text-[12px] text-on-surface-variant/50">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {projects.length} projectos · {lançados} lançado{lançados !== 1 ? 's' : ''}
          </div>
        </div>

        {/* ── filtro ── */}
        <div className="flex gap-2 flex-wrap mb-8">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              className={`px-3 py-1.5 rounded-md border font-mono text-[11px] transition-all ${
                active === tag
                  ? 'bg-primary/10 border-primary/40 text-primary'
                  : 'bg-surface border-outline-variant/15 text-on-surface-variant hover:border-outline-variant/40'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ── grid ── */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-on-surface-variant/40 font-mono text-sm">
            nenhum projecto com essa tecnologia.
          </div>
        ) : (
          <div className="flex flex-col gap-4">

            {/* primeiro card — destaque */}
            {filtered[0] && (() => {
              const p = filtered[0];
              const badge = badgeStyles[p.badgeType];
              return (
                <Link
                  to={`/projects/${p.id}`}
                  ref={el => addCard(el as unknown as HTMLDivElement, 0)}
                  style={{ opacity: 0 }}
                  className="grid md:grid-cols-[2fr_1fr] rounded-xl border border-outline-variant/10 bg-surface overflow-hidden hover:border-primary/20 transition-all duration-300 group"
                >
                  <div className="p-6 flex flex-col gap-4 md:border-r border-outline-variant/10">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-on-surface-variant/30">
                        {String(p.index).padStart(2, '0')}
                      </span>
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-mono text-[11px] ${badge.cls}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        {p.badge}
                      </span>
                    </div>
                    <h2 className="font-headline text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">
                      {p.title}
                    </h2>
                    <p className="text-on-surface-variant text-sm leading-relaxed max-w-lg">
                      {p.tagline}
                    </p>
                    <div className="flex gap-2 flex-wrap mt-auto">
                      {p.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-md bg-background border border-outline-variant/10 font-mono text-[11px] text-on-surface-variant">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center bg-surface/50 min-h-[200px] relative overflow-hidden">
                    {p.heroImg
                      ? <img src={p.heroImg} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                      : <span className="font-mono text-[11px] text-on-surface-variant/30">screenshot</span>
                    }
                    <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              );
            })()}

            {/* restantes — grid 2 colunas */}
            {filtered.length > 1 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {filtered.slice(1).map((p, i) => {
                  const badge = badgeStyles[p.badgeType];
                  return (
                    <Link
                      key={p.id}
                      to={`/projects/${p.id}`}
                      ref={el => addCard(el as unknown as HTMLDivElement, i + 1)}
                      style={{ opacity: 0 }}
                      className="p-6 rounded-xl border border-outline-variant/10 bg-surface hover:border-primary/20 transition-all duration-300 group flex flex-col gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-on-surface-variant/30">
                          {String(p.index).padStart(2, '0')}
                        </span>
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-mono text-[11px] ${badge.cls}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          {p.badge}
                        </span>
                      </div>
                      <h2 className="font-headline text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                        {p.title}
                      </h2>
                      <p className="text-on-surface-variant text-sm leading-relaxed flex-1">
                        {p.tagline}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {p.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 rounded-md bg-background border border-outline-variant/10 font-mono text-[11px] text-on-surface-variant">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <ArrowRight className="w-4 h-4 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── rodapé ── */}
        <div className="mt-12 pt-6 border-t border-outline-variant/10 flex items-center justify-between flex-wrap gap-4">
          <span className="font-mono text-[11px] text-on-surface-variant/30">
            {filtered.length} projecto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </span>
          <a
            href="https://github.com/emanueljefte"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-primary/60 hover:text-primary transition-colors"
          >
            github.com/emanueljefte →
          </a>
        </div>

      </div>
    </PageWrapper>
  );
};

export default ProjectsPage;
