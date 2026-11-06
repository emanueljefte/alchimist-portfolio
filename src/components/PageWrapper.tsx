import gsap from "gsap";
import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(pageRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          onComplete: () => {
            if (pageRef.current) pageRef.current.style.willChange = 'auto';
          } 
        }
      );
    }, pageRef);
    return () => ctx.kill();
  }, [location.pathname]);

  return <div ref={pageRef} style={{opacity: 0, willChange: 'opacity, transform' }}>{children}</div>;
};

export default PageWrapper;