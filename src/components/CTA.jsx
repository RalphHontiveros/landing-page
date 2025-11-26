import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; // For smooth animations in CTA

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

/* =========================
   CTA Section Component
========================= */
export default function CTA() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: '#000000' }} // Solid dark background
    >
      <ParticleDriftBackground />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-4xl mx-auto px-6 relative z-20"
      >
        {/* Glassmorphism Card */}
        <div
          className="p-8 md:p-12 rounded-[2rem] text-white text-center shadow-2xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(21,0,80,0.85) 0%, rgba(30,0,100,0.95) 100%)',
            border: '2px solid rgba(99,102,241,0.5)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)',
          }}
        >
          <motion.h3
            variants={fadeUp}
            className="text-3xl md:text-5xl font-extrabold mb-4"
            style={{
              letterSpacing: '-0.03em',
              textShadow: '0 0 10px rgba(99,102,241,0.4)',
            }}
          >
            Ready to Build Something Amazing?
          </motion.h3>

          <motion.p
            variants={fadeUp}
            className="mb-8 text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--muted)', opacity: 0.9 }}
          >
            Join hundreds of teams shipping faster with a great developer experience.
          </motion.p>

          {/* CTA Button */}
          <motion.a
            variants={fadeUp}
            href="#"
            className="inline-block font-bold px-10 py-4 rounded-xl text-lg transform transition duration-300"
            style={{
              background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(100, 100, 241, 0.7)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 6px 20px rgba(100, 100, 241, 1)',
              translateY: -2,
            }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now →
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
