import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import TechPage from './pages/TechPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

import { projects } from '@/src/data/projects.data';
import ProjectDetail from '@/src/components/ProjectDetail';
import AboutPage from './pages/AboutPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      
      <div className={`transition-opacity duration-1000 opacity-100`}>
        <Header />
        <main className="py-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route
              path="/projects/:id"
              element={<ProjectDetail projects={projects} />}
            />
            <Route path="/tech" element={<TechPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </>
  );
}
