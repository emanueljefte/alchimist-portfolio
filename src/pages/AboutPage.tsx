import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageWrapper from '@/components/PageWrapper';
import heroImg from '@/assets/images/emajefte.png';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: '⚗', title: 'Transformação', desc: 'Não me interessa o código pelo código. Interessa-me o que ele muda — na vida de quem o usa.' },
  { icon: '📐', title: 'Precisão', desc: 'Engenharia Informática ensina-me que os detalhes importam. Um pixel, um tipo, uma decisão de arquitectura.' },
  { icon: '🤝', title: 'Comunidade', desc: 'Formador por vocação. Acredito que o conhecimento cresce quando é partilhado.' },
  { icon: '🔋', title: 'Resiliência', desc: 'Construo para funcionar offline, para durar, para resistir. Nos projectos e nas pessoas.' },
];

const timeline = [
  { year: '2022', label: 'Primeiras linhas de código' },
  { year: '2023', label: 'Primeiro projecto mobile — React Native' },
  { year: '2024', label: 'EdificaQuiz lançado · Agenda Familiar em construção' },
  { year: '2025', label: 'Marca Alchimist definida · Múltiplos projectos activos' },
  { year: '2026', label: 'Engenharia Informática · Portfólio público' },
];

const AboutPage = () => {
  const pageRef    = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  sectionsRef.current = [];

  const addSection = (el: HTMLDivElement | null) => {
    if (el) sectionsRef.current.push(el);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );

      sectionsRef.current.forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 36 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          }
        );
      });
    }, pageRef);

    return () => {
      ctx.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <PageWrapper>
      <div ref={pageRef} className="max-w-7xl mx-auto px-6 py-16">

        {/* cabeçalho */}
        <div className="pb-8 border-b border-outline-variant/10 mb-12">
          <span className="font-mono text-[11px] text-on-surface-variant/40 block mb-2 tracking-widest">
            ⚗ alchimist / sobre
          </span>
          <h1 className="font-headline text-4xl lg:text-5xl font-bold text-on-surface tracking-tight">
            Sobre mim
          </h1>
        </div>

        {/* ── hero bio ── */}
        <div
          ref={heroRef}
          style={{ opacity: 0 }}
          className="grid lg:grid-cols-[1fr_320px] gap-12 mb-20"
        >
          <div className="flex flex-col gap-6 justify-center">
            <p className="font-mono text-[11px] text-primary uppercase tracking-widest">
              Emanuel Jefté · Luanda, Angola
            </p>
            <h2 className="font-headline text-2xl lg:text-3xl font-bold text-on-surface leading-snug">
              Transformo o que é bruto em algo que dura —<br className="hidden lg:block" />
              <span className="text-primary"> em código, em pessoas, em propósito.</span>
            </h2>
            <p className="text-on-surface-variant text-base leading-[1.85] max-w-xl">
              Sou developer full-stack e estudante de Engenharia Informática na Universidade de Luanda.
              Construo aplicações mobile e web que resolvem problemas reais — com foco em performance,
              design centrado no humano e arquitecturas que sobrevivem ao tempo.
            </p>
            <p className="text-on-surface-variant text-base leading-[1.85] max-w-xl">
              Fora do código, sou formador. Acredito que ensinar é uma das formas mais poderosas
              de construir — e que o conhecimento só tem valor quando circula.
              Faço parte de uma comunidade de fé que me lembra que o propósito vem antes da técnica.
            </p>

            {/* chips de identidade */}
            <div className="flex flex-wrap gap-2 mt-2">
              {['Full-Stack Dev','Engenharia Informática','React Native','Formador','Luanda · Angola','Remote friendly'].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-md bg-surface border border-outline-variant/10 font-mono text-[11px] text-on-surface-variant">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* foto */}
          <div className="flex items-start justify-center lg:justify-end">
            <div className="relative w-full max-w-[280px]">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e8a94d22_1px,transparent_1px)] [background-size:20px_20px]" />
              <img
                src={heroImg}
                alt="Emanuel Jefté — Alchimist"
                className="w-full rounded-2xl border border-outline-variant/15 object-cover object-top aspect-[3/4] shadow-[0_0_30px_rgba(232,169,77,0.1)]"
              />
            </div>
          </div>
        </div>

        {/* ── valores ── */}
        <div ref={addSection} style={{ opacity: 0 }} className="mb-20">
          <span className="font-mono text-[11px] text-primary uppercase tracking-widest block mb-6">
            princípios
          </span>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {values.map(v => (
              <div
                key={v.title}
                className="p-5 rounded-xl bg-surface border border-outline-variant/10 hover:border-primary/20 transition-colors duration-300 flex flex-col gap-3"
              >
                <span className="text-2xl">{v.icon}</span>
                <h3 className="font-headline font-bold text-on-surface text-sm">{v.title}</h3>
                <p className="font-label text-[12px] text-on-surface-variant leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── timeline ── */}
        <div ref={addSection} style={{ opacity: 0 }} className="mb-20">
          <span className="font-mono text-[11px] text-primary uppercase tracking-widest block mb-8">
            percurso
          </span>
          <div className="relative flex flex-col gap-0">
            {/* linha vertical */}
            <div className="absolute left-[52px] top-2 bottom-2 w-px bg-outline-variant/15" />

            {timeline.map((item, i) => (
              <div key={i} className="flex items-start gap-6 pb-8 last:pb-0">
                <div className="flex-shrink-0 w-[52px] text-right">
                  <span className="font-mono text-[11px] text-primary/70">{item.year}</span>
                </div>
                {/* ponto */}
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-1 relative z-10" />
                <p className="font-label text-sm text-on-surface-variant pt-0 leading-relaxed">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div ref={addSection} style={{ opacity: 0 }} className="p-8 rounded-2xl bg-surface border border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-headline font-bold text-on-surface text-lg mb-1">Tens um projecto em mente?</h3>
            <p className="font-label text-sm text-on-surface-variant">Estou disponível para freelance e consultoria.</p>
          </div>
          <a
            href="/contact"
            className="flex-shrink-0 px-8 py-3 bg-primary text-on-primary font-headline font-bold text-sm rounded-lg active:scale-95 transition-all hover:shadow-[0_0_24px_rgba(232,169,77,0.25)] whitespace-nowrap"
          >
            Vamos conversar
          </a>
        </div>

      </div>
    </PageWrapper>
  );
};

export default AboutPage;
