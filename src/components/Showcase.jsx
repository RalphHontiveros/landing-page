/* eslint-disable no-unused-vars */
import { useRef, useEffect } from 'react';
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
import { motion } from 'framer-motion'


const showcases = [
  { 
    title: 'Real-time Collaboration', 
    desc: 'Work together in real time with presence and cursors. Experience zero latency across all devices.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="17" y1="11" x2="23" y2="11"/><line x1="20" y1="8" x2="20" y2="14"/></svg>
  },
  { 
    title: 'Custom Themes', 
    desc: 'Change colors, fonts and spacing with a few tokens. Integrates with your existing theme system.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.09a2 2 0 0 0-2.73.73l-.23.38a2 2 0 0 0 .58 2.37l.34.29a2 2 0 0 1 .55 1.76v.35a2 2 0 0 1-.55 1.76l-.34.29a2 2 0 0 0-.58 2.37l.23.38a2 2 0 0 0 2.73.73l.15-.09a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.09a2 2 0 0 0 2.73-.73l.23-.38a2 2 0 0 0-.58-2.37l-.34-.29a2 2 0 0 1-.55-1.76v-.35a2 2 0 0 1 .55-1.76l.34-.29a2 2 0 0 0 .58-2.37l-.23-.38a2 2 0 0 0-2.73-.73l-.15.09a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  },
  { 
    title: 'Extensible Plugins', 
    desc: 'Add small plugins to extend functionality as needed. Supports modular and scalable architecture.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
  },
]

export default function Showcase() {
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] } }
  }

  return (
    // Preserved ang background: Walang style={{ backgroundColor: ... }}
    <section className="py-20 px-6 md:px-12 relative overflow-hidden">
      <ParticleDriftBackground />
      
      {/* Heading Group */}
      <motion.div 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={container} 
        className="max-w-6xl mx-auto text-center mb-12 relative z-10"
      >
        {/* Title Enhancement (Gradient) */}
        <motion.h3 
            className="text-3xl md:text-4xl font-extrabold mb-3"
            variants={item}
            style={{
                background:
                    'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 45%, var(--accent) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 8px rgba(97,0,148,0.3)', 
            }}
        >
            Key Platform Features
        </motion.h3>

        {/* Subtitle Enhancement (Better contrast) */}
        <motion.p variants={item} className="text-lg" style={{ color: 'var(--muted)', opacity: 0.9 }}>
          A few highlights demonstrating what you can build and customize.
        </motion.p>
      </motion.div>

      {/* Showcase Cards Grid */}
      <motion.div 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, amount: 0.2 }} 
        variants={container} 
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10" 
      >
        {showcases.map((s, i) => (
          <motion.article 
            key={i} 
            variants={item} 
            className="p-8 rounded-3xl transition transform duration-300 group cursor-pointer" 
            style={{ 
              // Pinalakas ang Glassmorphism effect
              backgroundColor: 'rgba(21,0,80,0.5)', 
              border: '1px solid rgba(97,0,148,0.5)', 
              backdropFilter: 'blur(12px)', // Mas malakas na blur
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)',
            }}
            whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 12px 48px 0 rgba(97,0,148,0.5)', 
                borderColor: 'var(--accent)',
            }}
          >
            {/* Icon/Badge Placeholder Enhancement */}
            <div 
                className="w-14 h-14 rounded-xl text-white flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-[1.05] group-hover:rotate-3" 
                style={{ 
                    background: 'linear-gradient(135deg, var(--secondary), var(--accent))',
                    boxShadow: '0 6px 16px rgba(97,0,148,0.45)'
                }}
            >
                {/* Gumamit ng actual icons */}
                {s.icon} 
            </div>
            
            <h4 className="font-bold text-xl mb-2 text-white">{s.title}</h4>
            
            {/* Pinalitan ang text color para sa mas mahusay na contrast */}
            <p className="text-base" style={{ color: 'var(--text)', opacity: 0.8 }}>{s.desc}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}