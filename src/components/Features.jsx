/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react';
import { Typography } from '@mui/material';

/* =========================
   Particle Background Component
   Responsive and dynamic particle drift effect
========================= */
function ParticleDriftBackground() {
  const ref = useRef();
  const BASE_HEIGHT = 400;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Resize canvas function
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = BASE_HEIGHT;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate particles
    let particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1.5 + Math.random() * 3.5,
      dx: -0.15 + Math.random() * 0.3,
      dy: -0.1 + Math.random() * 0.2,
      o: 0.2 + Math.random() * 0.3,
    }));

    let running = true;

    // Draw particles
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(99,102,241,${p.o})`;
        ctx.shadowColor = '#6366f1';
        ctx.shadowBlur = 18;
        ctx.fill();

        // Update particle position
        p.x += p.dx;
        p.y += p.dy;

        // Boundary wrapping
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      if (running) requestAnimationFrame(draw);
    }

    draw();

    return () => {
      running = false;
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div
      className="particle-drift-bg absolute top-0 left-0 w-full"
      style={{ height: `${BASE_HEIGHT}px`, overflow: 'hidden' }}
    >
      <canvas ref={ref} className="particle-drift-canvas" />
    </div>
  );
}
/* eslint-enable no-unused-vars */

const features = [
  { title: 'Fast Performance', desc: 'Optimized bundles and minimal runtime overhead.' },
  { title: 'Accessible', desc: 'Built with semantics and keyboard-first interactions.' },
  { title: 'Responsive', desc: 'Looks great on phones, tablets and desktops.' },
  { title: 'Customizable', desc: 'Easy to adapt colors, spacing and components.' },
]

export default function Features() {
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } }
  }

  return (
    <section className="relative overflow-hidden">
      <ParticleDriftBackground />
      <div className="max-w-7xl mx-auto relative z-10 section-inner">
      <Typography component="h2" variant="h4" className="font-extrabold mb-3 text-center">Features</Typography>
      <p className="text-center mb-8 text-slate-300">Powerful building blocks to ship faster with great DX.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.article key={i} initial="hidden" whileInView="show" whileHover={{ y: -6, scale: 1.02 }} viewport={{ once: true, amount: 0.18 }} variants={item} className="glass-card glass-hover p-6">
            <div className="w-12 h-12 rounded-lg text-white flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}>■</div>
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{f.desc}</p>
          </motion.article>
        ))}
      </div>
      </div>
    </section>
  )
}
