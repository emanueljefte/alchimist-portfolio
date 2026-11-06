import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(ctaRef.current, {
      scrollTrigger: { trigger: ctaRef.current, start: "top 85%", once: true },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, ctaRef);
  return () => ctx.revert();
}, []);
  return (
    <section ref={ctaRef} className="px-6 py-12 mt-12 bg-linear-to-b from-surface to-background">
      <div className="max-w-3xl mx-auto glass-panel p-8 rounded-2xl border border-outline-variant/20 text-center relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">Tens uma ideia. Eu tenho o código.
            <br />Vamos construir algo real.</h2>
          <div className="flex items-center justify-center gap-6 mb-8 text-[10px] font-label text-on-surface-variant/60 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Disponível agora
            </span>
            <span>·</span>
            <span>Luanda, Angola</span>
            <span>·</span>
            <span>Remote friendly</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="px-10 py-4 bg-primary text-on-primary font-headline font-bold rounded-md shadow-[0_0_20px_rgba(242,202,80,0.2)] active:scale-95 transition-all">
              Iniciar conversa
            </Link>
            <a href="mailto:emanueldinganijoao13@gmail.com" className="px-10 py-4 border border-primary/30 text-primary font-label rounded-md hover:bg-primary/10 active:scale-95 transition-all text-sm">
              Email direto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;