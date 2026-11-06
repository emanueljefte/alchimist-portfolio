import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageWrapper from '@/src/components/PageWrapper';

gsap.registerPlugin(ScrollTrigger);

interface Tech {
  name: string;
  level: number; // 0-100
  note?: string;
}

interface Category {
  label: string;
  icon: string;
  techs: Tech[];
}

const stack: Category[] = [
  {
    label: 'Frontend',
    icon: '🖥️',
    techs: [
      { name: 'React',       level: 90, note: 'uso diário' },
      { name: 'TypeScript',  level: 88, note: 'uso diário' },
      { name: 'TailwindCSS', level: 85 },
      { name: 'Next.js',     level: 70 },
      { name: 'GSAP',        level: 72, note: 'animações complexas' },
    ],
  },
  {
    label: 'Mobile',
    icon: '📱',
    techs: [
      { name: 'React Native', level: 88, note: 'uso diário' },
      { name: 'Expo',         level: 85, note: 'uso diário' },
      { name: 'Expo Router',  level: 82 },
    ],
  },
  {
    label: 'Backend',
    icon: '⚙️',
    techs: [
      { name: 'Node.js',  level: 78 },
      { name: 'Express',  level: 75 },
      { name: 'FastAPI',  level: 60 },
      { name: 'Supabase', level: 80, note: 'RLS, edge functions' },
    ],
  },
  {
    label: 'Base de dados & ORM',
    icon: '🗄️',
    techs: [
      { name: 'SQLite + Drizzle',   level: 85, note: 'mobile / offline-first' },
      { name: 'PostgreSQL + Prisma', level: 75 },
      { name: 'PostgreSQL + Drizzle',level: 72 },
    ],
  },
  {
    label: 'Linguagens',
    icon: '💬',
    techs: [
      { name: 'TypeScript', level: 88 },
      { name: 'JavaScript', level: 90 },
      { name: 'Python',     level: 65 },
      { name: 'Java',       level: 55 },
      { name: 'SQL',        level: 75 },
    ],
  },
  {
    label: 'Infra & Cloud',
    icon: '☁️',
    techs: [
      { name: 'Vercel',   level: 80 },
      { name: 'Netlify',  level: 75 },
      { name: 'Supabase', level: 80 },
    ],
  },
];

const levelLabel = (n: number) => {
  if (n >= 85) return 'avançado';
  if (n >= 70) return 'intermédio';
  return 'básico';
};

const levelColor = (n: number) => {
  if (n >= 85) return 'text-green-400';
  if (n >= 70) return 'text-amber-400';
  return 'text-blue-400';
};

const TechPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  cardsRef.current = [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
            delay: (i % 3) * 0.08,
          }
        );
      });

      // barras de progresso animam ao entrar
      gsap.utils.toArray<HTMLElement>('.tech-bar-fill').forEach(bar => {
        const target = bar.dataset.level ?? '0';
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: target + '%',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <PageWrapper>
      <div ref={pageRef} className="max-w-7xl mx-auto px-6 py-16">

        {/* cabeçalho */}
        <div className="pb-8 border-b border-outline-variant/10 mb-12">
          <span className="font-mono text-[11px] text-on-surface-variant/40 block mb-2 tracking-widest">
            ⚗ alchimist / arsenal
          </span>
          <h1 className="font-headline text-4xl lg:text-5xl font-bold text-on-surface tracking-tight mb-3">
            Arsenal Técnico
          </h1>
          <p className="text-on-surface-variant text-sm max-w-lg leading-relaxed">
            Ferramentas que uso no dia-a-dia — com nível de confiança honesto, não marketing.
          </p>
        </div>

        {/* grid de categorias */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {stack.map((cat, ci) => (
            <div
              key={cat.label}
              ref={el => { if (el) cardsRef.current[ci] = el; }}
              style={{ opacity: 0 }}
              className="bg-surface border border-outline-variant/10 rounded-xl p-6 flex flex-col gap-5 hover:border-primary/20 transition-colors duration-300"
            >
              {/* header categoria */}
              <div className="flex items-center gap-3">
                <span className="text-xl">{cat.icon}</span>
                <span className="font-headline font-bold text-on-surface text-sm">{cat.label}</span>
              </div>

              {/* techs */}
              <div className="flex flex-col gap-4">
                {cat.techs.map(tech => (
                  <div key={tech.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[13px] text-on-surface">{tech.name}</span>
                        {tech.note && (
                          <span className="font-mono text-[10px] text-on-surface-variant/40">{tech.note}</span>
                        )}
                      </div>
                      <span className={`font-mono text-[10px] ${levelColor(tech.level)}`}>
                        {levelLabel(tech.level)}
                      </span>
                    </div>
                    {/* barra */}
                    <div className="w-full h-0.5 bg-outline-variant/15 rounded-full overflow-hidden">
                      <div
                        className="tech-bar-fill h-full bg-primary rounded-full"
                        data-level={tech.level}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* rodapé */}
        <div className="mt-12 pt-6 border-t border-outline-variant/10">
          <p className="font-mono text-[11px] text-on-surface-variant/30">
            {stack.reduce((acc, c) => acc + c.techs.length, 0)} tecnologias · actualizado 2026
          </p>
        </div>

      </div>
    </PageWrapper>
  );
};

export default TechPage;
