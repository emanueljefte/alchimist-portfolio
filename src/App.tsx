import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import { projects } from '@/src/data/projects.data';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetail = lazy(() => import('@/src/components/ProjectDetail'));
const TechPage = lazy(() => import('./pages/TechPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

gsap.registerPlugin(ScrollTrigger);

const SITE = 'Emanuel Jefté — Alchimist';
const titles: Record<string, string> = {
  '/': `${SITE} · Full-Stack Developer`,
  '/about': `Sobre · ${SITE}`,
  '/projects': `Projectos · ${SITE}`,
  '/tech': `Arsenal Técnico · ${SITE}`,
  '/contact': `Contacto · ${SITE}`,
};

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6 text-center">
    <span className="font-mono text-[11px] text-on-surface-variant/40">⚗ 404</span>
    <h1 className="font-headline text-3xl font-bold">Página não encontrada</h1>
    <Link to="/" className="text-primary font-label text-sm">← Voltar ao início</Link>
  </div>
);

const seenSplash = () => {
  try { return sessionStorage.getItem('splash-seen') === '1'; } catch { return false; }
};

export default function App() {
  const [loading, setLoading] = useState(() => !seenSplash());
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const base = '/' + location.pathname.split('/')[1];
    const detail = location.pathname.startsWith('/projects/')
      ? projects.find(p => p.id === location.pathname.split('/')[2])
      : undefined;
    document.title = detail ? `${detail.title} · ${SITE}` : (titles[base] ?? `Não encontrado · ${SITE}`);
  }, [location.pathname]);

  const finishSplash = () => {
    try { sessionStorage.setItem('splash-seen', '1'); } catch { /* ignorar */ }
    setLoading(false);
  };

  return (
    <>
      {loading && <SplashScreen onComplete={finishSplash} />}

      <div>
        <Header />
        <main className="py-12">
          <Suspense fallback={<div className="min-h-[60vh]" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetail projects={projects} />} />
              <Route path="/tech" element={<TechPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </>
  );
}
