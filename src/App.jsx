import { useEffect, useState, useRef } from 'react'
function ParticleDriftBackground() {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = Array.from({ length: 48 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 1.2 + Math.random() * 2.8,
      dx: -0.2 + Math.random() * 0.4,
      dy: -0.15 + Math.random() * 0.3,
      o: 0.10 + Math.random() * 0.16,
    }));
    let running = true;
    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(99,102,241,${p.o})`;
        ctx.shadowColor = '#6366f1';
        ctx.shadowBlur = 12;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;
      }
      if (running) requestAnimationFrame(draw);
    }
    draw();
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => { running = false; window.removeEventListener('resize', handleResize); };
  }, []);
  return (
    <div className="particle-drift-bg" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <canvas ref={ref} className="particle-drift-canvas" width={window.innerWidth} height={window.innerHeight} />
    </div>
  );
}
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Showcase from './components/Showcase'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { motion } from 'framer-motion'

function App() {
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem('dark')
      return stored ? JSON.parse(stored) : false
    } catch {
      return false
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
    try { localStorage.setItem('dark', JSON.stringify(dark)) } catch {
      // localStorage unavailable or quota exceeded
    }
  }, [dark])

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } } };

  return (
    <div className="antialiased bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300 relative">
      <ParticleDriftBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar dark={dark} toggle={() => setDark(d => !d)} />
        <main className="w-full bg-white dark:bg-slate-900">
          <section id="home" className="section-gradient">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
              <Hero />
            </motion.div>
          </section>
          <section id="showcase" className="section-gradient">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
              <Showcase />
            </motion.div>
          </section>
          <section id="features" className="section-gradient">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
              <Features />
            </motion.div>
          </section>
          <section id="about" className="section-gradient">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
              <About />
            </motion.div>
          </section>
          <section id="testimonials" className="section-gradient">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
              <Testimonials />
            </motion.div>
          </section>
          <section id="cta" className="section-gradient">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
              <CTA />
            </motion.div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
