import { useRef, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

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

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } }
};

const itemUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } }
};

export default function About() {
  return (
    <section className="relative overflow-hidden">
      <ParticleDriftBackground />


      <Container maxWidth="lg" className="relative z-10 section-inner">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
            {/* Left content */}
            <motion.div variants={itemUp}>
              <span className="inline-block text-xs tracking-wide uppercase px-3 py-1 rounded-full mb-3" style={{ backgroundColor: 'rgba(97,0,148,0.12)', color: 'var(--accent)', border: '1px solid rgba(97,0,148,0.35)' }}>
                Why choose us
              </span>
              <Typography component="h2" variant="h4" className="font-extrabold mb-3">
                About our product
              </Typography>
              <Typography variant="body1" className="mb-6" sx={{ color: 'var(--text)', opacity: 0.95 }}>
                We combine performance and usability to help you get to market faster — with clean APIs and a delightful developer experience.
              </Typography>
              <Box component="ul" className="space-y-2 mb-6">
                <li className="flex items-start gap-2"><span style={{ color: 'var(--accent)' }}>✓</span><span className="text-slate-300">Production‑ready components</span></li>
                <li className="flex items-start gap-2"><span style={{ color: 'var(--accent)' }}>✓</span><span className="text-slate-300">Developer‑friendly APIs</span></li>
                <li className="flex items-start gap-2"><span style={{ color: 'var(--accent)' }}>✓</span><span className="text-slate-300">Lightweight and extensible</span></li>
              </Box>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button
                  href="#features"
                  variant="contained"
                  size="large"
                  className="btn-cta-enhanced"
                  sx={{
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    color: '#fff',
                    fontWeight: 700,
                    px: 3,
                    py: 1.5,
                    borderRadius: 9999,
                    boxShadow: '0 12px 32px rgba(97,0,148,0.35)'
                  }}
                >
                  Explore features
                </Button>
              </motion.div>
            </motion.div>

            {/* Right illustration card */}
            <motion.div variants={itemUp}>
              <div
                className="w-full h-72 rounded-2xl flex items-center justify-center glass-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(21,0,80,0.35), rgba(97,0,148,0.28))',
                  border: '1px solid rgba(97,0,148,0.4)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <span className="text-xl text-slate-100">Illustration</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
