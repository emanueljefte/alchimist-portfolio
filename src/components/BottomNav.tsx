import { Code, Home, Mail, Terminal } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { LucideIcon } from 'lucide-react';

const routes: { path: string; icon: LucideIcon; label: string }[] = [
  { path: '/',        icon: Home,     label: 'Home' },
  { path: '/tech',    icon: Terminal, label: 'Arsenal' },
  { path: '/projects',icon: Code,     label: 'Projectos' },
  { path: '/contact', icon: Mail,     label: 'Contactos' },
];

const BottomNav = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center justify-center rounded-full w-12 h-12 transition-all active:scale-90 ${
    isActive ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface'
  }`;

  return (
    <nav className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-around items-center px-4 py-2 mx-auto max-w-md bg-background/60 backdrop-blur-xl w-[90%] rounded-full border border-outline-variant/15 shadow-[0_0_20px_rgba(242,202,80,0.08)]">
      {routes.map((route)=> 
      <NavLink
        key={route.label}
        aria-label={route.label}
        to={route.path} 
        className={navClass}
      >
        <route.icon className="w-6 h-6" />
      </NavLink>
    )}
    </nav>
  );
};

export default BottomNav;