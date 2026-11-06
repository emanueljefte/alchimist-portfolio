import { useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Github, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── tipos ──────────────────────────────────────────────────────────────────
interface TechHighlight {
  icon: string;
  title: string;
  desc: string;
}

interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  index: number;
  title: string;
  tagline: string;
  desc: string;
  badge: string;
  badgeType: 'released' | 'beta' | 'wip';
  tags: string[];
  heroImg: string;
  screenshots: { src: string; label: string }[];
  problem: string;
  solution: string;
  codeSnippet?: { filename: string; code: string };
  highlights: TechHighlight[];
  metrics: ProjectMetric[];
  result: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean; // aparece na Home
}

interface ProjectDetailProps {
  projects: Project[];
}

// ── badge ──────────────────────────────────────────────────────────────────
const badgeStyles: Record<Project['badgeType'], string> = {
  released: 'text-green-400 border-green-400/30 bg-green-400/10',
  beta:     'text-amber-400 border-amber-400/30 bg-amber-400/10',
  wip:      'text-blue-400  border-blue-400/30  bg-blue-400/10',
};

const BadgeDot = ({ type }: { type: Project['badgeType'] }) => {
  const colors: Record<Project['badgeType'], string> = {
    released: 'bg-green-400',
    beta:     'bg-amber-400',
    wip:      'bg-blue-400',
  };
  return <span className={`w-1.5 h-1.5 rounded-full ${colors[type]} animate-pulse shrink-0`} />;
};

// ── bloco de código ────────────────────────────────────────────────────────
const CodeBlock = ({ filename, code }: { filename: string; code: string }) => (
  <div className="bg-[#0a0a0c] border border-outline-variant/15 rounded-xl overflow-hidden mt-6">
    <div className="flex items-center gap-2 px-4 py-3 border-b border-outline-variant/10">
      <div className="flex gap-1.5">
        {[0,1,2].map(i => <span key={i} className="w-2 h-2 rounded-full bg-outline-variant/30" />)}
      </div>
      <span className="font-mono text-[11px] text-on-surface-variant/50 ml-2">{filename}</span>
    </div>
    <pre className="p-5 font-mono text-[12px] leading-[1.8] text-on-surface-variant overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);

// ── componente principal ───────────────────────────────────────────────────
const ProjectDetail = ({ projects }: ProjectDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pageRef    = useRef<HTMLDivElement>(null);
  const heroRef    = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const currentIndex = projects.findIndex(p => p.id === id);
  const project = projects[currentIndex];
  const prev = projects[currentIndex - 1] ?? null;
  const next = projects[currentIndex + 1] ?? null;

  // scroll to top on project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  // animações
  useEffect(() => {
    if (!project) return;
    sectionsRef.current = [];
    const ctx = gsap.context(() => {
      // hero entra imediatamente
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      );

      // cada secção entra ao fazer scroll
      sectionsRef.current.forEach(el => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, [id, project]);

  const addSection = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-on-surface-variant">Projecto não encontrado.</p>
        <Link to="/projects" className="text-primary font-label text-sm">
          ← Voltar aos projectos
        </Link>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-background">

      {/* barra de cor topo */}
      <div className="h-0.75 bg-linear-to-r from-primary via-purple-500 to-blue-500" />

      {/* breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label text-[11px] uppercase tracking-widest"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Projectos
        </Link>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ opacity: 0 }} className="max-w-4xl mx-auto px-6 pt-10 pb-12">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
          <div>
            <span className="font-mono text-[11px] text-on-surface-variant/40 block mb-2">
              projecto {String(project.index).padStart(2, '0')}
            </span>
            <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tight text-on-surface">
              {project.title}
            </h1>
          </div>
          <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono ${badgeStyles[project.badgeType]}`}>
            <BadgeDot type={project.badgeType} />
            {project.badge}
          </span>
        </div>

        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl mb-6">
          {project.tagline}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-md bg-surface border border-outline-variant/15 font-mono text-[11px] text-on-surface-variant">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* imagem hero */}
      {project.heroImg && <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className="relative rounded-2xl overflow-hidden border border-outline-variant/15 aspect-video bg-surface shadow-[0_0_40px_rgba(242,202,80,0.06)]">
          <img
            src={project.heroImg}
            alt={`${project.title} — screenshot principal`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
          <div className="absolute bottom-4 right-5 font-mono text-[11px] text-primary/30">
            ⚗ alchimist
          </div>
        </div>
      </div>}

      {/* ── PROBLEMA ─────────────────────────────────────────────────────── */}
      {project.problem && <section ref={addSection} className="max-w-4xl mx-auto px-6 py-12 border-t border-outline-variant/10">
        <span className="font-mono text-[11px] text-primary uppercase tracking-widest block mb-4">
          o problema
        </span>
        <p className="text-on-surface-variant text-base leading-[1.85] max-w-2xl">
          {project.problem}
        </p>
      </section>}

      {/* ── SOLUÇÃO ──────────────────────────────────────────────────────── */}
      {project.solution && <section ref={addSection} className="max-w-4xl mx-auto px-6 py-12 border-t border-outline-variant/10">
        <span className="font-mono text-[11px] text-primary uppercase tracking-widest block mb-4">
          a solução
        </span>
        <p className="text-on-surface-variant text-base leading-[1.85] max-w-2xl">
          {project.solution}
        </p>
        {project.codeSnippet && (
          <CodeBlock
            filename={project.codeSnippet.filename}
            code={project.codeSnippet.code}
          />
        )}
      </section>}

      {/* ── DESTAQUES TÉCNICOS ───────────────────────────────────────────── */}
      {project.highlights.length > 0 && <section ref={addSection} className="max-w-4xl mx-auto px-6 py-12 border-t border-outline-variant/10">
        <span className="font-mono text-[11px] text-primary uppercase tracking-widest block mb-6">
          destaques técnicos
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.highlights.map((h, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-surface border border-outline-variant/10 hover:border-primary/25 transition-all duration-300 group"
            >
              <span className="text-2xl mb-3 block">{h.icon}</span>
              <h3 className="font-headline font-bold text-on-surface text-sm mb-2 group-hover:text-primary transition-colors">
                {h.title}
              </h3>
              <p className="font-label text-[12px] text-on-surface-variant leading-relaxed">
                {h.desc}
              </p>
            </div>
          ))}
        </div>
      </section>}

      {/* ── CAPTURAS DE ECRÃ ─────────────────────────────────────────────── */}
      {project.screenshots.length > 0 && (
        <section ref={addSection} className="py-12 border-t border-outline-variant/10">
          <div className="max-w-4xl mx-auto px-6 mb-6">
            <span className="font-mono text-[11px] text-primary uppercase tracking-widest block">
              capturas de ecrã
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide">
            {project.screenshots.map((s, i) => (
              <div
                key={i}
                className="shrink-0 snap-start w-44 rounded-xl overflow-hidden border border-outline-variant/15 bg-surface aspect-9/16"
              >
                <img
                  src={s.src}
                  alt={s.label}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── RESULTADO ────────────────────────────────────────────────────── */}
      {(project.metrics.length > 0 || project.result) && <section ref={addSection} className="max-w-4xl mx-auto px-6 py-12 border-t border-outline-variant/10">
        <span className="font-mono text-[11px] text-primary uppercase tracking-widest block mb-6">
          resultado
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {project.metrics.map((m, i) => (
            <div key={i} className="p-5 rounded-xl bg-surface border border-outline-variant/10 text-center">
              <div className="font-mono text-3xl font-bold text-primary leading-none mb-2">
                {m.value}
              </div>
              <div className="font-mono text-[11px] text-on-surface-variant/60">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-on-surface-variant text-sm leading-[1.85] max-w-2xl">
          {project.result}
        </p>
      </section>}

      {!project.problem && !project.solution && (
        <section ref={addSection} className="max-w-4xl mx-auto px-6 py-12 border-t border-outline-variant/10">
          <p className="font-mono text-[12px] text-on-surface-variant/50">
            ⚗ estudo de caso em preparação — volta em breve.
          </p>
        </section>
      )}

      {/* ── LINKS ────────────────────────────────────────────────────────── */}
      {(project.liveUrl || project.repoUrl) && <section ref={addSection} className="max-w-4xl mx-auto px-6 py-12 border-t border-outline-variant/10">
        <span className="font-mono text-[11px] text-primary uppercase tracking-widest block mb-6">
          ver projecto
        </span>
        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary font-headline font-bold text-sm rounded-lg active:scale-95 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              Ver app ao vivo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-primary/30 text-primary font-label text-sm rounded-lg hover:bg-primary/10 active:scale-95 transition-all"
            >
              <Github className="w-4 h-4" />
              Ver código
            </a>
          )}
        </div>
      </section>}

      {/* ── NAVEGAÇÃO ────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-12 border-t border-outline-variant/10">
        <div className="flex items-center justify-between gap-4">

          {prev ? (
            <button
              onClick={() => navigate(`/projects/${prev.id}`)}
              className="flex items-center gap-3 px-5 py-4 rounded-xl border border-outline-variant/15 bg-surface hover:border-primary/25 transition-all group"
            >
              <ArrowLeft className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
              <div className="text-left">
                <div className="font-mono text-[10px] text-on-surface-variant/40 mb-1">anterior</div>
                <div className="font-label text-sm text-on-surface">{prev.title}</div>
              </div>
            </button>
          ) : <div />}

          <span className="font-mono text-[11px] text-on-surface-variant/30">
            {String(project.index).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>

          {next ? (
            <button
              onClick={() => navigate(`/projects/${next.id}`)}
              className="flex items-center gap-3 px-5 py-4 rounded-xl border border-outline-variant/15 bg-surface hover:border-primary/25 transition-all group text-right"
            >
              <div>
                <div className="font-mono text-[10px] text-on-surface-variant/40 mb-1">próximo</div>
                <div className="font-label text-sm text-on-surface">{next.title}</div>
              </div>
              <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
            </button>
          ) : <div />}

        </div>
      </div>

    </div>
  );
};

export default ProjectDetail;
