/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from 'react';
import { Container, Typography, Button, Box, useMediaQuery, useTheme } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion } from 'framer-motion';

/* Particle background component (Mas malawak at Responsive) */
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

/* Hero section component */
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50); 
    return () => clearTimeout(t);
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }, 
    },
  };

  const item = {
    hidden: { opacity: 0, y: 24 }, 
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }, 
    },
  };

  const buttonsItem = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  return (
    <section
      className="flex items-center justify-center relative overflow-hidden" 
      style={{ 
          color: 'var(--text)', 
          paddingTop: isMobile ? '120px' : '180px', 
          paddingBottom: isMobile ? '80px' : '120px',
          // Nagdagdag ng background color sa section para mas gumanda ang particle effect
          backgroundColor: '#000000', 
        }}
    >
      <ParticleDriftBackground />

      <Container
        maxWidth="lg"
        className="px-6 text-center relative z-10"
        style={{ 
          color: 'var(--text)',
          // TINANGGAL ANG BORDER, BACKGROUND, AT SHADOW DITO
          borderRadius: '16px',
          padding: isMobile ? '0' : '0', // Inayos ang padding para mas malapit ang content sa screen edges
        }}
      >
        <motion.div
          initial="hidden"
          animate={mounted ? 'show' : 'hidden'}
          variants={container}
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span
              className="inline-block text-sm tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 font-semibold"
              style={{
                backgroundColor: 'rgba(97,0,148,0.18)', 
                color: 'var(--accent)',
                border: '1px solid rgba(97,0,148,0.5)', 
                boxShadow: '0 0 10px rgba(97,0,148,0.3)', 
              }}
            >
              ✨ New • Modern UI Kit
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={item}>
            <Typography
              component="h1"
              variant={isMobile ? 'h3' : 'h1'} 
              className="font-extrabold"
              sx={{
                mb: 2,
                background:
                  'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 45%, var(--accent) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                letterSpacing: '-0.04em', 
                lineHeight: 1.1,
                textShadow: '0 2px 8px rgba(97,0,148,0.4)', 
              }}
            >
              Build beautiful, fast & <br/> cutting-edge experiences
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={item}>
            <Typography
              variant={isMobile ? 'body1' : 'h6'}
              sx={{ opacity: 0.95, mb: isMobile ? 4 : 8, color: 'var(--text)', fontWeight: 300, maxWidth: '800px', margin: '0 auto', marginTop: '16px' }}
            >
              Ship faster with a modern, responsive landing layout — accessible
              and delightful. Leverage the power of React, MUI, and Framer Motion.
            </Typography>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={buttonsItem}>
            <Box className="flex items-center justify-center gap-4 flex-wrap">
              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  href="#cta"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIosIcon sx={{ fontSize: '14px !important'}} />}
                  className="btn-cta-enhanced shadow-xl" 
                  sx={{
                    background:
                      'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 45%, var(--accent) 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    px: 4.5, 
                    py: 1.6, 
                    boxShadow: '0 10px 40px 0 rgba(97,0,148,0.4)', 
                    borderRadius: 2,
                    textTransform: 'none', 
                    fontSize: isMobile ? '1rem' : '1.1rem',
                  }}
                >
                  Get Started Today
                </Button>
              </motion.div>

              {/* Outlined Button (Enhanced Glassmorphism/Neubrutalist style) */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  href="#features"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: 'var(--text)',
                    borderColor: 'rgba(97,0,148,0.6)', 
                    background: 'rgba(255,255,255,0.08)', 
                    fontWeight: 500,
                    px: 4.5,
                    py: 1.6,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    backdropFilter: 'blur(8px)', 
                    transition: 'all 300ms ease-in-out',
                    '&:hover': {
                      background: 'rgba(97,0,148,0.15)', 
                      borderColor: 'var(--accent)', 
                      color: 'var(--accent)',
                      boxShadow: '0 0 12px rgba(97,0,148,0.3)',
                    },
                  }}
                >
                  Explore Features
                </Button>
              </motion.div>
            </Box>
          </motion.div>

          {/* Trusted by (Visual Enhancement) */}
          <motion.div variants={item} className="mt-12">
            <Typography
              variant="overline"
              sx={{ letterSpacing: '0.15em', opacity: 0.8, color: 'var(--muted)', display: 'block', mb: 1 }}
            >
              TRUSTED BY GLOBAL LEADERS
            </Typography>

            <Box className="mt-3 flex items-center justify-center gap-6 md:gap-10 flex-wrap">
              {/* Logo placeholder */}
              {['Acme', 'Globex', 'Umbrella', 'Initech'].map((name, index) => (
                <Box 
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'rgba(203, 213, 225, 0.9)', 
                        fontWeight: 700,
                        fontSize: isMobile ? '1rem' : '1.1rem',
                        opacity: 0.85,
                        transition: 'opacity 300ms',
                        '&:hover': {
                            opacity: 1,
                        }
                    }}
                >
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} /> 
                    {name}
                </Box>
              ))}
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
/* eslint-enable no-unused-vars */