import gsap from "gsap";
import { Terminal } from "lucide-react";
import { useEffect, useRef, } from 'react';
import AlchimistIcon from "@/src/assets/images/alchimist-wordmark-256.png"

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current || !progressRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete
        });
      }
    });

    tl.to(progressRef.current, {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut'
    })
    .to(countRef.current, {
  innerText: 100,
  duration: 1.5,
  ease: 'power2.inOut',
  snap: { innerText: 1 },
  onUpdate() { 
    if (countRef.current) countRef.current.textContent = Math.round(gsap.getProperty(countRef.current, "innerText") as number) + '%';
  }
}, "<")
    .fromTo(textRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=1"
    )
    .from("#trace", {border: 0, height: 0, duration: 1, opacity: 0}, "-=1")
    .from("#footer", {x: 10, duration: 1, opacity: 0, stagger: 1})

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background p-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        <div className="flex flex-col items-center text-center">
          <div className="mb-8 p-4 rounded-xl glass-panel ">
            <img src={AlchimistIcon} className="h-full"alt="Alchimist Icon" />
          </div>
          <div className="space-y-2">
            <p className="font-label text-primary tracking-[0.4em] text-[10px] uppercase font-bold mb-3">The Alchimist</p>
            <h1 ref={textRef} style={{ opacity: 0 }} className="font-headline text-5xl md:text-7xl font-black text-primary tracking-tighter gold-glow">
              EMANUEL JEFTÉ
            </h1>
          </div> 
        </div>

        <div className="w-64 md:w-80 space-y-6">
          <div className="relative h-0.5 w-full bg-outline-variant/20 rounded-full overflow-hidden">
            <div ref={progressRef} className="absolute inset-y-0 left-0 w-0 bg-primary neon-line-glow rounded-full"></div>
          </div>
          <div className="flex justify-between items-center px-1">
            <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Initializing Core
            </span>
            <span ref={countRef} className="font-label text-[10px] text-primary font-bold tracking-widest">1</span>
          </div>
        </div>
      </div>
      <div className="font-label text-[10px] py-4 absolute bottom-0 text-on-surface self-end justify-self-end flex flex-row gap-x-3 uppercase bg-transparent">
        <p id="footer">Full Stack Alchemist &copy; 2026</p>
        <span id="trace" className="h-4 border" />
      </div>
    </div>
  );
};

export default SplashScreen;