import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ChevronDown, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroImg from '@/src/assets/images/emajefte.png';

gsap.registerPlugin(TextPlugin);

const WORDS = [
  "experiências fluidas",
  "produtos que vivem",
  "soluções que ficam",
  "código com alma",
  "apps que importam",
];

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const timerRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !imageRef.current || !wordRef.current) return;

    const ctx = gsap.context(() => {

      // ── entrada do conteúdo ──
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // ── glow pulsante na imagem ──
      gsap.to(imageRef.current, {
        boxShadow: "0 0 30px rgba(242,202,80,0.6)",
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // ── cursor pisca ──
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      // ── typewriter ──
      const typeWord = (word: string, onDone: () => void) => {
        const el = wordRef.current;
        if (!el) return;
        el.textContent = "";
        let charIndex = 0;
        const type = () => {
          if (charIndex < word.length) {
            el.textContent += word[charIndex];
            charIndex++;
            timerRef.current = gsap.delayedCall(0.07, type);
          } else {
            // pausa antes de apagar
            timerRef.current = gsap.delayedCall(2.2, () => eraseWord(onDone));
          }
        };
        type();
      };

      const eraseWord = (onDone: () => void) => {
        const el = wordRef.current;
        if (!el) return;
        const erase = () => {
          if (el.textContent && el.textContent.length > 0) {
            el.textContent = el.textContent.slice(0, -1);
            timerRef.current = gsap.delayedCall(0.04, erase);
          } else {
            onDone();
          }
        };
        erase();
      };

      const cycle = () => {
        indexRef.current = (indexRef.current + 1) % WORDS.length;
        typeWord(WORDS[indexRef.current], cycle);
      };

      // arranca após a animação de entrada
      timerRef.current = gsap.delayedCall(1.2, () => typeWord(WORDS[0], cycle));

    }, sectionRef);

    return () => {
      timerRef.current?.kill();
      ctx.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-10 flex flex-col items-start max-w-8xl mx-auto lg:flex-row lg:items-center lg:gap-12"
    >
      <div
        ref={contentRef}
        style={{ opacity: 0 }}
        className="flex-1 flex items-center min-w-0 gap-4"
      >
        {/* ── texto ── */}
        <div className="flex-1 w-[60%] min-w-0">
          <div className="mb-6 inline-block">
            <span className="flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.2em] text-primary px-3 py-1 rounded-full border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0" />
              Disponível para Trabalhos
            </span>
          </div>

          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-[1.1]">
            Transformando ideias brutas em{" "}
          </h1>
          <div className="font-label text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary text-shadow-gold leading-[1.1] min-h-[1.2em]">
            <span ref={wordRef} />
            <span ref={cursorRef} className="text-primary ml-0.5">|</span>
          </div>
          <p className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-[1.1] mb-6">
            — do código ao mundo real.
          </p>

          <p className="text-on-surface-variant text-md leading-relaxed mb-6 max-w-lg">
            <span className="font-label">Alchimist</span> — transformo lógica complexa em produtos que as pessoas realmente usam.
            Mobile, web, backend. Angola e além.
          </p>

          <div className="flex items-center gap-4 mb-6 lg:mb-0">
            <Link
              to="/contact"
              className="flex-1 lg:flex-none lg:px-12 bg-primary text-on-primary font-headline font-bold py-3 rounded-md active:scale-95 transition-all text-sm uppercase tracking-wider text-center"
            >
              Vamos conversar
            </Link>
            <a
              href="mailto:emanueldinganijoao13@gmail.com"
              className="flex items-center gap-2 py-3 px-6 border border-primary/30 rounded-md text-primary active:scale-90 transition-all hover:bg-primary/10 text-sm font-label"
            >
              <Mail className="w-4 h-4" />
              Email direto
            </a>
          </div>
        </div>

        {/* ── imagem ── */}
        <div className="hidden md:flex flex-1 w-[40%] min-w-0 justify-center">
          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e8a94d22_1px,transparent_1px)] bg-size-[20px_20px]" />
            <img
              ref={imageRef}
              src={heroImg}
              alt="Emanuel Jefté — Alchimist"
              className="w-full max-w-sm mx-auto rounded-2xl border object-top object-cover aspect-3/4"
            />
          </div>
        </div>
      </div>

      {/* ── scroll indicator ── */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-5 h-5 text-primary/50" />
      </div>
    </section>
  );
};

export default Hero;
