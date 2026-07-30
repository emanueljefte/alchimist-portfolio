import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ExternalLink, Github, HelpCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import edificaquizImg from '@/src/assets/images/edificaquiz.png';
import kwanzaImg from '@/src/assets/images/meu_kwanza_controlado.png';

gsap.registerPlugin(ScrollTrigger)

const badgeStyle: Record<string, string> = {
  "Liberado": "text-green-400 border-green-400/30 font-label text-sm",
  "testes": "text-amber-400 border-amber-400/30 font-label text-sm",
  "construção": "text-blue-400  border-blue-400/30  font-label text-sm",
};

const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true
        },
        x: -120,
        opacity: 0,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, []);

  const projects = [
    {
      id: "edificaquiz",
      title: "EdificaQuiz",
      desc: "Transformar o Estudo em Experiência de Vida — o companheiro digital de cada aluno da Escola da Edificação.",
      tags: ["React Native", "TypeScript", "Drizzle", "SQLite"],
      img: edificaquizImg,
      badge: "Liberado a versão 1.0.4",
      url: "https://...",    // link da app/store
      repo: "https://github.com/...",
    },
    {
      id: "meu-kwanza-controlado",
      title: "Meu Kwanza Controlado",
      desc: "Gerencie o seu dinheiro de uma forma mais inteligente.",
      tags: ["React Native", "TypeScript", "Drizzle", "SQLite", "Express", "PostgreSQL",],
      img: kwanzaImg,
      badge: "Projecto na versão de testes",
      url: "https://...",    // link da app/store
      repo: "https://github.com/...",
    },
    {
      id: "mlo",
      title: "MLO (Logística de Passageiros)",
      desc: "Sistema inteligente de gestão logística para transporte executivo em tempo real com otimização de rotas.",
      tags: ["React Native", "Node.js", "PostgreSQL"],
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYof5NVnOIeRpJDxI1YpXXC3UE4NP_8yUjmTAHgMEQC7kooZ1vaIMGhQ4b2FXOtd9sQ_18FhIX8XSeDDfaqxmszs42cHo6vgKQqJVHWHYpJRrXXkaKp6I7PR_zFcvESxvyBeqoVDKautuRb-Xt55CnxCEbYjre5VzJKWKrTz1qCsUeJve4iSVUocUfSUD8892qFgT37s3RNyhKI21V6i6SDbaUBDt8fOSxQ3TIEUMSpnAa4tt5_GnOPB-NZiFU0kj32osUPqKPltMT",
      badge: "Projecto em construção",
      url: "https://...",    // link da app/store
      repo: "https://github.com/...",
    },
  ];

  return (
    <section ref={sectionRef} className="px-6 py-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60">Portfolio</span>
          <h2 className="font-headline text-2xl font-bold mt-2">Trabalhos em Destaques</h2>
        </div>
        <Link to="/projects" className="text-primary font-label text-[10px] uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
          Todos os Projectos <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {projects.map((project, i) => (
          <div key={project.id} className={`project-card group ${i === 2 ? 'md:col-span-2' : ''}`}>
            <span className="font-mono text-[10px] text-primary/30 mb-2 block">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="relative rounded-xl overflow-hidden mb-6 aspect-video gold-glow bg-surface">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-background/60 backdrop-blur-sm">
                <a href={project.url} className="p-2 rounded-full bg-primary text-on-primary">
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a href={project.repo} className="p-2 rounded-full bg-surface border border-outline-variant/30 text-on-surface">
                  <Github className="w-4 h-4" />
                </a>
              </div>
              {project.badge && (
                <div className="absolute top-4 right-4  backdrop-blur-md px-3 py-1 rounded-full border border-outline-variant/30">
                  <span className={Object.entries(badgeStyle).find(([k]) => project.badge.includes(k))?.[1]
                    ?? "text-primary border-primary/30 bg-primary/10"}>{project.badge}</span>
                </div>
              )}
            </div>
            <Link to={`/projects/${project.id}`} >
              <h3 className="font-headline text-xl font-bold hover:text-primary text-on-surface mb-2">{project.title}</h3>
            </Link>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              {project.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, j) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-label uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;