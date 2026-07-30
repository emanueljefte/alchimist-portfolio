import { AtSign, Briefcase, Github, Linkedin, Terminal } from "lucide-react";
import AlchimistIcon from "@/src/assets/images/alchimist-icon.png"

const socials = [
  { icon: AtSign, label: "Email", href: "mailto:emanueldinganijoao13@gmail.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/emanueljefte", external: true },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/emanuel-jeft%C3%A9-dingani-jo%C3%A3o/", external: true },
];

const Footer = () => {
  return (
    <footer className="px-6 py-12 max-w-7xl mx-auto">
      <div className="h-px bg-linear-to-r from-transparent via-primary/30 to-transparent mb-12" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <img src={AlchimistIcon} className="h-10 w-10"alt="Alchimist Icon" />
          <div className="text-center">
            <p className="font-label font-bold text-on-surface">The Alchimist</p>
            <p className="font-headline font-bold text-on-surface">Emanuel Jefté</p>

          </div>
        </div>
        <div className="flex gap-8 items-center">
          {socials.map(({ icon: Icon, label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-label uppercase tracking-widest">{label}</span>
            </a>
          ))}

        </div>
        <p className="text-on-surface-variant text-xs font-label">
          © 2026 Emanuel Jefté. Todos os direitos reservados.
        </p>
        <p className="font-mono text-[10px] text-on-surface-variant/40 tracking-widest text-center mb-2">
          construído com React · TypeScript · GSAP · TailwindCSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;