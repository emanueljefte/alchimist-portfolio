import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Github } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { projects as allProjects } from "@/src/data/projects.data";

const projects = allProjects.filter(p => p.featured);

gsap.registerPlugin(ScrollTrigger);

const badgeStyle = {
  released: "text-green-400 border-green-400/30",
  beta: "text-amber-400 border-amber-400/30",
  wip: "text-blue-400 border-blue-400/30",
} as const;

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60">Portfolio</span>
          <h2 className="font-headline text-2xl font-bold mt-2">Trabalhos em Destaque</h2>
        </div>
        <Link to="/projects" className="text-primary font-label text-[10px] uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
          Todos os Projectos <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((project, i) => (
          <article key={project.id} className="project-card group">
            <span className="font-mono text-[10px] text-primary/30 mb-2 block">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Link
              to={`/projects/${project.id}`}
              className="relative block rounded-xl overflow-hidden mb-6 aspect-video gold-glow bg-neutral-200"
            >
              {project.heroImg ? (
                <img
                  src={project.heroImg}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-mono text-[11px] text-on-surface-variant/30">
                  ⚗ {project.title}
                </div>
              )}
              <div className="absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full border border-outline-variant/30">
                <span className={`font-label text-sm ${badgeStyle[project.badgeType]}`}>{project.badge}</span>
              </div>
            </Link>
            <div className="flex items-start justify-between gap-3 mb-2">
              <Link to={`/projects/${project.id}`}>
                <h3 className="font-headline text-xl font-bold hover:text-primary text-on-surface transition-colors">{project.title}</h3>
              </Link>
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Código de ${project.title} no GitHub`}
                  className="text-on-surface-variant hover:text-primary transition-colors shrink-0"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{project.tagline}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-label uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
