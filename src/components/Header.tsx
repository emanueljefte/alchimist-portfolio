import { Link, NavLink } from "react-router-dom";
import profileImg from '@/src/assets/images/emajebs.webp';

const Header = () => {
  const routes = [
    {label: "Home", path: "/"},
    {label: "Sobre", path: "/about"},
    {label: "Arsenal", path: "/tech"},
    {label: "Projectos", path: "/projects"},
    {label: "Contactos", path: "/contact"},
  ]
  return (
    <header className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-outline-variant/15 shadow-[0_0_20px_rgba(242,202,80,0.08)] h-16 flex justify-between items-center px-6">
      <Link to="/" className="flex items-center gap-3 shrink-0 hover:opacity-80 transition-opacity">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant/30">
        
          <img 
            src={profileImg}
            alt="Emanuel Jefté — Full Stack Alchimist" 
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-lg font-label font-bold text-primary tracking-[-0.02em]">EMANUEL JEFTÉ</span>
      </Link>
      <nav className="hidden md:flex items-center gap-1">
        {routes.map((route) => (
      <NavLink key={route.path}
        to={route.path}
        end={route.path === "/"}
        className={({ isActive }) => `flex items-center justify-center rounded-full mx-1 lg:mx-3 h-10 transition-all px-4 py-2 active:scale-90 ${isActive ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface'}`}
      >
        {route.label}
      </NavLink>

        ))}
    </nav>
    </header>
  );
};

export default Header