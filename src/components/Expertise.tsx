import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cloud, Database, Laptop, Server, Smartphone, Terminal } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger)
const Expertise = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
        y: 50,
        opacity: 0,

        ease: "power2.out"
      });


    }, sectionRef);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const skills = [
    { icon: Laptop, title: "Web", desc: "React", projects: 5, level: 70 },
    { icon: Smartphone, title: "Mobile", desc: "React Native", projects: 4, level: 80 },
    { icon: Server, title: "Backend", desc: "Express, FastAPI", level: 75, projects: 3 },
    { icon: Database, title: "ORM", desc: "Prisma, Drizzle", level: 60, projects: 2 },
    { icon: Terminal, title: "Language", desc: "TypeScript, JavaScript, Python, Java, Dart, SQL" },
  ];

  return (
    <section ref={sectionRef} className="px-6 py-12 bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60">Expertise</span>
          <h2 className="font-headline text-2xl font-bold mt-2">Arsenal Técnico</h2>
        </div>
          <div className="expertise-card col-span-2 p-6 ...">
            <div className="flex items-start justify-between">
              <Smartphone className="w-8 h-8 text-primary" />
              <span className="text-[12px] font-label tracking-widest text-primary uppercase">principal</span>
            </div>
            <h3 className="font-headline font-bold text-on-surface text-md">Mobile Development</h3>
            <p className="font-label text-[16px] text-on-surface-variant mt-1">React Native, TypeScript, TailwindCSS, Drizzle, Supabase</p>
          </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {skills.map((skill, i) => (
            <div ref={(el) => { if (el) cardsRef.current[i] = el; }} key={skill.title} className="expertise-card p-5 rounded-lg bg-surface border border-outline-variant/10 flex flex-col gap-3 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group">
              <skill.icon className="w-6 h-6 text-primary transition-transform group-hover:scale-110 group-hover:rotate-6" />
              <div>
                <h3 className="font-headline font-bold text-on-surface text-sm">{skill.title}</h3>
                <p className="font-label text-[10px] text-on-surface-variant mt-1">{skill.desc}</p>
              </div>
              {skill.level && skill.projects &&
                <>
                  <div className="w-full h-0.5 bg-outline-variant/20 rounded-full mt-2">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="text-primary font-mono text-[10px]">{skill.projects} projectos</span>

                </>}
            </div>
          ))}
          <div className="expertise-card col-span-2 md:col-span-4 p-5 rounded-lg bg-surface border border-outline-variant/10 flex items-center gap-4 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
            <Cloud className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-headline font-bold text-on-surface text-sm">Cloud Infrastructure</h3>
              <p className="font-label text-[10px] text-on-surface-variant mt-1">Vercel, Netlify</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;